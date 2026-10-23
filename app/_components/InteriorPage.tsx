"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { Lang, SitePage } from "../site-data";
import { navItems } from "../navigation";
import SiteEnding from "./SiteEnding";
import { featuredFieldNote } from "../field-notes-content";

const copy = {
  en: { home: "Home", menu: "Menu", contact: "Contact", support: "Support", explore: "Explore", back: "Back", placeholder: "Temporary image · replace after confirmation", related: "Continue exploring", apply: "Contact OneK", footer: "Protecting rainforest through research, education, and conservation." },
  zh: { home: "主页", menu: "菜单", contact: "联系我们", support: "支持我们", explore: "了解更多", back: "返回", placeholder: "临时图片 · 确认素材后替换", related: "继续探索", apply: "联系 OneK", footer: "以科研、教育与保护行动守护热带雨林。" },
};

export default function InteriorPage({ page }: { page: SitePage }) {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const t = copy[lang];
  const isNaturalEchoActivity = page.path.startsWith("natural-echo/");
  const isArchivePage = page.path === "archive" || page.path.startsWith("archive/");
  const isFieldNotes = page.path === "field-notes";
  const isObservationStory = page.path.startsWith("discover-observe/");
  const isFieldNotesSection = isFieldNotes || page.path === "discover-observe" || page.path.startsWith("discover-observe/");
  const isArchiveStory = Boolean(page.archiveStory);
  const isProgramPage = page.path === "volunteer" || page.path.startsWith("volunteer/") || page.path === "education" || page.path.startsWith("education/");
  const isProgramIndex = page.path === "volunteer" || page.path === "education";
  const archiveSections = page.archiveStory?.[lang] ?? [];
  const archiveImages = [page.image, "/onek/about-old/story.jpg", "/onek/about-old/research.jpg", "/onek/about-old/biodiversity.jpg", "/onek/camera.jpg"];
  const programImages = page.path.startsWith("education")
    ? ["/onek/education.jpg", "/legacy-exploration/ExplorationPageImage/ClassroomImage.JPG", "/legacy-exploration/ExplorationPageImage/birdWatching.jpeg", "/onek/explore.jpg"]
    : ["/onek/volunteer.jpg", "/onek/research-old/ResearchHeader.JPG", "/onek/camera.jpg", "/onek/about-old/biodiversity.jpg", "/legacy-exploration/ExplorationPageImage/Hiking.jpg"];

  return <main className={`interior-page${page.path === "support" ? " conservation-page" : ""}${isNaturalEchoActivity ? " natural-echo-activity-page" : ""}${isArchiveStory ? " story-legacy-page archive-story-page" : ""}${isArchivePage ? " archive-page" : ""}${isFieldNotesSection ? " field-notes-page" : ""}${isProgramPage ? ` program-detail-page${isProgramIndex ? " program-index-page" : " program-story-detail-page"}` : ""}${page.path === "education" ? " education-index-page" : ""}${page.path === "education/about" ? " education-about-page" : ""}`} id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""} aria-label="Primary navigation">
        <Link href="/">{t.home}</Link>
        {navItems.map(([en, zh, href]) => <Link key={href} href={href}>{lang === "en" ? en : zh}</Link>)}
        <Link href="/contact">{t.contact}</Link><Link className="interior-support" href="/support">{t.support}</Link>
      </nav>
      <div className="interior-actions"><button onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label="Switch language"><b>{lang === "en" ? "EN" : "中"}</b><span>{lang === "en" ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{t.menu}</button></div>
    </header>

    <section className={`interior-hero ${isNaturalEchoActivity ? "natural-echo-shared-hero" : ""}`} style={{ backgroundImage: `linear-gradient(90deg,rgba(13,27,19,.78),rgba(13,27,19,.12)),linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.34)),url('${isNaturalEchoActivity ? "/onek/explore.jpg" : page.image}')` }}>
      {isNaturalEchoActivity ? <div className="interior-hero-inner"><p className="interior-eyebrow">NATURAL ECHO</p><h1>{lang === "en" ? "Let the Voice of Nature Be Heard by More Children" : "让自然的声音，被更多孩子听见"}</h1><h2>{lang === "en" ? "Youth–Led Nature Education" : "由青少年发起的自然教育项目"}</h2><div className="interior-hero-links"><a href="#content">{lang === "en" ? "Read the activity" : "阅读活动内容"} ↓</a></div></div> : <div className="interior-hero-inner"><p className="interior-eyebrow">{page.eyebrow[lang]}</p><h1>{page.title[lang]}</h1><h2>{page.subtitle[lang]}</h2>{page.intro[lang] && <p>{page.intro[lang]}</p>}<div className="interior-hero-links"><a href="#content">{t.explore} ↓</a><Link href="/contact">{t.apply} ↗</Link></div></div>}
      {page.path === "volunteer/conservation" && <p className="program-hero-subline">{lang === "en" ? "Protecting Rainforests Through Action" : "在行动中保护雨林"}</p>}
      {page.path === "volunteer/research" && <p className="program-hero-subline">{lang === "en" ? "Tropical Ecology, Biodiversity Monitoring and Conservation Research" : "热带生态学、生物多样性监测与自然保护实践"}</p>}
      {page.path === "volunteer/youth" && <p className="program-hero-subline">{lang === "en" ? "Inspiring the Next Generation of Conservationists" : "培养未来自然保护者的成长计划"}</p>}
      {!isNaturalEchoActivity && page.imagePlaceholder && <span className="interior-placeholder">{t.placeholder}</span>}
    </section>

    <div id="content">
      {isFieldNotes && <div className="field-notes-content">
        <section className="field-notes-feature">
          <figure><img src="/onek/fieldnote.jpg" alt={featuredFieldNote[lang].title} /><figcaption>FIELD RECORD · 2025.07</figcaption></figure>
          <article><p className="field-notes-kicker">{featuredFieldNote[lang].kicker}</p><h2>{featuredFieldNote[lang].title}</h2><p className="field-notes-latin">{featuredFieldNote[lang].scientificName}</p>{featuredFieldNote[lang].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{featuredFieldNote[lang].facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><blockquote>{featuredFieldNote[lang].closing}</blockquote></article>
        </section>
        <section className="field-notes-index"><div className="field-notes-index-heading"><p>{page.eyebrow[lang]}</p><h2>{lang === "en" ? "More records from the rainforest" : "更多雨林记录"}</h2></div><div className="natural-echo-activity-index">
          {page.cards?.filter((item) => item.href !== "/discover-observe/black-cheeked-ant-tanager").map((item, index) => <Link className="natural-echo-activity-row" href={item.href} key={item.href}><small>{item.kicker[lang]}</small><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title[lang]}</h3><p>{item.summary[lang]}</p></div><b>↗</b><img src={item.image} alt="" /></Link>)}
        </div></section>
      </div>}
      {isNaturalEchoActivity && <section className="interior-section natural-echo-activity-intro"><div className="interior-section-number">01</div><div className="interior-section-title"><p>{page.eyebrow[lang]}</p><h2>{page.title[lang]}</h2></div><div className="interior-section-body"><p>{page.intro[lang]}</p></div></section>}
      {!isFieldNotes && isArchiveStory && archiveSections.length > 0 ? <div className="archive-story-content">
        <section className="story-legacy-opening archive-story-opening">
          <figure className="story-legacy-image"><img src={archiveImages[0]} alt={archiveSections[0].title} /></figure>
          <article><p className="story-legacy-kicker">01</p><h2>{archiveSections[0].title}</h2>{archiveSections[0].blocks.map((block, index) => block.type === "paragraph" ? <p key={index}>{block.text}</p> : <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>)}</article>
        </section>
        {archiveSections.length > 1 && <div className="story-legacy-chapters">{archiveSections.slice(1).map((section, index) => <section className={index % 2 ? "story-legacy-chapter reverse" : "story-legacy-chapter"} key={`${section.title}-${index}`}>
          <article><p className="story-legacy-kicker">{String(index + 2).padStart(2, "0")}</p><h2>{section.title}</h2>{section.blocks.map((block, blockIndex) => block.type === "paragraph" ? <p key={blockIndex}>{block.text}</p> : <ul key={blockIndex}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>)}</article>
          <figure className="story-legacy-image"><img src={archiveImages[(index + 1) % archiveImages.length]} alt={section.title} /></figure>
        </section>)}</div>}
        <div className="story-legacy-back"><Link href={isObservationStory ? "/discover-observe" : "/archive"}>← {isObservationStory ? (lang === "en" ? "Back to Discoveries & Observations" : "返回发现与观察") : (lang === "en" ? "Back to the historical archive" : "返回历史档案")}</Link></div>
      </div> : page.sections ? page.sections.map((item, index) => {
        const isNonprofitActions = page.path === "support" && item.title.zh === "行动方向";
        return <section className={`interior-section ${index % 2 ? "tint" : ""}${isNonprofitActions ? " nonprofit-actions-section" : ""}${isProgramPage ? " program-story-section" : ""}`} key={`${item.title.en}-${index}`}>
          <div className="interior-section-number">{String(index + (isNaturalEchoActivity ? 2 : 1)).padStart(2, "0")}</div>
          {isProgramPage && <figure className="program-story-image"><img src={programImages[index % programImages.length]} alt={item.title[lang]} /><figcaption>{lang === "en" ? "Image placeholder · OneK archive" : "图片占位 · OneK 影像档案"}</figcaption></figure>}
          <div className="interior-section-title"><p className={item.label ? "section-specific-label" : ""}>{item.label?.[lang] || page.eyebrow[lang]}</p><h2>{item.title[lang]}</h2></div>
          <div className="interior-section-body">{item.documentBlocks?.[lang] ? item.documentBlocks[lang].map((block, blockIndex) => block.type === "paragraph" ? <p key={blockIndex}>{block.text}</p> : <ul key={blockIndex}>{block.items.map((entry) => <li key={entry}>{entry}</li>)}</ul>) : <>{item.body.filter((paragraph) => paragraph[lang]).map((paragraph, p) => <p key={p}>{paragraph[lang]}</p>)}{(page.path === "volunteer" || page.path === "education") && index === 0 && <Link className="program-story-link" href={page.path === "volunteer" ? "/volunteer/about" : "/education/about"}>{lang === "en" ? "Read the complete introduction" : "查看完整介绍"} ↗</Link>}{item.bullets && (isNonprofitActions ? <ol className="nonprofit-action-grid">{item.bullets.filter((bullet) => bullet[lang]).map((bullet, b) => <li key={b}>{bullet[lang]}</li>)}</ol> : <ul>{item.bullets.filter((bullet) => bullet[lang]).map((bullet, b) => <li key={b}>{bullet[lang]}</li>)}</ul>)}{item.afterBullets?.filter((paragraph) => paragraph[lang]).map((paragraph, p) => <p key={`after-${p}`}>{paragraph[lang]}</p>)}</>}</div>
        </section>;
      }) : null}

      {!isFieldNotes && page.cards ? <section className="interior-related"><div className="interior-related-heading"><p>{page.eyebrow[lang]}</p><h2>{page.path === "education" ? (lang === "en" ? "At OneK, we believe that meaningful conservation begins with meaningful experiences in nature. Through education, exploration, and discovery, we hope to inspire the next generation of naturalists, scientists, and conservationists." : "我们相信，真正的自然保护始于真实的自然体验。通过教育、探索与发现，我们希望激发下一代自然观察者、科学探索者和自然守护者的成长。") : t.related}</h2></div><div className="interior-card-grid">
        {page.cards.map((item) => <Link className="interior-card" href={item.href} key={item.href}><div className="interior-card-image"><img src={item.image} alt={item.title[lang]} />{item.placeholder && <span>{t.placeholder}</span>}</div><div className="interior-card-copy"><small>{item.kicker[lang]}</small><h3>{item.title[lang]}</h3><p>{item.summary[lang]}</p>{item.closing?.[lang] && <p>{item.closing[lang]}</p>}<b>{t.explore} ↗</b></div></Link>)}
      </div></section> : null}

      {page.quote ? <blockquote className="interior-quote">“{page.quote[lang]}”</blockquote> : null}
    </div>

    <SiteEnding lang={lang} />
  </main>;
}
