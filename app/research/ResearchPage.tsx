"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";

type Lang = "en" | "zh";
type LinkItem = { href: string; en: string; zh: string; image: string };

const collaborations: LinkItem[] = [
  { href: "/research/collaboration/research-internship", en: "Research Internship", zh: "科研实习项目", image: "/onek/research.jpg" },
  { href: "/research/collaboration/conservation-internship", en: "Conservation Internship", zh: "保护实习项目", image: "/onek/volunteer.jpg" },
  { href: "/research/collaboration/independent-research", en: "Independent Research", zh: "独立研究项目", image: "/onek/camera.jpg" },
  { href: "/research/collaboration/university-field-course", en: "University Field Courses", zh: "大学野外课程项目", image: "/onek/explore.jpg" },
];

const projects: LinkItem[] = [
  { href: "/research/projects/camera-traps", en: "Camera Trap Program", zh: "红外相机长期监测", image: "/onek/camera.jpg" },
  { href: "/research/projects/artificial-cavities", en: "Artificial Tree Cavity Restoration", zh: "雨林人工树洞生态恢复", image: "/species-archive/BirdsImage/20-230.jpg" },
  { href: "/research/projects/nest-ecology", en: "Nest Ecology Program", zh: "鸟巢生态长期监测", image: "/species-archive/BirdsImage/20-240.jpg" },
  { href: "/research/projects/manakins", en: "Manakin Monitoring Program", zh: "娇鹟长期生态监测", image: "/species-archive/BirdsImage/20-300.jpg" },
  { href: "/research/projects/flycatchers", en: "Tyrannidae Breeding Ecology", zh: "霸鹟科繁殖生态监测", image: "/species-archive/BirdsImage/20-201.jpg" },
  { href: "/research/projects/butterfly-ecology", en: "Butterfly Chemical Ecology", zh: "绡蝶药物摄食与化学生态", image: "/species-archive/InsectsImage/50-11.jpg" },
  { href: "/research/projects/insect-diversity", en: "Insect Biodiversity Survey", zh: "昆虫生物多样性长期调查", image: "/species-archive/InsectsImage/2-1.jpg" },
  { href: "/research/projects/forest-restoration", en: "Forest Restoration", zh: "森林生态恢复", image: "/onek/research.jpg" },
  { href: "/research/projects/stream-restoration", en: "Stream Restoration", zh: "河流与溪流生态恢复", image: "/onek/explore.jpg" },
];

