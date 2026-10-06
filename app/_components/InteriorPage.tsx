"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { Lang, SitePage } from "../site-data";
import { navItems } from "../navigation";

const copy = {
  en: { home: "Home", menu: "Menu", contact: "Contact", support: "Support", explore: "Explore", back: "Back", placeholder: "Temporary image · replace after confirmation", related: "Continue exploring", apply: "Contact OneK", footer: "Protecting rainforest through research, education, and conservation." },
  zh: { home: "主页", menu: "菜单", contact: "联系我们", support: "支持我们", explore: "了解更多", back: "返回", placeholder: "临时图片 · 确认素材后替换", related: "继续探索", apply: "联系 OneK", footer: "以科研、教育与保护行动守护热带雨林。" },
};

export default function InteriorPage({ page }: { page: SitePage }) {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const t = copy[lang];

  return <main className="interior-page">
    <header className="interior-header">
      <Link className="interior-brand" href="/" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""} aria-label="Primary navigation">
        <Link href="/">{t.home}</Link>
        {navItems.map(([en, zh, href]) => <Link key={href} href={href}>{lang === "en" ? en : zh}</Link>)}
        <Link href="/contact">{t.contact}</Link><Link className="interior-support" href="/support">{t.support}</Link>
      </nav>
      <div className="interior-actions"><button onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label="Switch language"><b>{lang === "en" ? "EN" : "中"}</b><span>{lang === "en" ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{t.menu}</button></div>
    </header>

    <section className="interior-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(4,17,10,.88),rgba(4,17,10,.28)),url('${page.image}')` }}>
      <div className="interior-hero-inner"><p className="interior-eyebrow">{page.eyebrow[lang]}</p><h1>{page.title[lang]}</h1><h2>{page.subtitle[lang]}</h2><p>{page.intro[lang]}</p><div className="interior-hero-links"><a href="#content">{t.explore} ↓</a><Link href="/contact">{t.apply} ↗</Link></div></div>
      {page.imagePlaceholder && <span className="interior-placeholder">{t.placeholder}</span>}
    </section>

    <div id="content">
      {page.sections ? page.sections.map((item, index) => <section className={`interior-section ${index % 2 ? "tint" : ""}`} key={`${item.title.en}-${index}`}>
        <div className="interior-section-number">{String(index + 1).padStart(2, "0")}</div>
        <div className="interior-section-title"><p>{page.eyebrow[lang]}</p><h2>{item.title[lang]}</h2></div>
        <div className="interior-section-body">{item.body.map((paragraph, p) => <p key={p}>{paragraph[lang]}</p>)}{item.bullets && <ul>{item.bullets.map((bullet, b) => <li key={b}>{bullet[lang]}</li>)}</ul>}</div>
      </section>) : null}

      {page.cards ? <section className="interior-related"><div className="interior-related-heading"><p>{page.eyebrow[lang]}</p><h2>{t.related}</h2></div><div className="interior-card-grid">
        {page.cards.map((item) => <Link className="interior-card" href={item.href} key={item.href}><div className="interior-card-image"><img src={item.image} alt={item.title[lang]} />{item.placeholder && <span>{t.placeholder}</span>}</div><div className="interior-card-copy"><small>{item.kicker[lang]}</small><h3>{item.title[lang]}</h3><p>{item.summary[lang]}</p><b>{t.explore} ↗</b></div></Link>)}
      </div></section> : null}

      {page.quote ? <blockquote className="interior-quote">“{page.quote[lang]}”</blockquote> : null}
    </div>

    <section className="interior-cta"><p>RESEARCH · EDUCATION · CONSERVATION</p><h2>{lang === "en" ? "Continue the rainforest story with us." : "与我们一起，继续书写雨林的未来。"}</h2><div><Link href="/contact">{t.contact}</Link><Link href="/programs">{lang === "en" ? "Join a program" : "参与项目"}</Link><Link href="/support">{t.support}</Link></div></section>
    <footer className="interior-footer"><div><img src="/onek/logo.png" alt="OneK" /><p>{t.footer}</p></div><div><a href="mailto:OneK.CR2018@gmail.com">OneK.CR2018@gmail.com</a><a href="https://wa.me/50687628888" target="_blank" rel="noreferrer">WhatsApp · +506 8762-8888</a><span>WeChat · jiangnan010801</span></div><div><Link href="/">{t.home}</Link><Link href="/contact">{t.contact}</Link><a href="#content">↑ {lang === "en" ? "Back to content" : "返回内容"}</a></div></footer>
  </main>;
}
