import { notFound } from "next/navigation";
import SpeciesArchiveCalendar from "../SpeciesArchiveCalendar";
import insects from "../data/insects.json";
import herps from "../data/herps.json";
import mammals from "../data/mammals.json";

const groups = {
  insects: { records: insects, config: { titleEn: "Insect Calendar", titleZh: "昆虫日历", eyebrowEn: "ONEK · INSECTS · BUTTERFLIES · MOTHS", eyebrowZh: "ONEK · 昆虫 · 蝴蝶 · 蛾类", introEn: "A living archive of insects, including OneK’s dedicated butterfly and moth surveys.", introZh: "汇集 OneK 昆虫、蝴蝶与蛾类调查的雨林生命档案。", projectUrl: "https://www.inaturalist.org/projects/user/onek_nature_reserve?started_page=1", projectNameEn: "OneK Insect, Butterfly & Moth Surveys on iNaturalist", projectNameZh: "iNaturalist · OneK 昆虫、蝴蝶与蛾类调查" } },
  herps: { records: herps, config: { titleEn: "Herpetofauna Calendar", titleZh: "两栖与爬行动物日历", eyebrowEn: "ONEK · INATURALIST HERPETOFAUNA RECORDS", eyebrowZh: "ONEK · iNATURALIST 两栖爬行动物记录", introEn: "Amphibians and reptiles recorded across OneK’s rainforest and streams.", introZh: "记录 OneK 雨林与溪流中的两栖动物和爬行动物。", projectUrl: "https://www.inaturalist.org/projects/one-k-costa-rica-df156ac5-fab1-49aa-b7cc-3d82908a483c", projectNameEn: "OneK Herpetofauna Survey on iNaturalist", projectNameZh: "iNaturalist · OneK 保护区两栖爬行动物调查" } },
  mammals: { records: mammals, config: { titleEn: "Mammal Calendar", titleZh: "哺乳动物日历", eyebrowEn: "ONEK · INATURALIST MAMMAL RECORDS", eyebrowZh: "ONEK · iNATURALIST 哺乳动物记录", introEn: "Mammal encounters documented within OneK Nature Reserve.", introZh: "记录 OneK 自然保护区内真实发生的哺乳动物相遇。", projectUrl: "https://www.inaturalist.org/projects/one-k-costa-rica-00cd62e4-c7ae-47f9-bccb-d3a8440076a2", projectNameEn: "OneK Mammal Survey on iNaturalist", projectNameZh: "iNaturalist · OneK 保护区哺乳动物调查" } },
} as const;

export function generateStaticParams() { return Object.keys(groups).map((group) => ({ group })); }

export default async function GroupCalendarPage({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  const data = groups[group as keyof typeof groups];
  if (!data) notFound();
  return <SpeciesArchiveCalendar records={data.records} config={data.config} />;
}
