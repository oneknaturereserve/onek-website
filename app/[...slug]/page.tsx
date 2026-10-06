import { notFound } from "next/navigation";
import InteriorPage from "../_components/InteriorPage";
import { getSitePage } from "../site-data";

export default async function SiteSectionPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = getSitePage(slug);
  if (!page) notFound();
  return <InteriorPage page={page} />;
}
