"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";

type Lang = "en" | "zh";

const introduction = {
  en: [
    "Natural Echo is a youth-led nature education initiative founded by Haoming and Keying. It grew from years of exploring the natural world, learning in the OneK rainforest, and discovering how a direct encounter with wildlife can change the way a young person sees life.",
    "Through birdwatching, nature observation, outdoor learning, ecological courses, and community exchange, Natural Echo helps children step beyond the classroom and build a real relationship with nature. Each activity begins with curiosity: learning to notice, to ask questions, and to understand that every living thing is part of a connected world.",
    "The initiative is run by young volunteers and its activities are offered free of charge. From Costa Rica to the San Francisco Bay Area, Natural Echo brings together children from different places and backgrounds through shared experiences of birds, forests, books, culture, and conservation.",
    "We believe that knowledge becomes meaningful when it inspires care. By helping more children hear the voice of nature, we hope to nurture a generation that understands life, respects biodiversity, and is willing to protect the living world.",
  ],
  zh: [
    "Natural Echo 自然回声是由 Haoming 和 Keying 发起的青少年自然教育项目。它源于多年探索自然世界、在 OneK 雨林中学习成长的经历，也源于一个简单的发现：一次真实的野生动物相遇，能够改变一个孩子理解生命的方式。",
    "通过观鸟、自然观察、户外学习、生态课程和社区交流，Natural Echo 帮助孩子们走出课堂，与真实的自然建立连接。每一次活动都从好奇心开始——学习发现、提出问题，并理解每一种生命都是彼此关联的自然世界的一部分。",
    "项目由青少年志愿者共同推动，所有活动均免费开展。从哥斯达黎加到旧金山湾区，Natural Echo 通过鸟类、森林、书籍、文化与自然保护体验，让来自不同地区和背景的孩子彼此连接。",
    "我们相信，知识只有转化为关心与行动时才真正具有意义。让更多孩子听见自然的声音，是希望他们在成长中理解生命、尊重生物多样性，并愿意守护这个充满生命的世界。",
  ],
} as const;

const activities = [
  { href: "/natural-echo/bay-area-birding", image: "/onek/birds.png", kickerEn: "CLUB ACTIVITY", kickerZh: "社团活动", titleEn: "Bay Area Birdwatching", titleZh: "湾区观鸟", summaryEn: "Weekend birdwatching and nature exploration for children in the San Francisco Bay Area.", summaryZh: "面向旧金山湾区儿童开展的周末观鸟与自然探索活动。" },
  { href: "/natural-echo/book-donation", image: "/onek/education.jpg", kickerEn: "COMMUNITY ENGAGEMENT · 2023", kickerZh: "社区参与 · 2023", titleEn: "Books across borders", titleZh: "图书捐赠与文化交流", summaryEn: "Students from the United States and Costa Rica met through books, reading, and shared stories.", summaryZh: "美国与哥斯达黎加学生因书籍、阅读和故事分享而相遇。" },
  { href: "/natural-echo/amazon-exchange", image: "/onek/explore.jpg", kickerEn: "COMMUNITY ENGAGEMENT · 2018", kickerZh: "社区参与 · 2018", titleEn: "Friendship in the Amazon", titleZh: "亚马逊社区交流", summaryEn: "A visit, school supplies, and a football match became a lesson in culture, nature, and friendship.", summaryZh: "一次探访、学习用品与一场足球赛，成为关于文化、自然和友谊的课程。" },
  { href: "/natural-echo/story", image: "/onek/natural-echo-logo.png", kickerEn: "FROM BEIJING TO THE WORLD", kickerZh: "从北京到世界", titleEn: "The Natural Echo story", titleZh: "Natural Echo 的故事", summaryEn: "How global nature journeys and the OneK rainforest inspired a youth-led initiative.", summaryZh: "在全球自然旅行和 OneK 雨林中成长的经历，如何催生一个青少年自然教育项目。" },
] as const;

export default function NaturalEchoPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";

  return <main className="natural-echo-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""} aria-label="Primary navigation"><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav>
      <div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")} aria-label="Switch language"><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{isEn ? "Menu" : "菜单"}</button></div>
    </header>

    <section className="natural-echo-hero">
      <img src="/onek/explore.jpg" alt={isEn ? "Young naturalists observing wildlife" : "青年自然观察者"} />
      <div className="natural-echo-hero-shade" />
      <div className="natural-echo-hero-copy"><p>NATURAL ECHO</p><h1>{isEn ? "Let nature be heard" : "让自然的声音被更多孩子听见"}</h1><h2>{isEn ? "Youth-led nature education" : "由青少年发起的自然教育"}</h2><a href="#introduction">{isEn ? "Discover our mission" : "了解我们的使命"} ↓</a></div>
    </section>

    <section className="natural-echo-intro" id="introduction">
      <figure><img src="/onek/natural-echo-logo.png" alt="Natural Echo" /></figure>
      <article><p className="natural-echo-kicker">{isEn ? "OUR MISSION" : "我们的使命"}</p><h2>{isEn ? "A young voice for the living world" : "让年轻的声音，为自然持续回响"}</h2>{introduction[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
    </section>

    <section className="natural-echo-activities">
      <div className="natural-echo-activities-heading"><p>NATURAL ECHO</p><h2>{isEn ? "Historical Activities" : "历史活动"}</h2></div>
      <div className="natural-echo-grid">{activities.map((activity) => <Link href={activity.href} className="natural-echo-card" key={activity.href}><div className="natural-echo-card-image"><img src={activity.image} alt={isEn ? activity.titleEn : activity.titleZh} /></div><div className="natural-echo-card-copy"><small>{isEn ? activity.kickerEn : activity.kickerZh}</small><h3>{isEn ? activity.titleEn : activity.titleZh}</h3><p>{isEn ? activity.summaryEn : activity.summaryZh}</p><b>{isEn ? "Explore" : "了解更多"} ↗</b></div></Link>)}</div>
    </section>

    <SiteEnding lang={lang} />
  </main>;
}
