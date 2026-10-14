"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { navItems } from "../../navigation";
import SiteEnding from "../../_components/SiteEnding";

type Lang = "en" | "zh";

const sections = [
  {
    enTitle: "It Started with Recording Species",
    zhTitle: "从记录物种开始",
    en: [
      "OneK did not begin as a large conservation project.",
      "It began with countless walks through the forest.",
      "We photographed insects. We recorded birds. We searched for butterflies. We observed tree frogs. We learned about every form of life we could find in the rainforest.",
      "Over time, this passion became a shared journey for our entire family.",
      "Our children grew up in the forest. Our daughter began participating in field observations and species documentation at the age of eight. Our son started carrying a camera into the rainforest at age ten, recording wildlife through his own lens.",
      "For them, the forest became more than a place to explore—it became part of their education, their childhood, and their personal growth.",
      "Every step in the development of OneK reflects the collective effort of our family.",
    ],
    zh: [
      "OneK 的起点并不是一个宏大的保护计划。",
      "而是一次又一次走进森林的观察。",
      "我们拍摄昆虫。记录鸟类。寻找蝴蝶。观察树蛙。了解雨林中的每一种生命。",
      "随着时间推移，这份热爱也成为了整个家庭共同参与的事业。",
      "我们的孩子从小就在森林中长大。女儿从八岁开始参与野外观察和物种记录。儿子从十岁开始背着相机走进森林，用自己的镜头记录雨林中的生命。",
      "对于他们来说，森林不仅是学习自然的课堂，更是成长的一部分。",
      "OneK 的每一步发展，都凝聚着整个家庭共同的努力。",
    ],
  },
  {
    enTitle: "What the Rainforest Taught Us",
    zhTitle: "雨林教会我们的事情",
    en: [
      "As our observations became more detailed, we realized that the most important discoveries were not individual species themselves, but the connections between them.",
      "Why do some butterflies gather to collect plant alkaloids? Why do certain birds return to the same stream each year to breed? How do army ants influence entire bird communities? Why can a single cavity-bearing tree support the reproduction of multiple species?",
      "Gradually, our focus shifted. We moved from studying individual species to understanding the rainforest as a living system.",
    ],
    zh: [
      "随着观察越来越深入，我们开始意识到：真正重要的并不仅仅是记录一种昆虫、一只鸟或者一棵树。更重要的是理解它们之间的关系。",
      "为什么有些蝴蝶会聚集收集植物中的生物碱？为什么有些鸟每年都会回到同一条溪流边筑巢？为什么行军蚁会影响整个森林鸟类群落？为什么一棵拥有树洞的老树能够支撑多个物种繁殖？",
      "慢慢地，我们开始从关注单个物种，转向关注整个生态系统。",
    ],
  },
  {
    enTitle: "From Observers to Guardians",
    zhTitle: "从观察者到守护者",
    en: [
      "As time passed, we came to understand that documenting nature alone was not enough.",
      "If we wanted these species to continue thriving, we also needed to help protect the habitats that sustain them.",
      "So we began restoring streams. Protecting forests. Monitoring wildlife. Building long-term ecological databases. Recording bird nesting activity. Studying butterfly behavior. And creating opportunities for environmental education.",
      "Many of OneK’s projects were never part of a formal master plan. Most began with an unexpected observation, a simple question, or years of patient fieldwork.",
      "Together, these efforts gradually evolved into what OneK is today.",
    ],
    zh: [
      "随着时间推移，我们发现，仅仅记录自然是不够的。",
      "如果希望这些生命持续存在，我们也需要参与保护它们赖以生存的环境。",
      "于是，我们开始恢复河流。保护森林。监测野生动物。建立长期生态数据库。记录鸟类繁殖。研究蝴蝶行为。开展生态教育。",
      "OneK 的许多项目都不是提前规划好的。它们往往始于一次偶然发现、一份长期坚持，或者一个持续多年的观察。",
      "这些项目逐渐汇聚在一起，形成了今天的 OneK。",
    ],
  },
  {
    enTitle: "Our Mission",
    zhTitle: "OneK 的使命",
    en: [
      "We believe conservation is about more than protecting a single species.",
      "What truly needs protection is the ecosystem itself.",
      "A healthy flowing stream. A regenerating forest. An old tree that provides nesting cavities. An army ant colony moving across the forest floor. And the countless ecological relationships that connect all forms of life.",
      "When these relationships remain intact, the rainforest retains its ability to thrive.",
    ],
    zh: [
      "我们相信，保护不仅仅是保护某一个物种。真正需要保护的是生态系统本身。",
      "是一条健康流动的溪流。是一片能够持续更新的森林。是一棵提供繁殖资源的老树。是一群在林下迁徙的行军蚁。也是那些连接着无数生命的生态关系。",
      "当这些关系得以延续，森林就拥有持续繁荣的能力。",
    ],
  },
  {
    enTitle: "A Biological Station Still Growing",
    zhTitle: "一个持续成长的生物站",
    en: [
      "Today, OneK is more than a protected forest.",
      "It is developing into a long-term ecological monitoring and natural history research station.",
      "Our work includes:",
      "Biodiversity inventories and species surveys · Bird breeding ecology monitoring · Insect and butterfly research · Army ant and ant-following bird monitoring · Camera-trap studies of mammals · River and forest restoration projects · International volunteer and environmental education programs",
      "Together, these initiatives support OneK’s long-term vision: To contribute to tropical rainforest conservation through scientific documentation, ecological restoration, and environmental education.",
    ],
    zh: [
      "今天的 OneK 已不仅仅是一片受到保护的森林。",
      "它正在发展成为一个长期生态监测与自然历史研究基地。",
      "我们开展：",
      "生物多样性调查 · 鸟类繁殖生态监测 · 昆虫与蝴蝶研究 · 行军蚁与蚁鸟监测 · 哺乳动物红外相机调查 · 河流与森林生态恢复 · 国际志愿者与生态教育项目",
      "这些工作共同构成了 OneK 的长期愿景：通过科学记录、生态恢复和环境教育，为热带雨林保护提供持续而可靠的支持。",
    ],
  },
] as const;

