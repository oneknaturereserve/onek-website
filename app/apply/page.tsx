"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";

type Lang = "en" | "zh";
type SubmitState = "idle" | "sending" | "sent" | "error";

const programs = [
  ["conservation", "Conservation Volunteer", "自然保护志愿者"],
  ["research", "Research Internship", "科研实习"],
  ["independent", "Independent Research", "独立研究"],
  ["field-course", "University Field Course", "大学野外课程"],
] as const;

const interests = [
  ["biodiversity", "Biodiversity surveys", "生物多样性调查"],
  ["camera", "Camera-trap monitoring", "红外相机监测"],
  ["birds", "Bird monitoring", "鸟类监测"],
  ["herps", "Amphibian & reptile surveys", "两栖爬行动物调查"],
  ["insects", "Insect surveys", "昆虫调查"],
  ["restoration", "Forest & stream restoration", "森林与溪流修复"],
  ["education", "Environmental education", "自然教育"],
] as const;

const text = {
  en: {
    back: "Back to programs", switcher: "中文", eyebrow: "ONEK INTERNATIONAL PROGRAMS",
    home: "Home", menu: "Menu", contact: "Contact", support: "Support",
    title: "Begin your rainforest journey.", subtitle: "Volunteer application",
    intro: "Tell us what you hope to contribute and learn. This first-stage application takes about 8–10 minutes; no passport, medical documents, or payment are requested.",
    fit: "Before you apply", fitItems: ["Applicants for adult field programs should be 18 or older.", "Field days may include heat, humidity, rain, insects, uneven trails, and basic living conditions.", "Activities depend on season, weather, conservation priorities, and staff capacity.", "Submitting an application does not guarantee placement. We review each application for a responsible match."],
    steps: ["About you", "Your plans", "Experience & purpose", "Review"],
    s1: "About you", s1copy: "How can we contact you?", first: "First name", last: "Last name", email: "Email", phone: "Phone / WhatsApp", country: "Country or region", language: "Preferred language", languageOptions: ["English", "Spanish", "Chinese", "Other"], age: "I confirm that I am 18 or older", ageHelp: "For youth and family programs, please contact OneK so we can arrange guardian consent separately.",
    s2: "Your plans", s2copy: "What kind of field experience are you looking for?", program: "Program of interest", start: "Preferred start date", end: "Preferred end date", flexible: "My dates are flexible", interests: "Areas of interest", travel: "Have you previously travelled or worked in tropical field conditions?", travelOptions: ["Yes", "No", "Not yet, but I understand the conditions"],
    s3: "Experience & purpose", s3copy: "We look for curiosity, realism, and a useful match—not a perfect résumé.", background: "Relevant background, studies, work, or practical skills", motivation: "Why do you want to join OneK?", contribution: "What skills or perspectives could you contribute?", access: "Accessibility, dietary, or practical needs we should consider at this stage", accessHelp: "Please share only what is necessary for planning. Medical details will be requested privately only if a placement moves forward.",
    s4: "Review & consent", s4copy: "Please confirm the statements below before sending your application.", conditions: "I have read and understand the field conditions described above.", accuracy: "The information I provided is accurate to the best of my knowledge.", privacy: "I agree that OneK may use this information to assess my application and contact me about this program.", updates: "I would also like to receive occasional OneK conservation updates (optional).", submit: "Send application", sending: "Sending…", next: "Continue", previous: "Back", edit: "Edit", direct: "Prefer to talk first?", response: "We normally acknowledge applications within 5–7 days. Program dates, fees, accommodation, supervision, and safety arrangements are confirmed individually before acceptance.", successTitle: "Application received.", success: "Thank you. Your application has been recorded and OneK will contact you by email. Please keep your reference number:", errorTitle: "We could not send the form yet.", error: "The online intake service is being prepared for the final Namecheap launch. You can send the same application by email now.", emailFallback: "Prepare email application", required: "Required fields are marked with *.", privacyNote: "Initial applications are kept concise. Do not submit passport numbers, medical records, or payment information here.",
  },
  zh: {
    back: "返回国际项目", switcher: "EN", eyebrow: "ONEK 国际项目",
    home: "主页", menu: "菜单", contact: "联系我们", support: "支持我们",
    title: "从这里，开始你的雨林旅程。", subtitle: "志愿者在线报名",
    intro: "请告诉我们你希望学习什么、能够贡献什么。首轮申请约需 8–10 分钟，无需提交护照、医疗文件或支付任何费用。",
    fit: "申请前请确认", fitItems: ["成人野外项目申请人原则上应年满 18 周岁。", "野外工作可能面对高温、高湿、降雨、昆虫、不平整山路和较为基础的生活条件。", "具体活动取决于季节、天气、保护工作重点和工作人员安排。", "提交申请不代表自动录取；我们会逐一评估是否能够形成安全、负责任且有价值的匹配。"],
    steps: ["个人信息", "参与计划", "经历与目标", "确认提交"],
    s1: "个人信息", s1copy: "我们应该如何联系你？", first: "名", last: "姓", email: "电子邮箱", phone: "电话 / WhatsApp", country: "国家或地区", language: "首选沟通语言", languageOptions: ["英语", "西班牙语", "中文", "其他"], age: "我确认自己已年满 18 周岁", ageHelp: "如申请青少年或家庭项目，请先联系 OneK，我们将另行安排监护人同意流程。",
    s2: "参与计划", s2copy: "你希望获得怎样的野外体验？", program: "感兴趣的项目", start: "希望开始日期", end: "希望结束日期", flexible: "我的时间可以灵活调整", interests: "感兴趣的方向", travel: "你是否有热带地区旅行或野外工作的经历？", travelOptions: ["有", "没有", "还没有，但我理解相关环境条件"],
    s3: "经历与目标", s3copy: "我们看重好奇心、务实态度和彼此适合，而不是一份完美的简历。", background: "相关学习、工作、志愿经历或实践技能", motivation: "为什么希望加入 OneK？", contribution: "你可以带来哪些技能或不同视角？", access: "现阶段需要我们考虑的无障碍、饮食或实际安排", accessHelp: "请只填写项目规划所必需的信息。只有进入下一阶段后，我们才会通过私密方式了解必要的医疗情况。",
    s4: "确认与同意", s4copy: "发送申请前，请确认以下内容。", conditions: "我已经阅读并理解上述野外环境说明。", accuracy: "据我所知，我所填写的信息真实准确。", privacy: "我同意 OneK 使用这些信息评估申请，并就本项目与我联系。", updates: "我也愿意偶尔收到 OneK 的自然保护动态（选填）。", submit: "提交申请", sending: "正在发送……", next: "继续", previous: "返回", edit: "修改", direct: "想先和我们聊聊？", response: "我们通常会在 5–7 天内确认收到申请。项目日期、费用、住宿、指导和安全安排将在正式录取前逐一确认。", successTitle: "申请已收到。", success: "感谢申请。OneK 将通过电子邮件与你联系，请保存申请编号：", errorTitle: "暂时无法在线提交。", error: "在线报名服务将在网站正式迁移至 Namecheap 时启用。你现在可以用相同内容生成申请邮件。", emailFallback: "生成申请邮件", required: "带 * 的项目为必填项。", privacyNote: "首轮申请只收集必要信息。请勿在这里提交护照号码、医疗文件或付款信息。",
  },
} as const;

