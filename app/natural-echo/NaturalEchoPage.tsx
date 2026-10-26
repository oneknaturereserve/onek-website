"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";

type Lang = "en" | "zh";
type EchoSection = { enTitle: string; zhTitle: string; en: readonly string[]; zh: readonly string[]; image: string; imagePosition?: string };

const opening = {
  en: [
    "Natural Echo is a youth-led nature education initiative founded by Haoming and Keying, the children of the OneK family.",
    "It was born from a simple yet sincere belief:",
    "To help more children connect with nature, understand the natural world, and grow into future stewards of our planet.",
  ],
  zh: [
    "Natural Echo 是由 OneK 创始家庭的孩子——李浩铭（虫虫）和李柯莹（蝶儿）共同发起成立的青少年自然教育社团。",
    "它诞生于一个简单而真诚的信念：",
    "让更多孩子走进自然、认识自然，并成长为未来的自然守护者。",
  ],
} as const;

const sections: readonly EchoSection[] = [
  {
    enTitle: "From Beijing to the World", zhTitle: "从北京到世界", image: "/onek/about-old/research.jpg", imagePosition: "center",
    en: [
      "Haoming and Keying were born in Beijing, China.",
      "From an early age, they traveled extensively with their parents to some of the world’s most remarkable biodiversity hotspots.",
      "From the rainforests of Papua New Guinea to the Amazon Basin, from the tropical forests of Borneo to the Galápagos Islands, from the African savannas to the cloud forests of Central and South America, they visited more than thirty countries and regions rich in biodiversity.",
      "Using their cameras as tools for exploration, they observed and documented wildlife, birds, and insects, discovering the beauty and diversity of life through countless adventures in nature.",
      "While many children first encounter nature through books, nature had already become an essential part of their daily lives and personal growth.",
      "These experiences allowed them not only to witness different ecosystems around the world, but also to develop a deep appreciation for biodiversity and the importance of conservation.",
    ],
    zh: [
      "李浩铭和李柯莹出生于中国北京。",
      "从很小的时候开始，他们便跟随父母走访世界各地的自然生态热点地区。",
      "从巴布亚雨林到亚马逊河流域，从婆罗洲热带森林到加拉帕戈斯群岛，从非洲草原到中南美洲云雾林，他们在成长过程中走访了三十多个拥有丰富生物多样性的国家和地区，用手中的相机观察和记录野生动物、鸟类以及昆虫，在一次次探索与发现中，认识生命的多样性，感受自然世界的精彩。",
      "在很多孩子通过书本认识自然的时候，自然已经成为他们成长经历的一部分。",
      "这些经历不仅让他们看见了世界各地不同的生态系统，也让他们逐渐理解了生命的多样性与自然保护的重要意义。",
    ],
  },
  {
    enTitle: "Growing Up in the Rainforest", zhTitle: "在雨林中成长", image: "/onek/about-old/hero.jpg", imagePosition: "center 35%",
    en: [
      "In 2018, their family moved to Costa Rica and began building what would later become the OneK Nature Reserve.",
      "For Haoming and Keying, this marked the beginning of a completely different way of life.",
      "Nature was no longer something they visited during travels.",
      "It became home.",
      "They searched for insects in the forest, observed amphibians along rainforest streams, tracked birds through the canopy, and documented wildlife activity during the night.",
      "They participated in biodiversity surveys, ecological monitoring, and species documentation while witnessing the growth of a nature reserve from the ground up.",
      "Over time, they came to realize that the best classroom for nature education is not always found within four walls.",
      "Sometimes, it is found in a forest, beside a river, or in the presence of wild animals.",
    ],
    zh: [
      "2018年，随着家庭移居哥斯达黎加并开始建设 OneK 保护区，李浩铭和李柯莹拥有了一个与以往完全不同的成长环境。",
      "这里不再只是旅行途中短暂经过的自然。",
      "这里成为了他们每天生活的地方。",
      "他们在森林中寻找昆虫，在溪流边观察两栖动物，在树冠间追踪鸟类，在夜晚记录雨林中的生命活动。",
      "他们参与物种调查、生态监测和自然记录，也亲眼见证了一片保护区从无到有的发展过程。",
      "随着时间推移，他们逐渐意识到：",
      "自然教育最好的课堂，并不一定在教室里。",
      "而是在真实的森林、河流和野生动物身边。",
    ],
  },
  {
    enTitle: "Why Natural Echo Was Founded", zhTitle: "为什么成立 Natural Echo", image: "/onek/explore.jpg", imagePosition: "center 42%",
    en: [
      "Through years of exploration around the world and life in the rainforest of OneK, Haoming and Keying gained experiences that profoundly shaped the way they see nature.",
      "They learned that nature does more than teach people about species.",
      "It teaches observation, curiosity, critical thinking, and respect for life.",
      "Because of this, they wanted to share these experiences with other children.",
      "Through birdwatching, nature observation, and hands-on outdoor learning, they hoped to give more young people the opportunity to experience the wonder of the natural world firsthand.",
      "That simple idea became the foundation of Natural Echo.",
      "Natural Echo is a completely volunteer-driven and non-profit youth initiative.",
      "All activities are offered free of charge.",
    ],
    zh: [
      "在世界各地的自然探索和 OneK 雨林生活中，李浩铭和李柯莹收获了许多珍贵的成长经历。",
      "他们发现，自然不仅教会人们认识物种，更教会人们观察、思考和尊重生命。",
      "正因为如此，他们希望将这些经历与更多孩子分享。",
      "通过观鸟、自然观察和生态体验活动，让更多孩子有机会走进自然，用自己的眼睛去发现生命世界的精彩。",
      "这便是 Natural Echo 成立的初衷。",
      "这是一个完全公益性质的青少年自然教育社团。",
      "所有活动均免费开展。",
    ],
  },
  {
    enTitle: "From the Nature Reserve to the Community", zhTitle: "从保护区走向社区", image: "/onek/about-old/conservation.jpg", imagePosition: "center",
    en: [
      "Natural Echo was never intended to remain within the boundaries of OneK.",
      "From the beginning, Haoming and Keying hoped to bring nature education beyond the rainforest and into local communities and schools.",
      "Through talks, birdwatching walks, outdoor learning experiences, and science outreach activities, they share the knowledge and experiences they have gained throughout their journey.",
      "They believe that nature education is not only about learning facts.",
      "It is about learning how to observe the world.",
      "When a child stops to watch a butterfly, identify a bird, or appreciate a tree, the first seed of conservation has already been planted.",
    ],
    zh: [
      "Natural Echo 的活动不仅发生在 OneK。",
      "从成立之初，李浩铭和李柯莹便希望走出保护区，走进社区和学校。",
      "他们通过自然讲座、观鸟活动、生态课程、野外观察和科普分享，把自己在成长过程中积累的经验与故事传递给更多孩子。",
      "他们相信：",
      "自然教育不仅是知识的传递。",
      "更是一种观察世界的方式。",
      "当一个孩子学会停下脚步观察一只蝴蝶、一只鸟或一棵树时，保护的种子便已经悄悄种下。",
    ],
  },
  {
    enTitle: "Children Inspiring Children", zhTitle: "孩子影响孩子", image: "/onek/about-old/story.jpg", imagePosition: "center",
    en: [
      "What makes Natural Echo unique is that it was not created by adults for children.",
      "It was created by young people themselves.",
      "Here, children are not only learners.",
      "They can also become educators, leaders, and advocates.",
      "Through peer-to-peer learning and shared experiences, nature becomes more than an academic subject.",
      "It becomes something personal and meaningful.",
      "Natural Echo believes that:",
      "Every child who loves nature has the power to inspire another child.",
    ],
    zh: [
      "Natural Echo 最特别的地方在于：",
      "它不是由成年人为孩子设计的项目。",
      "而是由孩子主动发起，并持续推动的自然教育行动。",
      "在这里，孩子不仅是学习者，也可以成为分享者和传播者。",
      "通过同龄人之间的交流与陪伴，自然不再只是课本中的概念，而成为真实的体验和生活的一部分。",
      "Natural Echo 希望证明：",
      "每一个热爱自然的孩子，都有能力影响更多孩子。",
    ],
  },
  {
    enTitle: "From Costa Rica to the San Francisco Bay Area", zhTitle: "从哥斯达黎加到旧金山湾区", image: "/onek/birds.png", imagePosition: "center",
    en: [
      "As he grew older, Haoming moved to the United States to attend the University of California, Berkeley.",
      "Although he left the rainforest of Costa Rica, the mission of Natural Echo continued.",
      "Today, he still dedicates his weekends and free time to organizing birdwatching and nature exploration activities for children in the San Francisco Bay Area, introducing them to local birds, wildlife, wetlands, parks, and natural spaces.",
      "From Beijing to Costa Rica.",
      "From a tropical rainforest to the San Francisco Bay Area.",
      "The locations have changed.",
      "But the passion for nature—and the desire to share it with others—remains the same.",
    ],
    zh: [
      "随着成长，李浩铭前往美国加州大学伯克利分校（UC Berkeley）继续学习。",
      "虽然离开了哥斯达黎加雨林，但 Natural Echo 的故事并没有停止。",
      "直到今天，他依然利用周末和课余时间，在旧金山湾区组织儿童观鸟和自然观察活动，带领当地孩子走进公园、湿地和自然保护区，认识身边的鸟类和野生动物。",
      "从北京到哥斯达黎加，",
      "从热带雨林到旧金山湾区，",
      "改变的是地点。",
      "不变的是对自然的热爱，以及分享自然的初心。",
    ],
  },
] as const;

