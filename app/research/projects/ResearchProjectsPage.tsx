"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../../_components/SiteEnding";
import { navItems } from "../../navigation";

const projects = [
  ["camera-traps", "Camera Trap Wildlife Monitoring", "红外相机野生动物长期监测", "A long-term, low-impact record of mammals and ground-dwelling birds across the reserve.", "以长期、低干扰的方式记录保护区内哺乳动物与地栖鸟类的生态动态。", "/onek/research-old/MammalResearch.jpg"],
  ["artificial-cavities", "Artificial Cavities Project", "雨林人工树洞生态恢复", "Rebuilding the cavity microhabitats that mature rainforest species depend upon.", "通过恢复树洞与微型栖息结构，重建成熟雨林中关键的生态复杂性。", "/onek/research-old/IntroductionImage2.png"],
  ["nest-ecology", "Nest Ecology Program", "鸟巢生态长期监测", "Documenting nest structures, breeding strategies, and habitat relationships over time.", "长期记录鸟巢结构、繁殖策略及其与栖息环境之间的关系。", "/species-archive/BirdsImage/20-240.jpg"],
  ["manakins", "Manakin Monitoring Project", "娇鹟长期生态监测", "Tracking courtship behavior, lek sites, habitat use, and population dynamics.", "持续追踪娇鹟的求偶行为、求偶场、栖息地利用和种群动态。", "/species-archive/BirdsImage/20-300.jpg"],
  ["flycatchers", "Tyrannidae Breeding Ecology", "霸鹟科繁殖生态监测", "Building a long-term record of the remarkable nesting diversity of tropical flycatchers.", "建立热带霸鹟科多样筑巢方式与繁殖生态的长期档案。", "/species-archive/BirdsImage/20-201.jpg"],
  ["butterfly-ecology", "Butterfly Chemical Ecology", "蝴蝶药物摄食与化学生态", "Studying the hidden chemical relationships between butterflies and rainforest plants.", "研究蝴蝶药物摄食行为及其与雨林植物之间隐藏的化学生态联系。", "/species-archive/InsectsImage/50-11.jpg"],
  ["insect-diversity", "Insect Biodiversity Survey", "昆虫生物多样性长期调查", "Creating a long-term species archive for the organisms that sustain rainforest ecosystems.", "为支撑雨林生态系统运转的昆虫建立长期物种档案与生态数据库。", "/onek/research-old/ResearchInsect.jpg"],
  ["forest-restoration", "Forest Restoration Ecology", "森林生态恢复", "Helping arrested forest succession regain native structure and ecological connections.", "推动生态停滞区域重新恢复原生森林结构与生物多样性连接。", "/onek/research-old/IntroductionImage2.png"],
  ["stream-restoration", "River Ecosystem Recovery", "河流与溪流生态恢复", "Following the recovery of freshwater life and ecological function after years of protection.", "通过长期保护和监测，记录淡水生命与河流生态功能的恢复过程。", "/onek/research-old/ResearchHeader.JPG"],
] as const;

export default function ResearchProjectsPage() {
  const [lang, setLang] = useState<"en" | "zh">("en"); const [menu, setMenu] = useState(false); const isEn = lang === "en";
  return <main className="story-legacy-page research-projects-page" id="top">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div></header>
    <section className="story-legacy-hero research-projects-hero"><img src="/onek/research-old/ResearchHeader.JPG" alt="OneK research" /><div className="story-legacy-hero-shade" /><div className="story-legacy-hero-copy"><p>{isEn ? "ONEK LONG-TERM MONITORING PROJECTS" : "ONEK 长期监测项目"}</p><h1>{isEn ? "Research & Long-term Monitoring" : "科研与长期监测"}</h1></div></section>
    <section className="research-project-list">{projects.map((project, index) => <article className={index % 2 ? "reverse" : ""} key={project[0]}><div><p>{String(index + 1).padStart(2, "0")}</p><h2>{isEn ? project[1] : project[2]}</h2><span>{isEn ? project[3] : project[4]}</span><Link href={`/research/projects/${project[0]}`}>{isEn ? "Explore project" : "查看项目"} ↗</Link></div><img src={project[5]} alt={isEn ? project[1] : project[2]} /></article>)}</section>
    <div className="story-legacy-back"><Link href="/research">← {isEn ? "Back to Research" : "返回科研监测"}</Link></div><SiteEnding lang={lang} />
  </main>;
}