export default function StoryPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";

  return <main className="story-detail-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav>
      <div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div>
    </header>

    <section className="story-hero"><div><p>{isEn ? "THE STORY OF ONEK" : "OneK 的故事"}</p><h1>{isEn ? "Growing Together: A Family and a Rainforest" : "一家人与一片雨林的共同成长"}</h1><h2>{isEn ? "Finding Answers in the Rainforest" : "在雨林中寻找答案"}</h2></div></section>

    <article className="story-prologue"><p className="story-drop">{isEn ? "If someone had asked us a few years ago, “Why did you come to Costa Rica?” The answer would have been simple: Because of our love for nature." : "如果几年前有人问我们：“为什么来到哥斯达黎加？”答案其实很简单。因为对自然的热爱。"}</p>{isEn ? <><p>When we first arrived in this tropical land, we simply hoped to establish a small nature reserve of our own. We never imagined that one day it would grow into a biological station.</p><p>We were captivated by the incredible diversity of life around us—insects, birds, amphibians, forests, and rivers. Everything here inspired curiosity and wonder.</p><p>At the beginning, all we wanted was to discover more species and learn more about the natural world.</p></> : <><p>最初，我们来到这片热带土地，只是想建立一个属于自己的保护区，也没有想过未来会拥有一个生物站。</p><p>我们只是被这里丰富而神奇的生命所吸引。昆虫、鸟类、两栖动物、森林、河流——这里的一切都让我们着迷。</p><p>那时候，我们最想做的事情，是认识更多物种，记录更多生命。</p></>}</article>

    <div className="story-sections">{sections.map((item, index) => <section key={item.enTitle}><div className="story-index">{String(index + 1).padStart(2, "0")}</div><div><h2>{isEn ? item.enTitle : item.zhTitle}</h2>{(isEn ? item.en : item.zh).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>

    <section className="story-belief"><p>{isEn ? "WHAT WE BELIEVE" : "我们相信"}</p><div>{isEn ? <><h2>Every species recorded is a key to understanding nature.</h2><p>Every nest discovered is part of the rainforest’s story.<br />Every stream restored creates new opportunities for life.<br />And every encounter with nature has the power to change a person forever.</p><p>The story of OneK is still being written. It belongs not only to our family, but also to everyone who loves nature and wishes to contribute to biodiversity conservation.</p><p>Because we believe that true conservation is not simply about protecting the forest we see today. It is about ensuring that future generations inherit a world that is still alive with the richness and diversity of nature.</p></> : <><h2>每一个被记录的物种，都是理解自然的一把钥匙。</h2><p>每一个被发现的鸟巢，都是雨林故事的一部分。<br />每一条恢复的溪流，都会重新孕育生命。<br />而每一次与自然的相遇，都可能改变一个人的一生。</p><p>OneK 的故事仍在继续。它不仅属于我们一家人，也属于所有热爱自然、愿意为生物多样性保护贡献力量的人。</p><p>因为我们相信：真正的保护，不只是守护今天的森林。更是为下一代留下一个依然充满生命的未来。</p></>}</div></section>

    <div className="story-back"><Link href="/about">← {isEn ? "Back to About OneK" : "返回关于 OneK"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
