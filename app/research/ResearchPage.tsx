"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";

type Lang = "en" | "zh";
type LinkItem = { href: string; en: string; zh: string; image: string };

const collaborations: LinkItem[] = [
  { href: "/research/collaboration/research-internship", en: "Research Internship", zh: "科研实习项目", image: "/onek/research-old/ResearchInsect.jpg" },
  { href: "/research/collaboration/conservation-internship", en: "Conservation Internship", zh: "保护实习项目", image: "/onek/research-old/IntroductionImage2.png" },
  { href: "/research/collaboration/independent-research", en: "Independent Research", zh: "独立研究项目", image: "/onek/research-old/MammalResearch.jpg" },
  { href: "/research/collaboration/university-field-course", en: "University Field Courses", zh: "大学野外课程项目", image: "/onek/research-old/ResearchHeader.JPG" },
];

const copy = {
  en: {
    heroEyebrow: "LONG–TERM · CONSISTENCY · UNDERSTANDING CHANGE", heroTitle: "Long–term · Consistency · Understanding Change", heroText: "By returning to the same places year after year, we document ecological processes that unfold beyond a single season, generating knowledge that supports both science and conservation.", explore: "Explore",
    stationKicker: "ONEK BIOLOGICAL STATION", stationTitle: "Explore life. Document nature. Support conservation.", station: ["Located within OneK Nature Reserve in the lowland tropical rainforest of Costa Rica, OneK Biological Station serves as a field base for scientific research, long–term ecological monitoring, and nature education.", "The station provides opportunities for researchers, students, volunteers, and nature enthusiasts to engage directly with tropical ecosystems through observation and hands-on field experience. Built upon years of continuous monitoring and conservation efforts, OneK seeks to deepen our understanding of the intricate relationships that sustain rainforest biodiversity.", "At OneK, we believe that the best way to understand nature is not simply to study it from afar, but to live alongside it, observe it carefully, and learn from it in the field."],
    collaborationKicker: "RESEARCH & INTERNATIONAL COLLABORATION", collaborationTitle: "International Collaboration", collaborationSubtitle: "Building bridges between science, conservation, and education across borders.", collaboration: ["At OneK, we strive to build an international platform that connects scientific research, nature education, and biodiversity conservation. We welcome universities, research institutions, students, and nature enthusiasts from around the world to engage in long–term monitoring, ecological research, and hands-on conservation efforts in the tropical rainforest.", "Through projects based within OneK Nature Reserve, participants gain direct experience with tropical ecosystems while contributing to meaningful conservation initiatives. Our current collaboration opportunities include research internships, conservation internships, independent research projects, and university field courses, offering diverse pathways for learning, discovery, and impact."],
    monitoringKicker: "ONEK LONG–TERM MONITORING PROJECTS", monitoringTitle: "Research & Long–term Monitoring", monitoring: ["Through continuous observation and scientific inquiry, we seek to understand the intricate relationships that sustain tropical rainforest ecosystems.", "At OneK, we conduct long–term wildlife monitoring, biodiversity surveys, and ecological research to document the dynamics of life in the rainforest. We believe that effective conservation depends on long–term data, careful observation, and a deeper understanding of how ecosystems function as a whole."],
    reportKicker: "DISCOVERY · GROWTH · PROTECTION", reportTitle: "Annual Report", report: ["Tracking our journey in research, conservation, and education.", "Each year, OneK documents the ongoing changes within the rainforest. From long–term ecological monitoring and biodiversity surveys to conservation initiatives and nature education, these reports reflect both our work and the evolving story of a living ecosystem."],
    invitation: "Open invitation", invitationTitle: "We welcome universities, scientific teams, and research institutions to build new collaborations with OneK.", invitationText: "Whether your focus is biodiversity inventory, ecological monitoring, species interactions, tropical field education, or conservation-driven science, OneK offers a setting where research can be both rigorous and deeply grounded in the living rainforest.", contact: "Contact OneK", reserve: "See the Reserve",
  },
  zh: {
    heroEyebrow: "长期 · 持续 · 理解变化", heroTitle: "科研与长期监测", heroText: "通过持续回到相同地点开展观察与记录，我们追踪跨越单个季节的生态过程，为科学研究和保护决策积累长期知识。", explore: "了解更多",
    stationKicker: "ONEK 生物站", stationTitle: "探索生命、记录自然、服务保护", station: ["OneK 生物站位于哥斯达黎加低地热带雨林中的 OneK Nature Reserve 内，是开展科学研究、长期生态监测与自然教育的野外基地。", "生物站为研究人员、学生、志愿者和自然爱好者提供直接参与热带生态系统观察与野外实践的机会。依托多年持续的监测和保护工作，OneK 致力于加深我们对维系雨林生物多样性的复杂关系的理解。", "在 OneK，我们相信，理解自然最好的方式不是远距离研究它，而是与它共同生活、仔细观察，并在野外向它学习。"],
    collaborationKicker: "科研与国际合作", collaborationTitle: "国际合作", collaborationSubtitle: "连接科学、保护与教育，共同守护热带雨林。", collaboration: ["OneK 致力于搭建连接科学研究、自然教育与生态保护的国际合作平台。我们欢迎来自世界各地的高校、研究机构、学生及自然爱好者，共同参与热带雨林的长期监测、生态研究与保护实践。", "依托 OneK Nature Reserve 持续开展的长期项目，合作伙伴不仅能够深入了解热带生态系统，更能够通过真实的野外工作，为生物多样性保护贡献力量。", "目前，OneK 的国际合作主要包括科研实习、保护实习、独立研究以及大学野外课程等项目，致力于为不同背景的参与者提供有意义的学习与实践机会。"],
    monitoringKicker: "ONEK 长期监测项目", monitoringTitle: "科研与长期监测", monitoring: ["通过持续的观察与科学研究，理解维系热带雨林生态系统运转的复杂联系。", "OneK 长期开展野生动物监测、生物多样性调查与生态研究，记录雨林中生命的变化与互动。我们相信，真正有效的保护，建立在长期积累的数据、深入的自然观察，以及对生态系统整体运作的理解之上。"],
    reportKicker: "发现、成长与守护", reportTitle: "年度报告", report: ["记录 OneK 在科研、保护与自然教育中的每一步成长。", "每一年，OneK 都在持续记录这片雨林的变化。从长期生态监测、物种调查到保护行动与自然教育，这些报告不仅见证了我们的工作，也见证了一片森林逐渐恢复生机的过程。"],
    invitation: "开放邀请", invitationTitle: "我们欢迎大学、科研团队和研究机构与 OneK 建立新的合作。", invitationText: "无论你的关注方向是生物多样性调查、生态监测、物种关系、热带野外教育，还是以保护为导向的科学研究，OneK 都提供一个扎根真实雨林、严谨开展研究的平台。", contact: "联系 OneK", reserve: "查看保护区",
  },
} as const;

