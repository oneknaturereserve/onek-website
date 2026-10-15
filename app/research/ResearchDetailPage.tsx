"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";

type Lang = "en" | "zh";
type Detail = { titleEn: string; titleZh: string; image: string; en: string; zh: string };

const supportingImages = [
  "/onek/research-old/IntroductionImage2.png",
  "/onek/research-old/MammalResearch.jpg",
  "/onek/research-old/ResearchInsect.jpg",
  "/onek/research-old/ResearchHeader.JPG",
];

function contentGroups(raw: string) {
  const sections = raw.split(/\n\s*⸻\s*\n/g).map((part) => part.trim()).filter(Boolean);
  if (sections.length > 2) return sections;
  const chunks = raw.split(/\n{2,}/g).map((part) => part.trim()).filter(Boolean);
  const groups: string[] = [];
  for (let index = 0; index < chunks.length; index += 5) groups.push(chunks.slice(index, index + 5).join("\n\n"));
  return groups;
}

function TextBlock({ value }: { value: string }) {
  const chunks = value.split(/\n{2,}/g).map((part) => part.trim()).filter(Boolean);
  return <>{chunks.map((chunk, index) => {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    const bullets = lines.filter((line) => line.startsWith("•"));
    if (bullets.length === lines.length) return <ul key={index}>{bullets.map((line) => <li key={line}>{line.replace(/^•\s*/, "")}</li>)}</ul>;
    if (lines.length === 1 && index > 0 && lines[0].length < 72) return <h3 key={index}>{lines[0]}</h3>;
    return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{line.replace(/^•\s*/, "")}{lineIndex < lines.length - 1 && <br />}</span>)}</p>;
  })}</>;
}

export default function ResearchDetailPage({ detail, backHref }: { detail: Detail; backHref: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";
  const title = isEn ? detail.titleEn : detail.titleZh;
  const groups = contentGroups(isEn ? detail.en : detail.zh);

  return <main className="story-legacy-page research-detail-page" id="top">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div></header>
    <section className="story-legacy-hero research-detail-hero"><img src={detail.image} alt={title} /><div className="story-legacy-hero-shade" /><div className="story-legacy-hero-copy"><p>{isEn ? "ONEK RESEARCH & MONITORING" : "ONEK 科研与长期监测"}</p><h1>{title}</h1></div></section>
    <div className="research-detail-sections">{groups.map((group, index) => <section className={index % 2 ? "story-legacy-chapter reverse" : index === 0 ? "story-legacy-opening" : "story-legacy-chapter"} key={index}>
      <figure className="story-legacy-image"><img src={index === 0 ? detail.image : supportingImages[index % supportingImages.length]} alt={title} /></figure>
      <article><p className="story-legacy-kicker">{String(index + 1).padStart(2, "0")}</p><TextBlock value={group} /></article>
    </section>)}</div>
    <div className="story-legacy-back"><Link href={backHref}>← {isEn ? "Back" : "返回"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
