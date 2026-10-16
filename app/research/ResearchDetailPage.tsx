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

function contentGroups(raw: string, isChineseStation: boolean) {
  const sections = raw.split(/\n\s*⸻\s*\n/g).map((part) => part.trim()).filter(Boolean);
  if (sections.length > 2) return sections;
  const chunks = raw.split(/\n{2,}/g).map((part) => part.trim()).filter(Boolean);
  if (isChineseStation) {
    const groups = [chunks.slice(0, 5).join("\n\n"), chunks.slice(5, 8).join("\n\n"), chunks.slice(8, 17).join("\n\n"), chunks.slice(17, 21).join("\n\n"), chunks.slice(21, 24).join("\n\n"), chunks.slice(24, 29).join("\n\n")];
    return groups.filter(Boolean);
  }
  const groups: string[] = [];
  for (let index = 0; index < chunks.length; index += 5) groups.push(chunks.slice(index, index + 5).join("\n\n"));
  return groups;
}

function TextBlock({ value, firstHeading = false, openingLabel }: { value: string; firstHeading?: boolean; openingLabel?: string }) {
  const chunks = value.split(/\n{2,}/g).map((part) => part.trim()).filter(Boolean);
  const visibleChunks = openingLabel ? chunks.filter((chunk, index) => index > 0 && chunk !== chunks[0] && !/^[￼\uFFFC]$/.test(chunk)) : chunks;
  return <>{openingLabel && <h2 className="research-station-opening-label">{openingLabel}</h2>}{visibleChunks.map((chunk, index) => {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    const bullets = lines.filter((line) => line.startsWith("•"));
    if (bullets.length === lines.length) return <ul key={index}>{bullets.map((line) => <li key={line}>{line.replace(/^•\s*/, "")}</li>)}</ul>;
    if (openingLabel && /^(Exploring Life|探索生命)/.test(lines[0])) return <h2 key={index}>{lines[0]}</h2>;
    if (firstHeading && index === 0) return <h2 key={index}>{lines[0]}</h2>;
    if (lines.length === 1 && index > 0 && lines[0].length < 72 && !/[。.!?！？，,；;：:]$/.test(lines[0])) return <h3 key={index}>{lines[0]}</h3>;
    return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{line.replace(/^•\s*/, "")}{lineIndex < lines.length - 1 && <br />}</span>)}</p>;
  })}</>;
}

export default function ResearchDetailPage({ detail, backHref }: { detail: Detail; backHref: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";
  const title = isEn ? detail.titleEn : detail.titleZh;
  const isStation = detail.titleZh === "OneK 生物站";
  const isChineseStation = !isEn && isStation;
  const groups = contentGroups(isEn ? detail.en : detail.zh, isChineseStation);

  return <main className={`story-legacy-page research-detail-page${isStation ? " research-station-detail" : ""}`} id="top">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div></header>
    <section className="about-detail-hero research-station-hero"><div><p>{isEn ? "LONG-TERM · CONSISTENCY · UNDERSTANDING CHANGE" : "长期 · 持续 · 理解变化"}</p><h1>{isEn ? "Long-term · Consistency · Understanding Change" : "科研与长期监测"}</h1><h2>{isEn ? "By returning to the same places year after year, we document ecological processes that unfold beyond a single season, generating knowledge that supports both science and conservation." : "通过持续回到相同地点开展观察与记录，我们追踪跨越单个季节的生态过程，为科学研究和保护决策积累长期知识。"}</h2><a href="#content">{isEn ? "Explore" : "了解更多"} ↓</a></div></section>
    <div className="research-detail-sections" id="content">{groups.map((group, index) => <section className={index % 2 ? "story-legacy-chapter reverse" : index === 0 ? "story-legacy-opening" : "story-legacy-chapter"} key={index}>
      <figure className="story-legacy-image"><img src={index === 0 ? detail.image : supportingImages[index % supportingImages.length]} alt={title} /></figure>
      <article><p className="story-legacy-kicker">{String(index + 1).padStart(2, "0")}</p><TextBlock value={group} firstHeading={isStation} openingLabel={isStation && index === 0 ? (isEn ? "OneK Biological Station" : "OneK 生物站") : undefined} /></article>
    </section>)}</div>
    <div className="story-legacy-back"><Link href={backHref}>← {isEn ? "Back" : "返回"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
