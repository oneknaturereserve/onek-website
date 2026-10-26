import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectId = 141822;
const api = "https://api.inaturalist.org/v1";
const root = process.cwd();
const imageDir = path.join(root, "public", "onek", "inaturalist", "birds");
const dataFile = path.join(root, "app", "species-calendar", "species-calendar-data.json");

const orderZh = {
  Accipitriformes: "鹰形目", Caprimulgiformes: "夜鹰目", Cathartiformes: "美洲鹫目",
  Charadriiformes: "鸻形目", Columbiformes: "鸽形目", Coraciiformes: "佛法僧目",
  Cuculiformes: "鹃形目", Eurypygiformes: "日鳽目", Falconiformes: "隼形目",
  Galliformes: "鸡形目", Gruiformes: "鹤形目", Nyctibiiformes: "钩嘴夜鹰目",
  Passeriformes: "雀形目", Pelecaniformes: "鹈形目", Piciformes: "䴕形目",
  Psittaciformes: "鹦形目", Strigiformes: "鸮形目", Suliformes: "鲣鸟目",
  Tinamiformes: "䳍形目", Trogoniformes: "咬鹃目"
};

async function getJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": "OneK-website-species-calendar/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function taxa(ids, locale = "en") {
  const map = new Map();
  for (let index = 0; index < ids.length; index += 25) {
    const batch = ids.slice(index, index + 25).join(",");
    const data = await getJson(`${api}/taxa/${batch}?locale=${encodeURIComponent(locale)}`);
    data.results.forEach((taxon) => map.set(taxon.id, taxon));
  }
  return map;
}

await mkdir(imageDir, { recursive: true });
await mkdir(path.dirname(dataFile), { recursive: true });

const observations = await getJson(`${api}/observations?project_id=${projectId}&per_page=200&photos=true&quality_grade=research,needs_id&order=desc&order_by=observed_on&locale=en`);
const unique = new Map();
for (const observation of observations.results) {
  if (!observation.taxon || !observation.photos?.length) continue;
  if (!unique.has(observation.taxon.id)) unique.set(observation.taxon.id, observation);
}

const allAncestorIds = [...new Set([...unique.values()].flatMap((observation) => observation.taxon.ancestor_ids))];
const speciesIds = [...unique.keys()];
const [ancestorTaxa, chineseTaxa] = await Promise.all([taxa(allAncestorIds), taxa(speciesIds, "zh-CN")]);

const records = [];
for (const observation of unique.values()) {
  const taxon = observation.taxon;
  const order = taxon.ancestor_ids.map((id) => ancestorTaxa.get(id)).find((entry) => entry?.rank === "order");
  const chinese = chineseTaxa.get(taxon.id);
  const sourceUrl = observation.photos[0].url.replace("/square.", "/medium.");
  const extension = new URL(sourceUrl).pathname.split(".").pop() || "jpg";
  const filename = `${observation.id}.${extension}`;
  const destination = path.join(imageDir, filename);
  const imageResponse = await fetch(sourceUrl, { headers: { "User-Agent": "OneK-website-species-calendar/1.0" } });
  if (!imageResponse.ok) throw new Error(`${imageResponse.status} ${sourceUrl}`);
  await writeFile(destination, Buffer.from(await imageResponse.arrayBuffer()));

  records.push({
    observationId: observation.id,
    observedOn: observation.observed_on,
    month: Number(observation.observed_on.slice(5, 7)),
    commonEn: taxon.preferred_common_name || taxon.name,
    commonZh: chinese?.preferred_common_name || taxon.preferred_common_name || taxon.name,
    scientific: taxon.name,
    orderEn: order?.name || "Other birds",
    orderZh: orderZh[order?.name] || order?.name || "其他鸟类",
    photo: `/onek/inaturalist/birds/${filename}`,
    observationUrl: `https://www.inaturalist.org/observations/${observation.id}`,
    attribution: observation.photos[0].attribution,
    license: observation.photos[0].license_code?.toUpperCase() || "",
  });
}

records.sort((a, b) => a.orderEn.localeCompare(b.orderEn) || a.commonEn.localeCompare(b.commonEn));
await writeFile(dataFile, `${JSON.stringify(records, null, 2)}\n`);
console.log(JSON.stringify({ observations: observations.total_results, species: records.length, orders: new Set(records.map((record) => record.orderEn)).size }));
