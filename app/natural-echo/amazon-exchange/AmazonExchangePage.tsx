"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../../_components/SiteEnding";
import { navItems } from "../../navigation";

type Lang = "en" | "zh";

const content = {
  en: {
    date: "July 2018",
    title: "Friendship Beyond Borders: A Community Visit in the Amazon",
    lead: "Connecting Through Culture, Learning, and Friendship in the Ecuadorian Amazon",
    paragraphs: [
      "As part of our 2018 educational expedition to the Ecuadorian Amazon, we had the opportunity to visit a local Indigenous community in the Napo region and engage in a meaningful cultural exchange with local families and children.",
      "During the visit, participants brought school supplies and educational materials for children in the community. While the gifts themselves were modest, they represented a gesture of friendship, respect, and support across cultures and borders.",
      "More importantly, the visit created an opportunity for genuine interaction. Children from different countries spent time together, shared stories, explored cultural differences, and discovered how much they had in common despite growing up in very different environments.",
      "One of the most memorable moments of the visit was an informal soccer match between our group and local children. Language barriers quickly disappeared on the field as laughter, teamwork, and friendly competition brought everyone together.",
      "The experience reminded us that conservation is ultimately about people as much as it is about nature. Healthy ecosystems and strong communities are deeply connected, and lasting conservation depends on mutual understanding, respect, and collaboration.",
      "For many of the children involved, this was their first opportunity to meet peers from another country. The friendships formed during a single afternoon demonstrated how simple acts of connection can foster empathy, curiosity, and global awareness.",
      "At OneK, we believe that environmental education should also encourage cultural understanding and community engagement. By creating opportunities for meaningful exchanges, we hope to help young people develop not only a love for nature, but also a deeper appreciation for the diverse communities that share our planet.",
      "Small actions can build lasting connections, and sometimes a soccer game in the Amazon can become a lesson that is remembered for years to come.",
    ],
  },
  zh: {
    date: "2018年7月",
    title: "亚马逊社区交流：跨越国界的友谊",
    lead: "在文化、学习与友谊中连接彼此",
    paragraphs: [
      "在2018年厄瓜多尔亚马逊自然教育活动期间，我们有幸走进当地原住民社区，与社区的孩子们开展了一场充满温暖与欢笑的交流活动。",
      "在探访过程中，我们为当地孩子们带去了一些学习用品和文具，希望能够为他们的学习生活提供一点帮助。虽然这些物资并不贵重，但它们承载着来自远方的关心与祝福，也成为连接不同文化和不同国家孩子们之间的一座桥梁。",
      "相比物资捐赠，更珍贵的是人与人之间真实的交流。",
      "活动当天，来自不同国家的孩子们很快打破了语言和文化的隔阂，一起玩耍、交流，并共同参加了一场友谊足球赛。虽然彼此说着不同的语言，但足球成为了最好的沟通方式。奔跑、欢笑、配合与呐喊，让整个球场充满了快乐的氛围。",
      "对于许多参与活动的孩子来说，这是他们第一次与生活在亚马逊雨林中的原住民儿童面对面交流；而对于当地社区的孩子们而言，这同样是一次认识外部世界、了解不同文化的机会。",
      "这次经历让我们更加深刻地认识到，生态保护不仅仅关乎森林、河流和野生动物，也关乎生活在这些生态系统中的人们。",
      "真正可持续的保护，需要人与自然的和谐共生，也需要不同文化之间的理解、尊重与合作。",
      "通过这次交流活动，孩子们不仅了解了亚马逊雨林丰富的生物多样性，也感受到不同文化背景下人们对自然的热爱与依赖。那些一起踢球、一起欢笑的瞬间，成为了许多人心中最珍贵的记忆之一。",
      "OneK 始终相信，自然教育不仅是认识自然，也是在认识世界。",
      "当孩子们学会尊重自然、理解不同文化、关心他人时，保护的种子便已经悄悄生根发芽。",
      "有时候，一场亚马逊雨林中的足球赛，带来的不仅仅是快乐，更是一堂关于友谊、理解与成长的人生课程。",
    ],
  },
} as const;

export default function AmazonExchangePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";
  const page = content[lang];
  const splitAt = isEn ? 4 : 5;

  return <main className="story-legacy-page book-donation-page amazon-exchange-page" id="top">
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
        <a href="#amazon-exchange-content">{isEn ? "Read the activity" : "阅读活动内容"} ↓</a>
      </div>
    </section>

    <section className="story-legacy-opening book-donation-opening" id="amazon-exchange-content">
      <figure className="story-legacy-image"><img src="/onek/explore.jpg" alt={isEn ? "Community exchange in the Amazon" : "亚马逊社区交流"} /></figure>
      <article>
        <p className="story-legacy-kicker">{page.date} · {isEn ? "COMMUNITY ENGAGEMENT" : "社区参与"}</p>
        <h1 className="book-donation-content-title">{page.title}</h1>
        <p className="book-donation-lead">{page.lead}</p>
        {page.paragraphs.slice(0, splitAt).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </article>
    </section>

    <section className="story-legacy-chapter book-donation-chapter reverse">
      <article>
        <p className="story-legacy-kicker">02</p>
        <h2>{isEn ? "Friendship, Understanding, and Growth" : "友谊、理解与成长"}</h2>
        {page.paragraphs.slice(splitAt).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </article>
      <figure className="story-legacy-image"><img src="/onek/about-old/conservation.jpg" alt={isEn ? "People and nature connected" : "人与自然的连接"} /></figure>
    </section>

    <div className="story-legacy-back"><Link href="/natural-echo">← {isEn ? "Back to Natural Echo" : "返回自然回声"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