const vision = {
  en: [
    "We believe that the future of conservation depends not only on scientists, researchers, and conservation professionals.",
    "It also depends on a generation of young people who understand nature, value biodiversity, and are willing to protect it.",
    "Through meaningful experiences in nature, Natural Echo hopes to help more children build lifelong connections with the natural world and inspire a conservation ethic that continues to spread from one generation to the next.",
    "Because every child who steps into nature today",
    "may become someone who helps protect it tomorrow.",
  ],
  zh: [
    "我们相信，未来的自然保护不仅需要科学家、研究人员和保护工作者。",
    "更需要一代真正理解自然、热爱自然并愿意守护自然的年轻人。",
    "Natural Echo 希望通过持续的自然教育与实践活动，帮助更多孩子建立与自然的连接，让保护意识像回声一样不断传播。",
    "因为每一个走进自然的孩子，",
    "都有可能成为未来守护自然的人。",
  ],
} as const;

const activities = [
  { href: "/natural-echo/bay-area-birding", image: "/species-archive/BirdsImage/20-200.jpg", kickerEn: "CLUB ACTIVITY", kickerZh: "社团活动", titleEn: "Bay Area Birdwatching 1", titleZh: "湾区观鸟1", summaryEn: "Weekend birdwatching and nature exploration for children in the San Francisco Bay Area.", summaryZh: "面向旧金山湾区儿童开展的周末观鸟与自然探索活动。" },
  { href: "/natural-echo/book-donation", image: "/onek/about-old/conservation.jpg", kickerEn: "COMMUNITY ENGAGEMENT", kickerZh: "社区参与", titleEn: "Books across borders", titleZh: "图书捐赠与文化交流", summaryEn: "Students from the United States and Costa Rica met through books, reading, and shared stories.", summaryZh: "美国与哥斯达黎加学生因书籍、阅读和故事分享而相遇。" },
  { href: "/natural-echo/amazon-exchange", image: "/onek/explore.jpg", kickerEn: "COMMUNITY ENGAGEMENT", kickerZh: "社区参与", titleEn: "Friendship in the Amazon", titleZh: "亚马逊社区交流", summaryEn: "A visit, school supplies, and a football match became a lesson in culture, nature, and friendship.", summaryZh: "一次探访、学习用品与一场足球赛，成为关于文化、自然和友谊的课程。" },
  { href: "/natural-echo/story", image: "/species-archive/BirdsImage/7-1.jpg", kickerEn: "CLUB ACTIVITY", kickerZh: "社团活动", titleEn: "Bay Area Birdwatching 2", titleZh: "湾区观鸟2", summaryEn: "A second chapter of youth-led birdwatching and outdoor nature learning in the San Francisco Bay Area.", summaryZh: "由青少年继续带领的湾区观鸟与户外自然学习活动。" },
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
      <div className="natural-echo-hero-copy"><p>NATURAL ECHO</p><h1>{isEn ? "Let the Voice of Nature Be Heard by More Children" : "让自然的声音，被更多孩子听见"}</h1><h2>{isEn ? "Youth–Led Nature Education" : "由青少年发起的自然教育项目"}</h2><a href="#introduction">{isEn ? "Read the introduction" : "阅读完整介绍"} ↓</a></div>
    </section>

    <section className="natural-echo-intro" id="introduction">
      <figure><img src="/onek/natural-echo-logo.png" alt="Natural Echo" /></figure>
      <article><p className="natural-echo-kicker">NATURAL ECHO</p><h2>{isEn ? "Youth–Led Nature Education" : "由青少年发起的自然教育项目"}</h2>{opening[lang].map((paragraph, index) => <p className={index === 2 ? "echo-emphasis" : ""} key={paragraph}>{paragraph}</p>)}</article>
    </section>

    <div className="natural-echo-story-sections">{sections.map((section, index) => <section className={index % 2 ? "natural-echo-story-section reverse" : "natural-echo-story-section"} key={section.enTitle}>
      <article><p className="natural-echo-kicker">{String(index + 1).padStart(2, "0")}</p><h2>{isEn ? section.enTitle : section.zhTitle}</h2>{(isEn ? section.en : section.zh).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
      <figure><img src={section.image} alt={isEn ? section.enTitle : section.zhTitle} style={{ objectPosition: section.imagePosition }} /></figure>
    </section>)}</div>

    <section className="natural-echo-vision"><div><p className="natural-echo-kicker">07</p><h2>{isEn ? "Our Vision" : "我们的愿景"}</h2>{vision[lang].map((paragraph, index) => <p className={index >= 3 ? "echo-vision-closing" : ""} key={paragraph}>{paragraph}</p>)}<div className="natural-echo-signoff"><b>Natural Echo</b><span>Let Nature Be Heard.</span>{!isEn && <span>让自然的声音，被更多孩子听见。</span>}</div></div></section>

    <section className="natural-echo-activities">
      <div className="natural-echo-activities-heading"><p>NATURAL ECHO</p><h2>{isEn ? "Historical Activities" : "历史活动"}</h2></div>
      <div className="natural-echo-activity-index">{activities.map((activity, index) => <Link href={activity.href} className="natural-echo-activity-row" key={activity.href}>
        <small>{isEn ? activity.kickerEn : activity.kickerZh}</small>
        <div><span>{String(index + 1).padStart(2, "0")}</span><h3>{isEn ? activity.titleEn : activity.titleZh}</h3><p>{isEn ? activity.summaryEn : activity.summaryZh}</p></div>
        <b>↗</b>
        <img src={activity.image} alt="" aria-hidden="true" />
      </Link>)}</div>
    </section>

    <SiteEnding lang={lang} />
  </main>;
}