function Cards({ items, lang }: { items: LinkItem[]; lang: Lang }) { return <div className="research-station-card-grid">{items.map((item) => <Link href={item.href} key={item.href}><img src={item.image} alt={item[lang]} /><span>{item[lang]}</span><b>↗</b></Link>)}</div>; }

function Feature({ image, kicker, title, paragraphs, href, reverse = false, label }: { image: string; kicker: string; title: string; paragraphs: readonly string[]; href: string; reverse?: boolean; label: string }) {
  return <section className={`research-feature ${reverse ? "reverse" : ""}`}><figure><img src={image} alt={title} /></figure><article><p>{kicker}</p><h2>{title}</h2>{paragraphs.map((paragraph) => <span key={paragraph}>{paragraph}</span>)}<Link href={href}>{label} ↗</Link></article></section>;
}

export default function ResearchPage() {
  const [lang, setLang] = useState<Lang>("en"); const [menu, setMenu] = useState(false); const text = copy[lang]; const isEn = lang === "en";
  return <main className="about-detail-page research-station-page" id="top">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div></header>
    <section className="about-detail-hero research-station-hero"><div><p>{text.heroEyebrow}</p><h1 className={isEn ? "research-hero-title-two-lines" : undefined}>{isEn ? <><span>Long–term · Consistency ·</span><span>Understanding Change</span></> : text.heroTitle}</h1><h2>{text.heroText}</h2><a href="#station">{text.explore} ↓</a></div></section>
    <Feature image="/onek/research-old/IntroductionImage2.png" kicker={text.stationKicker} title={text.stationTitle} paragraphs={text.station} href="/research/station" label={text.explore} />
    <section className="research-station-collaboration" id="collaboration"><div className="research-station-heading"><p>{text.collaborationKicker}</p><h2>{text.collaborationTitle}</h2><span className="research-station-subtitle">{text.collaborationSubtitle}</span>{text.collaboration.map((paragraph) => <span key={paragraph}>{paragraph}</span>)}</div><Cards items={collaborations} lang={lang} /></section>
    <Feature image="/onek/research-old/MammalResearch.jpg" kicker={text.monitoringKicker} title={text.monitoringTitle} paragraphs={text.monitoring} href="/research/projects" label={text.explore} />
    <Feature image="/onek/research-old/ResearchInsect.jpg" kicker={text.reportKicker} title={text.reportTitle} paragraphs={text.report} href="/research/annual-reports" label={text.explore} reverse />
    <section className="research-cta-section"><div className="research-cta-card"><p className="research-cta-kicker">{text.invitation}</p><h2>{text.invitationTitle}</h2><p className="research-cta-body">{text.invitationText}</p><div className="research-cta-actions"><Link className="research-cta-primary" href="/contact">{text.contact}</Link></div></div></section>
    <SiteEnding lang={lang} hideContact />
  </main>;
}
