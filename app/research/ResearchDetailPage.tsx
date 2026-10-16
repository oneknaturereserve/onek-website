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

const projectSectionHeadings: Record<string, { en: string[]; zh: string[] }> = {
  "雨林人工树洞生态恢复": {
    zh: ["项目理念", "为什么树洞如此重要？", "OneK 的工作方式", "长期生态监测", "为什么这项工作重要？", "我们相信"],
    en: ["Project Vision", "Why Tree Cavities Matter", "Our Approach", "Long–Term Ecological Monitoring", "A Living Rainforest Laboratory", "Why This Work Matters", "We Believe"],
  },
  "鸟巢生态长期监测": {
    zh: ["研究目标", "调查内容", "为什么研究鸟巢？", "长期愿景", "参与方式"],
    en: ["Project Objectives", "What We Record", "Why Study Bird Nests?", "Long–term Vision", "Education and Citizen Science", "Project Information"],
  },
  "娇鹟长期生态监测": {
    zh: ["项目背景", "项目目标", "为什么娇鹟如此重要？", "OneK 的长期愿景", "我们相信"],
    en: ["Project Background", "Project Objectives", "Why Manakins Matter", "OneK’s Long–Term Vision", "We Believe"],
  },
  "霸鹟科繁殖生态监测": {
    zh: ["为什么研究霸鹟科？", "旗舰研究物种", "研究目标", "我们记录什么？", "科学意义", "长期愿景", "教育与公众参与", "项目信息"],
    en: ["Why Flycatchers?", "Focal Species", "Research Objectives", "What We Record", "Scientific Significance", "Long-term Vision", "Education and Participation", "Project Information"],
  },
  "蝴蝶药物摄食与化学生态": {
    zh: ["项目目标", "研究内容", "科学意义", "教育与公众参与", "长期愿景"],
    en: ["Project Objectives", "Research Components", "Scientific Importance", "Education and Citizen Science", "Long–Term Vision"],
  },
  "昆虫生物多样性长期调查": {
    zh: ["项目目标", "调查内容", "调查方法", "项目意义", "OneK 的理念"],
    en: ["Project Objectives", "Survey Focus", "Survey Methods", "Why It Matters", "Our Philosophy"],
  },
  "森林生态恢复": {
    zh: ["我们正在做什么", "已取得的恢复成效", "为什么这个项目重要", "长期监测与未来计划", "教育与科研价值", "OneK 的理念"],
    en: ["What We Are Doing", "Restoration Achievements", "Why This Project Matters", "Long–term Monitoring & Future Plans", "Educational & Scientific Value", "Our Philosophy"],
  },
  "河流与溪流生态恢复": {
    zh: ["已取得的恢复成效", "为什么这个项目重要", "长期监测与未来计划", "教育与科研价值", "OneK 的理念"],
    en: ["Recovery Achievements", "Why This Project Matters", "Long–term Monitoring & Future Plans", "Educational & Scientific Value", "Our Philosophy"],
  },
};

function projectLanguageContent(detail: Detail, isEn: boolean) {
  if (detail.titleZh === "雨林人工树洞生态恢复") {
    const combined = `${detail.zh}\n\n${detail.en}`;
    const marker = "OneK Artificial Cavities Project\n\nRestoring Tree Cavity Ecosystems in the Tropical Rainforest";
    const boundary = combined.indexOf(marker);
    return isEn ? combined.slice(boundary) : combined.slice(0, boundary).trim();
  }
  if (detail.titleZh === "霸鹟科繁殖生态监测") {
    const marker = "OneK Tyrannidae Breeding Ecology Program\n\nLong–term Monitoring of Flycatcher Nesting Ecology";
    const boundary = detail.en.indexOf(marker);
    return isEn ? detail.en.slice(boundary) : detail.en.slice(0, boundary).trim();
  }
  if (detail.titleZh === "鸟巢生态长期监测" && isEn) return detail.en.split("\n\n我建议在 OneK 官网")[0].trim();
  return isEn ? detail.en : detail.zh;
}

function groupByProjectHeadings(chunks: string[], headings: string[]) {
  const boundaries = headings.map((heading) => chunks.findIndex((chunk) => chunk === heading)).filter((index) => index > 2);
  return [0, ...boundaries, chunks.length].slice(0, -1).map((start, index, starts) => chunks.slice(start, starts[index + 1] ?? chunks.length).join("\n\n")).filter(Boolean);
}

