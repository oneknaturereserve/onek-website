<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data) || strlen($raw ?: '') > 50000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_request']);
    exit;
}

// Hidden honeypot: bots commonly complete this field.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true, 'reference' => 'ONEK-RECEIVED']);
    exit;
}

function clean_text(mixed $value, int $max = 4000): string {
    $text = trim((string)($value ?? ''));
    return mb_substr($text, 0, $max);
}

$required = ['firstName', 'lastName', 'email', 'country', 'preferredLanguage', 'program', 'startDate', 'endDate', 'tropicalExperience', 'background', 'motivation', 'contribution', 'adultConfirmed', 'fieldConditionsAccepted', 'accuracyConfirmed', 'privacyAccepted'];
foreach ($required as $field) {
    if (clean_text($data[$field] ?? '') === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'missing_field', 'field' => $field]);
        exit;
    }
}

$email = filter_var(clean_text($data['email'], 254), FILTER_VALIDATE_EMAIL);
if ($email === false) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

$reference = 'ONEK-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
$interests = is_array($data['interests'] ?? null) ? array_slice(array_map(fn($item) => clean_text($item, 60), $data['interests']), 0, 12) : [];
$ipHash = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', getenv('ONEK_FORM_HASH_KEY') ?: 'replace-this-key');

try {
    $pdo = new PDO(
        'mysql:host=' . getenv('ONEK_DB_HOST') . ';dbname=' . getenv('ONEK_DB_NAME') . ';charset=utf8mb4',
        getenv('ONEK_DB_USER'),
        getenv('ONEK_DB_PASSWORD'),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]
    );

    $rate = $pdo->prepare('SELECT COUNT(*) FROM volunteer_applications WHERE ip_hash = ? AND created_at > (UTC_TIMESTAMP() - INTERVAL 1 HOUR)');
    $rate->execute([$ipHash]);
    if ((int)$rate->fetchColumn() >= 5) {
        http_response_code(429);
        echo json_encode(['ok' => false, 'error' => 'rate_limited']);
        exit;
    }

    $statement = $pdo->prepare('INSERT INTO volunteer_applications (reference_code, first_name, last_name, email, phone, country, preferred_language, program, start_date, end_date, dates_flexible, interests_json, tropical_experience, background, motivation, contribution, practical_needs, updates_opt_in, form_language, ip_hash) VALUES (:reference_code, :first_name, :last_name, :email, :phone, :country, :preferred_language, :program, :start_date, :end_date, :dates_flexible, :interests_json, :tropical_experience, :background, :motivation, :contribution, :practical_needs, :updates_opt_in, :form_language, :ip_hash)');
    $statement->execute([
        'reference_code' => $reference,
        'first_name' => clean_text($data['firstName'], 100),
        'last_name' => clean_text($data['lastName'], 100),
        'email' => $email,
        'phone' => clean_text($data['phone'] ?? '', 80),
        'country' => clean_text($data['country'], 120),
        'preferred_language' => clean_text($data['preferredLanguage'], 40),
        'program' => clean_text($data['program'], 60),
        'start_date' => clean_text($data['startDate'], 10),
        'end_date' => clean_text($data['endDate'], 10),
        'dates_flexible' => !empty($data['datesFlexible']) ? 1 : 0,
        'interests_json' => json_encode($interests, JSON_UNESCAPED_UNICODE),
        'tropical_experience' => clean_text($data['tropicalExperience'], 120),
        'background' => clean_text($data['background']),
        'motivation' => clean_text($data['motivation']),
        'contribution' => clean_text($data['contribution']),
        'practical_needs' => clean_text($data['practicalNeeds'] ?? ''),
        'updates_opt_in' => !empty($data['updatesOptIn']) ? 1 : 0,
        'form_language' => clean_text($data['formLanguage'] ?? 'en', 5),
        'ip_hash' => $ipHash,
    ]);

    $subject = '[OneK] New volunteer application ' . $reference;
    $message = "Reference: $reference\nApplicant: " . clean_text($data['firstName']) . ' ' . clean_text($data['lastName']) . "\nEmail: $email\nProgram: " . clean_text($data['program']) . "\nDates: " . clean_text($data['startDate']) . ' to ' . clean_text($data['endDate']);
    @mail('OneK.CR2018@gmail.com', $subject, $message, "From: OneK Website <noreply@oneknaturereserve.org>\r\nReply-To: $email\r\n");

    echo json_encode(['ok' => true, 'reference' => $reference]);
} catch (Throwable $error) {
    error_log('OneK volunteer form error: ' . $error->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'server_error']);
}