function Field({ label, children, wide = false, help }: { label: string; children: React.ReactNode; wide?: boolean; help?: string }) {
  return <label className={wide ? "application-field wide" : "application-field"}><span>{label}</span>{children}{help && <small>{help}</small>}</label>;
}

export default function ApplyPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [reference, setReference] = useState("");
  const [fallbackBody, setFallbackBody] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const t = text[lang];
  const progress = useMemo(() => `${((step + 1) / 4) * 100}%`, [step]);

  function advance() {
    const current = formRef.current?.querySelector(`.application-form-step:nth-of-type(${step + 2})`);
    const fields = Array.from(current?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea") ?? []);
    const invalid = fields.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    if (step === 1 && !fields.some((field) => field.name === "interests" && (field as HTMLInputElement).checked)) {
      window.alert(lang === "en" ? "Please select at least one area of interest." : "请至少选择一个感兴趣的方向。");
      return;
    }
    setStep(step + 1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const selectedInterests = data.getAll("interests");
    const body = Object.entries({ ...payload, interests: selectedInterests.join(", ") }).map(([key, value]) => `${key}: ${value}`).join("\n\n");
    setFallbackBody(body);
    setSubmitState("sending");
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_VOLUNTEER_APPLICATION_ENDPOINT || "/api/volunteer-application.php", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, interests: selectedInterests, formLanguage: lang }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error("Submission failed");
      setReference(result.reference || "ONEK-APPLICATION");
      setSubmitState("sent");
      form.reset();
    } catch {
      setSubmitState("error");
    }
  }

  const emailLink = `mailto:OneK.CR2018@gmail.com?subject=${encodeURIComponent("[OneK] Volunteer application")}&body=${encodeURIComponent(fallbackBody)}`;

  return <main className="application-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""} aria-label="Primary navigation">
        <Link href="/">{t.home}</Link>
        {navItems.map(([en, zh, href]) => <Link key={href} href={href}>{lang === "en" ? en : zh}</Link>)}
        <Link href="/contact">{t.contact}</Link><Link className="interior-support" href="/support">{t.support}</Link>
      </nav>
      <div className="interior-actions"><button type="button" onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label="Switch language"><b>{lang === "en" ? "EN" : "中"}</b><span>{lang === "en" ? "中" : "EN"}</span></button><button type="button" className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{t.menu}</button></div>
    </header>

    <section className="application-hero">
      <div><p>{t.eyebrow}</p><h1>{t.title}</h1><h2>{t.subtitle}</h2><p className="application-hero-intro">{t.intro}</p><div className="application-hero-meta"><span>8–10 MIN</span><span>4 STEPS</span><span>NO DOCUMENT UPLOAD</span></div></div>
      <aside><p>{t.fit}</p><ul>{t.fitItems.map((item) => <li key={item}>{item}</li>)}</ul></aside>
    </section>

    <section className="application-workspace">
      <aside className="application-progress"><p>{t.eyebrow}</p><h2>{lang === "en" ? "Your application" : "你的申请"}</h2><div className="application-progress-bar"><i style={{ width: progress }} /></div><ol>{t.steps.map((item, index) => <li className={index === step ? "active" : index < step ? "complete" : ""} key={item}><button type="button" onClick={() => index < step && setStep(index)}><b>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</b><span>{item}</span></button></li>)}</ol><p className="application-privacy-note">{t.privacyNote}</p></aside>

      <form ref={formRef} onSubmit={submit} className="application-form">
        <div className="application-form-heading"><span>{String(step + 1).padStart(2, "0")} / 04</span><h2>{[t.s1, t.s2, t.s3, t.s4][step]}</h2><p>{[t.s1copy, t.s2copy, t.s3copy, t.s4copy][step]}</p></div>

        <div className={step === 0 ? "application-form-step active" : "application-form-step"} aria-hidden={step !== 0}>
          <Field label={`${t.first} *`}><input name="firstName" autoComplete="given-name" required /></Field>
          <Field label={`${t.last} *`}><input name="lastName" autoComplete="family-name" required /></Field>
          <Field label={`${t.email} *`}><input name="email" type="email" autoComplete="email" required /></Field>
          <Field label={t.phone}><input name="phone" type="tel" autoComplete="tel" /></Field>
          <Field label={`${t.country} *`}><input name="country" autoComplete="country-name" required /></Field>
          <Field label={`${t.language} *`}><select name="preferredLanguage" required defaultValue=""><option value="" disabled>—</option>{t.languageOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
          <Field label={t.age} wide help={t.ageHelp}><span className="application-check"><input name="adultConfirmed" type="checkbox" value="yes" required /><i>{t.age}</i></span></Field>
        </div>

        <div className={step === 1 ? "application-form-step active" : "application-form-step"} aria-hidden={step !== 1}>
          <Field label={`${t.program} *`} wide><div className="application-choice-grid">{programs.map(([value, en, zh]) => <label key={value}><input type="radio" name="program" value={value} required /><span><b>{lang === "en" ? en : zh}</b></span></label>)}</div></Field>
          <Field label={`${t.start} *`}><input name="startDate" type="date" required /></Field>
          <Field label={`${t.end} *`}><input name="endDate" type="date" required /></Field>
          <Field label="" wide><span className="application-check"><input name="datesFlexible" type="checkbox" value="yes" /><i>{t.flexible}</i></span></Field>
          <Field label={`${t.interests} *`} wide><div className="application-interest-grid">{interests.map(([value, en, zh]) => <label key={value}><input type="checkbox" name="interests" value={value} /><span>{lang === "en" ? en : zh}</span></label>)}</div></Field>
          <Field label={`${t.travel} *`} wide><select name="tropicalExperience" required defaultValue=""><option value="" disabled>—</option>{t.travelOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
        </div>

        <div className={step === 2 ? "application-form-step active" : "application-form-step"} aria-hidden={step !== 2}>
          <Field label={`${t.background} *`} wide><textarea name="background" rows={6} minLength={40} required /></Field>
          <Field label={`${t.motivation} *`} wide><textarea name="motivation" rows={6} minLength={60} required /></Field>
          <Field label={`${t.contribution} *`} wide><textarea name="contribution" rows={5} minLength={30} required /></Field>
          <Field label={t.access} wide help={t.accessHelp}><textarea name="practicalNeeds" rows={4} /></Field>
        </div>

        <div className={step === 3 ? "application-form-step active" : "application-form-step"} aria-hidden={step !== 3}>
          <div className="application-review-card"><p>{t.response}</p></div>
          <label className="application-check wide"><input name="fieldConditionsAccepted" type="checkbox" value="yes" required /><i>{t.conditions} *</i></label>
          <label className="application-check wide"><input name="accuracyConfirmed" type="checkbox" value="yes" required /><i>{t.accuracy} *</i></label>
          <label className="application-check wide"><input name="privacyAccepted" type="checkbox" value="yes" required /><i>{t.privacy} *</i></label>
          <label className="application-check wide"><input name="updatesOptIn" type="checkbox" value="yes" /><i>{t.updates}</i></label>
          <label className="application-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="application-form-actions">{step > 0 && submitState !== "sent" && <button type="button" className="application-secondary" onClick={() => setStep(step - 1)}>← {t.previous}</button>}{step < 3 && <button type="button" className="application-primary" onClick={advance}>{t.next} →</button>}{step === 3 && submitState !== "sent" && <button type="submit" className="application-primary" disabled={submitState === "sending"}>{submitState === "sending" ? t.sending : `${t.submit} →`}</button>}</div>
        <p className="application-required">{t.required}</p>

        {submitState === "sent" && <div className="application-result success" role="status"><span>✓</span><div><h3>{t.successTitle}</h3><p>{t.success}</p><b>{reference}</b></div></div>}
        {submitState === "error" && <div className="application-result error" role="alert"><span>!</span><div><h3>{t.errorTitle}</h3><p>{t.error}</p><a href={emailLink}>{t.emailFallback} ↗</a></div></div>}
      </form>

      <aside className="application-contact-card"><p>{t.direct}</p><a href="mailto:OneK.CR2018@gmail.com">OneK.CR2018@gmail.com ↗</a><a href="https://wa.me/50687628888" target="_blank" rel="noreferrer">WhatsApp +506 8762-8888 ↗</a></aside>
    </section>
    <SiteEnding lang={lang} />
  </main>;
}