function contentGroups(raw: string, titleZh: string, isStation: boolean, isChineseStation: boolean, isAnnualReport: boolean, isCameraTrap: boolean, isEn: boolean) {
  const sections = raw.split(/\n\s*⸻\s*\n/g).map((part) => part.trim()).filter(Boolean);
  if (isStation && sections.length > 2) return sections.slice(0, 6);
  const chunks = raw.split(/\n{2,}/g).map((part) => part.trim()).filter((part) => Boolean(part) && part !== "⸻");
  if (isAnnualReport) {
    const boundaries = isEn
      ? [[0, 9], [9, 15], [15, 22], [22, 28], [28, 38], [38, 47], [47, 56], [56, 62], [62, 68], [68, 79], [79, 84], [84, 95], [95, 103]]
      : [[0, 7], [7, 13], [13, 20], [20, 26], [26, 36], [36, 45], [45, 54], [54, 60], [60, 66], [66, 77], [77, 82], [82, 94], [94, 101]];
    return boundaries.map(([start, end]) => chunks.slice(start, end).join("\n\n")).filter(Boolean);
  }
  if (isCameraTrap) {
    const boundaries = isEn
      ? [[0, 5], [5, 9], [9, 14], [14, 18], [18, 23], [23, 27], [27, 30], [30, 34]]
      : [[0, 5], [5, 9], [9, 14], [14, 18], [18, 24], [24, 28], [28, 32], [32, 36]];
    return boundaries.map(([start, end]) => chunks.slice(start, end).join("\n\n")).filter(Boolean);
  }
  const headings = projectSectionHeadings[titleZh]?.[isEn ? "en" : "zh"];
  if (headings) return groupByProjectHeadings(chunks, headings);
  if (sections.length > 2) return sections;
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
    const splitLines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    const lines = splitLines.includes("iNaturalist") ? [splitLines.join(" ")] : splitLines;
    const bullets = lines.filter((line) => line.startsWith("•"));
    if (bullets.length === lines.length) return <ul key={index}>{bullets.map((line) => <li key={line}>{line.replace(/^•\s*/, "")}</li>)}</ul>;
    if (openingLabel && /^(Exploring Life|探索生命)/.test(lines[0])) return <h2 key={index}>{lines[0]}</h2>;
    if (firstHeading && index === 0) return <h2 key={index}>{lines[0]}</h2>;
    if (lines.length === 1 && ["Avian Ecology", "鸟类生态学"].includes(lines[0])) return <p key={index}>{lines[0]}</p>;
    if (lines.length === 1 && /顶级捕食者与中型捕食者时间分化机制/.test(lines[0])) return <p key={index}>{lines[0]}</p>;
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
  const isAnnualReport = detail.titleZh === "2025 年度生态监测报告";
  const isCameraTrap = detail.titleZh === "红外相机野生动物长期监测";
  const isChineseStation = !isEn && isStation;
  const rawContent = projectLanguageContent(detail, isEn);
  const groups = contentGroups(rawContent, detail.titleZh, isStation, isChineseStation, isAnnualReport, isCameraTrap, isEn);

  return <main className={`story-legacy-page research-detail-page${isStation ? " research-station-detail" : ""}`} id="top">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div></header>
    <section className="about-detail-hero research-station-hero"><div><p>{isEn ? "LONG–TERM · CONSISTENCY · UNDERSTANDING CHANGE" : "长期 · 持续 · 理解变化"}</p><h1 className={isEn ? "research-hero-title-two-lines" : undefined}>{isEn ? <><span>Long–term · Consistency ·</span><span>Understanding Change</span></> : "科研与长期监测"}</h1><h2>{isEn ? "By returning to the same places year after year, we document ecological processes that unfold beyond a single season, generating knowledge that supports both science and conservation." : "通过持续回到相同地点开展观察与记录，我们追踪跨越单个季节的生态过程，为科学研究和保护决策积累长期知识。"}</h2><a href="#content">{isEn ? "Explore" : "了解更多"} ↓</a></div></section>
    <div className="research-detail-sections" id="content">{groups.map((group, index) => <section className={index % 2 ? "story-legacy-chapter reverse" : index === 0 ? "story-legacy-opening" : "story-legacy-chapter"} key={index}>
      <figure className="story-legacy-image"><img src={index === 0 ? detail.image : supportingImages[index % supportingImages.length]} alt={title} /></figure>
      <article><p className="story-legacy-kicker">{String(index + 1).padStart(2, "0")}</p><TextBlock value={group} firstHeading={isStation} openingLabel={isStation && index === 0 ? (isEn ? "OneK Biological Station" : "OneK 生物站") : undefined} /></article>
    </section>)}</div>
    <div className="story-legacy-back"><Link href={backHref}>← {isEn ? "Back" : "返回"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
