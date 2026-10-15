"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../../_components/SiteEnding";
import { navItems } from "../../navigation";

type Lang = "en" | "zh";

const content = {
  en: {
    title: "Book Donation and Cultural Exchange Program",
    lead: "Children from different countries came together through books, building friendships through reading, learning, and cultural exchange.",
    paragraphs: [
      "In 2023, OneK Biological Station helped connect a group of students from the United States, who were participating in educational activities at OneK, with a local elementary school in Costa Rica for a cultural exchange and literacy initiative.",
      "During the visit, the students donated a collection of English-language books to the school, providing local children with additional opportunities to access English reading materials. Beyond the donation itself, students from both countries spent time reading together, sharing stories, and engaging in meaningful conversations.",
      "For many of the children, it was a valuable opportunity to interact with peers from a different cultural background. Through books and shared learning experiences, they built friendships and discovered common interests despite differences in language and culture.",
      "At OneK, we believe conservation is not only about protecting ecosystems, but also about building connections between people. By fostering exchanges between international visitors and local communities, we hope to inspire a new generation of globally minded young people who value both cultural understanding and environmental stewardship.",
    ],
  },
  zh: {
    title: "图书捐赠与文化交流",
    lead: "来自不同国家的孩子们因书籍而相遇，在阅读与交流中建立友谊。",
    paragraphs: [
      "2023年，OneK Biological Station 协助前来参加自然教育活动的美国学生，与哥斯达黎加当地小学建立联系，共同开展了一次跨文化阅读交流活动。",
      "活动中，美国学生向当地学校捐赠了一批英文图书，希望为孩子们提供更多接触英语阅读资源的机会。除了图书捐赠之外，来自不同国家的孩子们还一起阅读、交流和分享故事，在轻松愉快的氛围中建立了友谊。",
      "对于许多孩子而言，这是一次难得的文化交流体验。阅读成为连接不同语言和文化背景的桥梁，也让孩子们感受到知识分享与国际友谊的力量。",
      "OneK 始终相信，自然保护不仅关乎生态系统，也关乎人与人之间的连接。通过促进国际学生与当地社区的交流，我们希望帮助更多年轻人建立开放、包容和尊重自然的全球视野。",
    ],
  },
} as const;

export default function BookDonationPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";
  const page = content[lang];

  return <main className="story-legacy-page book-donation-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""} aria-label="Primary navigation"><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav>
      <div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")} aria-label="Switch language"><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{isEn ? "Menu" : "菜单"}</button></div>
    </header>

    <section className="story-legacy-hero book-donation-hero">
      <img src="/onek/explore.jpg" alt={isEn ? "Young naturalists observing wildlife" : "青年自然观察者"} />
      <div className="story-legacy-hero-shade" />
      <div className="story-legacy-hero-copy">
        <p>NATURAL ECHO</p>
        <h1>{isEn ? "Let the Voice of Nature Be Heard by More Children" : "让自然的声音，被更多孩子听见"}</h1>
        <h2>{isEn ? "Youth–Led Nature Education" : "由青少年发起的自然教育项目"}</h2>
        <a href="#book-donation-content">{isEn ? "Read the activity" : "阅读活动内容"} ↓</a>
      </div>
    </section>

    <section className="story-legacy-opening book-donation-opening" id="book-donation-content">
      <figure className="story-legacy-image"><img src="/onek/about-old/research.jpg" alt={isEn ? "Learning together through books" : "通过书籍共同学习"} /></figure>
      <article>
        <p className="story-legacy-kicker">{isEn ? "COMMUNITY ENGAGEMENT · 2023" : "社区参与 · 2023"}</p>
        <h1 className="book-donation-content-title">{page.title}</h1>
        <p className="book-donation-lead">{page.lead}</p>
        {page.paragraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </article>
    </section>

    <section className="story-legacy-chapter book-donation-chapter reverse">
      <article>
        <p className="story-legacy-kicker">02</p>
        <h2>{isEn ? "Reading as a Bridge" : "阅读成为连接彼此的桥梁"}</h2>
        {page.paragraphs.slice(2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </article>
      <figure className="story-legacy-image"><img src="/onek/about-old/conservation.jpg" alt={isEn ? "Community connection and shared learning" : "社区连接与共同学习"} /></figure>
    </section>

    <div className="story-legacy-back"><Link href="/natural-echo">← {isEn ? "Back to Natural Echo" : "返回自然回声"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
