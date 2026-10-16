"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { navItems } from "../navigation";
import SiteEnding from "../_components/SiteEnding";

type Lang = "en" | "zh";

const history = [
  ["Aug 2017", "A Decision Made Above the Clouds", "云端之上的决定", "/archive/decision-above-clouds"],
  ["Earlier 2017", "An Encounter with Costa Rica’s Extraordinary Biodiversity", "与哥斯达黎加非凡生物多样性的相遇", "/archive/costa-rica-encounter"],
  ["Jan 2018", "The Birth of OneK Nature Reserve", "OneK 自然保护区的诞生", "/archive/birth-of-onek"],
  ["2018.04.10", "The day OneK began", "一切开始的地方", "/archive/beginning"],
  ["2018.12", "Building the road to OneK", "通往 OneK 保护区的道路建设", "/archive/access-road"],
  ["2019.04", "Construction of the OneK field camp", "OneK 营地建设启动", "/archive/field-camp"],
  ["2019.05", "Discovering the underground spring", "发现 OneK 地下泉眼", "/archive/spring"],
  ["2019.08.22", "The first anti-poaching action", "首次反偷猎清理行动", "/archive/anti-poaching"],
  ["2020.03.02", "The first OneK toucan drawing", "孩子们画下属于 OneK 的第一只巨嘴鸟", "/archive/toucan-drawing"],
  ["2020.04", "Micro-hydropower experiment", "OneK 微型水力发电系统试验", "/archive/micro-hydro"],
  ["2020.07.03", "Responding to illegal hunting", "发现非法狩猎并加强巡护", "/archive/illegal-hunting"],
  ["2020.11", "The open butterfly farm", "建立 OneK 开放式蝴蝶农场", "/archive/butterfly-farm"],
  ["2021.07", "Stingless bees arrive", "无刺蜂入住蝴蝶农场", "/archive/stingless-bees"],
  ["2024.05", "Natural Echo is founded", "Natural Echo 自然教育社团成立", "/archive/natural-echo-founded"],
] as const;

