import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const api = "https://api.inaturalist.org/v1";
const root = process.cwd();
const projects = [
  { id: 141655, key: "insects", title: "One K保护区昆虫调查" },
  { id: 141844, key: "herps", title: "One K保护区两栖爬行动物调查" },
  { id: 141847, key: "mammals", title: "One K保护区哺乳动物调查" },
];

const orderZh = {
  Anura: "无尾目", Artiodactyla: "偶蹄目", Blattodea: "蜚蠊目", Caudata: "有尾目",
  Carnivora: "食肉目", Chiroptera: "翼手目", Cingulata: "有甲目", Coleoptera: "鞘翅目",
  Crocodylia: "鳄目", Dermaptera: "革翅目", Didelphimorphia: "负鼠目", Diptera: "双翅目",
  Ephemeroptera: "蜉蝣目", Hemiptera: "半翅目", Hymenoptera: "膜翅目", Lagomorpha: "兔形目",
  Lepidoptera: "鳞翅目", Mantodea: "螳螂目", Mecoptera: "长翅目", Neuroptera: "脉翅目",
  Odonata: "蜻蜓目", Orthoptera: "直翅目", Perissodactyla: "奇蹄目", Phasmatodea: "竹节虫目",
  Pilosa: "披毛目", Primates: "灵长目", Psocodea: "啮虫目", Rodentia: "啮齿目",
  Squamata: "有鳞目", Testudines: "龟鳖目", Trichoptera: "毛翅目",
};

async function getJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": "OneK-website-species-archives/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function getObservations(projectId) {
  const results = [];
  for (let page = 1; ; page += 1) {
    const data = await getJson(`${api}/observations?project_id=${projectId}&per_page=200&page=${page}&photos=true&quality_grade=research,needs_id&order=desc&order_by=observed_on&locale=en`);
    results.push(...data.results);
    if (results.length >= data.total_results) return results;
  }
}

async function taxa(ids, locale = "en") {
  const map = new Map();
  for (let index = 0; index < ids.length; index += 25) {
    const data = await getJson(`${api}/taxa/${ids.slice(index, index + 25).join(",")}?locale=${encodeURIComponent(locale)}`);
    data.results.forEach((taxon) => map.set(taxon.id, taxon));
  }
  return map;
}

for (const project of projects) {
  const observations = await getObservations(project.id);
  const unique = new Map();
  for (const observation of observations) {
    if (observation.taxon && observation.photos?.length && !unique.has(observation.taxon.id)) unique.set(observation.taxon.id, observation);
  }
  const allAncestorIds = [...new Set([...unique.values()].flatMap((observation) => observation.taxon.ancestor_ids))];
  const speciesIds = [...unique.keys()];
  const [ancestorTaxa, chineseTaxa] = await Promise.all([taxa(allAncestorIds), taxa(speciesIds, "zh-CN")]);
  const imageDir = path.join(root, "public", "onek", "inaturalist", project.key);
  await mkdir(imageDir, { recursive: true });
  const records = [];

  for (const observation of unique.values()) {
    const taxon = observation.taxon;
    const order = taxon.ancestor_ids.map((id) => ancestorTaxa.get(id)).find((entry) => entry?.rank === "order");
    const chinese = chineseTaxa.get(taxon.id);
    const sourceUrl = observation.photos[0].url.replace("/square.", "/medium.");
    const extension = new URL(sourceUrl).pathname.split(".").pop() || "jpg";
    const filename = `${observation.id}.${extension}`;
    const response = await fetch(sourceUrl, { headers: { "User-Agent": "OneK-website-species-archives/1.0" } });
    if (!response.ok) throw new Error(`${response.status} ${sourceUrl}`);
    await writeFile(path.join(imageDir, filename), Buffer.from(await response.arrayBuffer()));
    records.push({
      observationId: observation.id,
      observedOn: observation.observed_on,
      month: Number(observation.observed_on.slice(5, 7)),
      commonEn: taxon.preferred_common_name || taxon.name,
      commonZh: chinese?.preferred_common_name || taxon.preferred_common_name || taxon.name,
      scientific: taxon.name,
      orderEn: order?.name || "Other",
      orderZh: orderZh[order?.name] || order?.name || "其他",
      photo: `/onek/inaturalist/${project.key}/${filename}`,
      observationUrl: `https://www.inaturalist.org/observations/${observation.id}`,
      attribution: observation.photos[0].attribution,
      license: observation.photos[0].license_code?.toUpperCase() || "",
    });
  }
  records.sort((a, b) => a.orderEn.localeCompare(b.orderEn) || a.commonEn.localeCompare(b.commonEn));
  const dataDir = path.join(root, "app", "species-calendar", "data");
  await mkdir(dataDir, { recursive: true });
  await writeFile(path.join(dataDir, `${project.key}.json`), `${JSON.stringify(records, null, 2)}\n`);
  console.log(JSON.stringify({ project: project.title, observations: observations.length, species: records.length, orders: new Set(records.map((record) => record.orderEn)).size }));
}
