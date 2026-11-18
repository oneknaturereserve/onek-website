import { notFound } from "next/navigation";
import ResearchDetailPage from "../ResearchDetailPage";
import { researchContent, type ResearchContentKey } from "../research-content";

const routes: Record<string, { key: ResearchContentKey; back: string }> = {
  "station": { key: "station", back: "/research" },
  "collaboration/research-internship": { key: "research-internship", back: "/research#collaboration" },
  "collaboration/conservation-internship": { key: "conservation-internship", back: "/research#collaboration" },
  "collaboration/independent-research": { key: "independent-research", back: "/research#collaboration" },
  "collaboration/university-field-course": { key: "university-field-course", back: "/research#collaboration" },
  "projects/camera-traps": { key: "camera-traps", back: "/research/projects" },
  "projects/artificial-cavities": { key: "artificial-cavities", back: "/research/projects" },
  "projects/nest-ecology": { key: "nest-ecology", back: "/research/projects" },
  "projects/manakins": { key: "manakins", back: "/research/projects" },
  "projects/flycatchers": { key: "flycatchers", back: "/research/projects" },
  "projects/butterfly-ecology": { key: "butterfly-ecology", back: "/research/projects" },
  "projects/insect-diversity": { key: "insect-diversity", back: "/research/projects" },
  "projects/forest-restoration": { key: "forest-restoration", back: "/research/projects" },
  "projects/stream-restoration": { key: "stream-restoration", back: "/research/projects" },
  "annual-reports": { key: "annual-report-2025", back: "/research" },
};

export function generateStaticParams() {
  return Object.keys(routes).map((route) => ({ section: route.split("/") }));
}

export default async function Page({ params }: { params: Promise<{ section: string[] }> }) {
  const route = (await params).section.join("/");
  const match = routes[route];
  if (!match) notFound();
  return <ResearchDetailPage detail={researchContent[match.key]} backHref={match.back} />;
}