const branches = [
  { href: "/support", image: "/onek/conservation-logo.jpg", kickerEn: "Protect the rainforest, protect life", kickerZh: "守护雨林，保护生命", title: "OneK Conservation", bodyEn: "OneK Conservation is OneK’s conservation action platform. Through wildlife protection, ecological restoration, stream restoration, anti-poaching patrols, and long-term ecological management, we work to create a safer and more sustainable future for life in the tropical rainforest.", bodyZh: "OneK Conservation 是 OneK 的保护行动平台。我们通过野生动物保护、生态恢复、河流修复、反盗猎巡护和长期生态管理，为热带雨林中的生命创造更加安全和可持续的未来。" },
  { href: "/natural-echo", image: "/onek/natural-echo-logo.png", kickerEn: "Let more children hear the voice of nature", kickerZh: "让自然的声音被更多孩子听见", title: "Natural Echo", bodyEn: "Natural Echo is a youth nature education project initiated by Haoming and Keying. Through birdwatching, nature observation, ecology courses, and science outreach activities, we help more children build a connection with nature and develop understanding, love, and responsibility for life.", bodyZh: "Natural Echo 是由 Haoming 和 Keying 发起的青少年自然教育项目。通过观鸟、自然观察、生态课程和科普活动，我们帮助更多孩子建立与自然的连接，培养对生命的理解、热爱与责任感。" },
  { href: "/research", image: "/onek/station-logo.jpg", kickerEn: "Explore life, document nature", kickerZh: "探索生命，记录自然", title: "OneK Biological Station", bodyEn: "OneK Biological Station is OneK’s research and monitoring platform. We conduct biodiversity surveys, long-term ecological monitoring, and natural history research, building species archives and ecological databases to provide scientific support for tropical ecosystem conservation.", bodyZh: "OneK Biological Station 是 OneK 的科研与监测平台。我们开展生物多样性调查、长期生态监测和自然历史研究，建立物种档案与生态数据库，为热带生态系统保护提供科学支持。" },
] as const;

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";

  return <main className="about-detail-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav>
      <div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div>
    </header>

    <section className="about-detail-hero"><img className="about-hero-image" src="/onek/about-old/hero.jpg" alt="Rainforest canopy at OneK Reserve"/><div className="about-hero-overlay"></div><div className="about-hero-content"><p>{isEn ? "ABOUT ONEK · SOUTHERN COSTA RICA" : "关于 ONEK · 哥斯达黎加南部"}</p><h1>{isEn ? "Growing together with the rainforest" : "与雨林共同成长"}</h1><h2>{isEn ? "From loving nature to protecting it." : "从热爱自然，到守护自然。"}</h2><a href="#story">{isEn ? "Discover OneK" : "认识 OneK"} ↓</a></div></section>

    <section className="about-story-block" id="story"><div className="about-story-image" role="img" aria-label="Wildlife at OneK"></div><div className="about-story-copy"><p>{isEn ? "THE ONEK STORY" : "OneK 的故事"}</p><h2>{isEn ? "A family and a rainforest growing together" : "一家人与一片雨林的共同成长"}</h2><h3>{isEn ? "Finding Answers in the Rainforest" : "在雨林中寻找答案"}</h3><p>{isEn ? "OneK was never the result of a grand plan. Its story has been written one observation, one discovery, and one step at a time. As we learned to understand the rainforest around us, we also discovered our own path—from admiring nature to protecting it. In the end, the rainforest changed more than the landscape. It changed us." : "OneK 的故事并非来自预先规划好的蓝图，而是在一次次观察、记录和实践中慢慢展开。从认识自然到理解自然，从热爱自然到守护自然，这片雨林不仅改变了森林本身，也改变了我们。"}</p><Link href="/about/story">{isEn ? "Read the complete story" : "阅读完整故事"} ↗</Link></div></section>

    <section className="about-work"><div className="about-work-heading"><p>{isEn ? "OUR MISSION" : "我们的使命"}</p><h2>{isEn ? "We came here not to possess this forest, but to ensure that it will always belong to itself." : "我们来到这里，不是为了占有森林，而是希望森林永远属于它自己。"}</h2></div><div className="about-branch-grid">{branches.map((item) => <Link href={item.href} className="about-branch-card" key={item.href}><div><img src={item.image} alt={item.title} /></div><article><small>{isEn ? item.kickerEn : item.kickerZh}</small><h3>{item.title}</h3><p>{isEn ? item.bodyEn : item.bodyZh}</p><b>{isEn ? "Learn more" : "了解更多"} ↗</b></article></Link>)}</div></section>

    <section className="about-place-banner"><div><p>{isEn ? "WHY THIS PLACE MATTERS" : "为什么这里重要"}</p><h2>{isEn ? "A rainforest shaped by rare biodiversity and fragile balance." : "一片由珍稀生物多样性与脆弱平衡共同塑造的雨林。"}</h2></div></section>

    <section className="about-location"><article><p>{isEn ? "LOCATION & BIODIVERSITY" : "地理位置与生物多样性"}</p><h2>{isEn ? "A reserve in one of the world’s great biological crossroads." : "一座位于世界重要生物交汇地带的保护区。"}</h2><div className="about-location-copy">{isEn ? <><p>Located in Costa Rica’s southern Pacific region near the border with Panama, ONE K lies within the Neotropical realm—where the flora and fauna of North and South America meet.</p><p>Although Costa Rica covers only about 0.03% of Earth’s land area, it is home to nearly 4% of the world’s species, making it one of the most biodiverse countries on the planet.</p><p>ONE K is situated in the country’s most species-rich southern region, a globally recognized biodiversity hotspot. Its lowland rainforest, streams, and surrounding habitats provide refuge for extraordinary wildlife and create an exceptional setting for long-term research, restoration, and nature education.</p></> : <><p>OneK 位于哥斯达黎加南太平洋地区、靠近巴拿马边境，地处新热带界，是南北美洲动植物交汇的重要区域。</p><p>哥斯达黎加仅占全球陆地面积约 0.03%，却拥有接近全球 4% 的物种，是地球上生物多样性最丰富的国家之一。</p><p>OneK 位于该国物种最丰富的南部地区，也是全球公认的生物多样性热点。保护区的低地雨林、溪流及周边生境为众多野生动物提供庇护，并为长期科研、生态恢复和自然教育创造了独特条件。</p></>}</div></article><div className="about-location-media"><div className="about-location-photo" role="img" aria-label="OneK biodiversity record"></div><div className="about-location-map"><iframe title="OneK Nature Reserve map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5732.2136552145375!2d-83.23104833000721!3d8.802611641058142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa43f000af756cd%3A0xe10e74f1a5490698!2sonek%20private%20reserve!5e1!3m2!1szh-CN!2sus!4v1776755200988!5m2!1szh-CN!2sus" loading="lazy" /></div></div></section>

    <section className="about-achievements"><div className="about-achievement-heading"><p>{isEn ? "OUR ACHIEVEMENTS" : "我们的成就"}</p><h2>{isEn ? "Measured Change in a Living Landscape" : "在一片活着的土地上，记录真实变化"}</h2><span>{isEn ? "The finest form of protection is to return nature to what it was meant to be." : "最好的保护，是帮助自然恢复它本来的样子。"}</span></div><div className="achievement-mosaic"><article className="achievement-card achievement-large"><div className="achievement-card-image achievement-conservation"></div><div className="achievement-card-copy"><h3>{isEn ? "Conservation & Restoration" : "保护与生态恢复"}</h3><div className="achievement-meta"><span>{isEn ? "Since 2018" : "始于 2018"}</span><span>{isEn ? "Conservation" : "保护行动"}</span><span>{isEn ? "Forest restoration" : "森林恢复"}</span></div>{isEn ? <><p>Since its founding in 2018, OneK Nature Reserve has remained committed to biodiversity conservation, ecosystem restoration, environmental protection, wildlife rescue, and nature education in southern Costa Rica.</p><p>Working closely with SINAC, the reserve supports patrols, monitoring, and conservation enforcement to combat illegal logging, plant extraction, and poaching.</p><p>At the same time, OneK has systematically removed large areas of invasive fern growth, helping restore the structure and ecological function of the native rainforest while building lasting partnerships with schools and conservation organizations.</p></> : <><p>自 2018 年成立以来，OneK 自然保护区持续致力于哥斯达黎加南部的生物多样性保护、生态系统恢复、环境保护、野生动物救助和自然教育。</p><p>保护区与 SINAC 密切合作，支持巡护、监测和保护执法，打击非法砍伐、植物盗采和偷猎行为。</p><p>与此同时，OneK 系统清理大面积入侵蕨类，帮助原生雨林恢复结构和生态功能，并与学校及保护机构建立长期合作。</p></>}</div></article><article className="achievement-card"><div className="achievement-card-image achievement-record"></div><div className="achievement-card-copy"><h3>{isEn ? "Research & Biodiversity Monitoring" : "科研与生物多样性监测"}</h3>{isEn ? <><p>Through years of baseline surveys and field monitoring, the reserve has accumulated a large body of detailed firsthand data.</p><p>Research focused on large felids has provided important clues about regional food webs and ecosystem stability, while long-term studies of insect diversity continue to reveal the small yet essential components of the rainforest ecosystem.</p></> : <><p>经过多年的基础调查与野外监测，保护区已经积累了大量细致的一手数据。</p><p>针对大型猫科动物的研究，为理解区域食物网与生态系统稳定性提供了重要线索；长期昆虫多样性调查，也不断揭示雨林生态系统中微小但不可或缺的组成部分。</p></>}</div></article><article className="achievement-card"><div className="achievement-card-image achievement-water"></div><div className="achievement-card-copy"><h3>{isEn ? "Watershed & Stream Recovery" : "流域与溪流恢复"}</h3>{isEn ? <><p>OneK approaches restoration at the ecosystem level, carrying out long-term work in both watershed protection and forest recovery.</p><p>As stream habitats improved, freshwater crayfish populations—once nearly absent—returned to levels comparable to those of around 35 years ago.</p><p>Sensitive species such as the sunbittern have also returned, once again nesting and breeding along these waterways.</p></> : <><p>OneK 从生态系统层面开展恢复工作，长期推进流域保护与森林恢复。</p><p>随着溪流生境改善，曾经几乎消失的淡水螯虾种群恢复到约 35 年前的水平。</p><p>日鳽等敏感物种也重新回到这些水域沿岸筑巢繁殖。</p></>}</div></article></div></section>

    <section className="about-archive"><div className="about-archive-heading"><p>{isEn ? "ONEK HISTORICAL ARCHIVE" : "OneK 历史档案"}</p><h2>{isEn ? "One forest. One family. One continuing story." : "一片森林，一个家庭，一段持续书写的故事"}</h2><span>{isEn ? "Milestones Along Our Journey with the Rainforest" : "每一个里程碑，都是与雨林共同成长的见证"}</span></div><div className="about-timeline">{history.map(([date, en, zh, href]) => <Link href={href} key={href}><time>{date}</time><h3>{isEn ? en : zh}</h3><b>↗</b></Link>)}</div><Link className="about-all-archive" href="/archive">{isEn ? "Open the complete archive" : "查看完整历史档案"} ↗</Link></section>
    <SiteEnding lang={lang} />
  </main>;
}