const copy = {
  en: {
    heroEyebrow: "LONG-TERM · CONSISTENCY · UNDERSTANDING CHANGE",
    heroTitle: "Long-term · Consistency · Understanding Change",
    heroText: "By returning to the same places year after year, we document ecological processes that unfold beyond a single season, generating knowledge that supports both science and conservation.",
    stationKicker: "ONEK BIOLOGICAL STATION",
    stationTitle: "Explore life. Document nature. Support conservation.",
    station: ["Located within OneK Nature Reserve in the lowland tropical rainforest of Costa Rica, OneK Biological Station serves as a field base for scientific research, long-term ecological monitoring, and nature education.", "The station provides opportunities for researchers, students, volunteers, and nature enthusiasts to engage directly with tropical ecosystems through observation and hands-on field experience. Built upon years of continuous monitoring and conservation efforts, OneK seeks to deepen our understanding of the intricate relationships that sustain rainforest biodiversity.", "At OneK, we believe that the best way to understand nature is not simply to study it from afar, but to live alongside it, observe it carefully, and learn from it in the field."],
    collaborationKicker: "RESEARCH & INTERNATIONAL COLLABORATION",
    collaborationTitle: "International collaboration",
    collaborationText: "Building bridges between science, conservation, and education across borders.",
    monitoringKicker: "ONEK LONG-TERM MONITORING PROJECTS",
    monitoringTitle: "Research & long-term monitoring",
    monitoringText: "Through continuous observation and scientific inquiry, we seek to understand the intricate relationships that sustain tropical rainforest ecosystems.",
    reportKicker: "DISCOVERY · GROWTH · PROTECTION",
    reportTitle: "Annual Report",
    reportText: "Tracking our journey in research, conservation, and education.",
    invitation: "Open invitation",
    invitationText: "We welcome researchers, students, institutions, volunteers, and nature enthusiasts to join us in learning from and protecting the tropical rainforest.",
    explore: "Explore",
  },
  zh: {
    heroEyebrow: "长期 · 持续 · 理解变化",
    heroTitle: "科研与长期监测",
    heroText: "通过持续回到相同地点开展观察与记录，我们追踪跨越单个季节的生态过程，为科学研究和保护决策积累长期知识。",
    stationKicker: "ONEK 生物站",
    stationTitle: "探索生命、记录自然、服务保护",
    station: ["OneK 生物站位于哥斯达黎加低地热带雨林中的 OneK Nature Reserve 内，是开展科学研究、长期生态监测与自然教育的野外基地。", "生物站为研究人员、学生、志愿者和自然爱好者提供直接参与热带生态系统观察与野外实践的机会。依托多年持续的监测和保护工作，OneK 致力于加深我们对维系雨林生物多样性的复杂关系的理解。", "在 OneK，我们相信，理解自然最好的方式不是远距离研究它，而是与它共同生活、仔细观察，并在野外向它学习。"],
    collaborationKicker: "科研与国际合作",
    collaborationTitle: "国际合作",
    collaborationText: "连接科学、保护与教育，共同守护热带雨林。",
    monitoringKicker: "ONEK 长期监测项目",
    monitoringTitle: "科研与长期监测",
    monitoringText: "通过持续的观察与科学研究，理解维系热带雨林生态系统运转的复杂联系。",
    reportKicker: "发现、成长与守护",
    reportTitle: "年度报告",
    reportText: "记录 OneK 在科研、保护与自然教育中的每一步成长。",
    invitation: "开放邀请",
    invitationText: "我们欢迎研究人员、学生、机构、志愿者和自然爱好者，共同学习并参与热带雨林保护。",
    explore: "了解更多",
  },
} as const;

function Cards({ items, lang }: { items: LinkItem[]; lang: Lang }) {
  return <div className="research-station-card-grid">{items.map((item) => <Link href={item.href} key={item.href}><img src={item.image} alt={item[lang]} /><span>{item[lang]}</span><b>↗</b></Link>)}</div>;
}

export default function ResearchPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const text = copy[lang];
  const isEn = lang === "en";

  return <main className="about-detail-page research-station-page">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div></header>
    <section className="about-detail-hero research-station-hero"><div><p>{text.heroEyebrow}</p><h1>{text.heroTitle}</h1><h2>{text.heroText}</h2><a href="#station">{text.explore} ↓</a></div></section>
    <section className="about-story-block research-station-intro" id="station"><div className="about-story-image"><img src="/onek/research.jpg" alt={text.stationTitle} /></div><article className="about-story-copy"><p>{text.stationKicker}</p><h2>{text.stationTitle}</h2>{text.station.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link href="/research/station">{text.explore} ↗</Link></article></section>
    <section className="research-station-collaboration"><div className="research-station-heading"><p>{text.collaborationKicker}</p><h2>{text.collaborationTitle}</h2><span>{text.collaborationText}</span></div><Cards items={collaborations} lang={lang} /></section>
    <section className="research-station-monitoring"><div className="research-station-heading"><p>{text.monitoringKicker}</p><h2>{text.monitoringTitle}</h2><span>{text.monitoringText}</span></div><Cards items={projects} lang={lang} /></section>
    <section className="research-station-report"><div><p>{text.reportKicker}</p><h2>{text.reportTitle}</h2><span>{text.reportText}</span><Link href="/research/annual-reports">{text.explore} ↗</Link></div></section>
    <section className="research-station-invitation"><p>{text.invitation}</p><h2>{text.invitationText}</h2><Link href="/contact">{isEn ? "Contact OneK" : "联系 OneK"} ↗</Link></section>
    <SiteEnding lang={lang} />
  </main>;
}
