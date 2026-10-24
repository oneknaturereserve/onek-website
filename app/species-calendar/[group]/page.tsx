import { notFound } from "next/navigation";
import SpeciesArchiveCalendar from "../SpeciesArchiveCalendar";
import insects from "../data/insects.json";
import herps from "../data/herps.json";
import mammals from "../data/mammals.json";

const groups = {
  insects: { records: insects, config: { titleEn: "Insect Calendar", titleZh: "昆虫日历", eyebrowEn: "ONEK · INATURALIST INSECT RECORDS", eyebrowZh: "ONEK · iNATURALIST 昆虫记录", introEn: "A living archive of the small organisms that sustain the rainforest.", introZh: "记录支撑热带雨林生态系统运转的微小生命。", projectUrl: "https://www.inaturalist.org/projects/one-k-costa-rica-0d9b12df-4772-4d8c-97df-f3a073a46ac4", projectNameEn: "OneK Insect Survey on iNaturalist", projectNameZh: "iNaturalist · OneK 保护区昆虫调查" } },
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
