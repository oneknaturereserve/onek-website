"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../_components/SiteEnding";
import { navItems } from "../navigation";
import type { Lang } from "../site-data";

const enquiries = [
  { no: "01", en: "General Enquiries", zh: "一般咨询", subject: "General enquiry" },
  { no: "02", en: "Research Collaboration", zh: "科研合作", subject: "Research collaboration" },
  { no: "03", en: "Volunteer & Internship", zh: "志愿者与实习", subject: "Volunteer and internship" },
  { no: "04", en: "Education Programs", zh: "自然教育", subject: "Education programs" },
  { no: "05", en: "Visit OneK", zh: "参访保护区", subject: "Visit OneK" },
  { no: "06", en: "Donation & Partnership", zh: "捐赠与机构合作", subject: "Donation and partnership" },
];

export default function ContactPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const t = lang === "en"
    ? { home: "Home", menu: "Menu", contact: "Contact", support: "Support" }
    : { home: "主页", menu: "菜单", contact: "联系我们", support: "支持我们" };

  return <main className="contact-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""} aria-label="Primary navigation">
        <Link href="/">{t.home}</Link>
        {navItems.map(([en, zh, href]) => <Link key={href} href={href}>{lang === "en" ? en : zh}</Link>)}
        <Link href="/contact">{t.contact}</Link>
        <Link className="interior-support" href="/support">{t.support}</Link>
      </nav>
      <div className="interior-actions">
        <button onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label="Switch language"><b>{lang === "en" ? "EN" : "中"}</b><span>{lang === "en" ? "中" : "EN"}</span></button>
        <button className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{t.menu}</button>
      </div>
    </header>
    <section className="contact-hero">
      <p>CONTACT ONEK · COSTA RICA</p>
      <h1>Continue the rainforest story with us.</h1>
      <h2>与我们一起，继续书写雨林的未来。</h2>
      <p>Choose the subject closest to your enquiry. We welcome messages in English and Chinese.</p>
    </section>
    <section className="enquiry-grid">
      {enquiries.map(item => <a key={item.no} href={`mailto:OneK.CR2018@gmail.com?subject=${encodeURIComponent(`[OneK] ${item.subject}`)}`}>
        <small>{item.no}</small><h3>{item.en}</h3><p>{item.zh}</p><b>EMAIL ↗</b>
      </a>)}
    </section>
    <section className="direct-contact">
      <div><small>DIRECT CONTACT</small><h2>Reach us directly<br/><span>直接联系我们</span></h2></div>
      <div className="direct-contact-links"><a href="mailto:OneK.CR2018@gmail.com"><span>Email</span><b>OneK.CR2018@gmail.com ↗</b></a><a href="https://wa.me/50687628888" target="_blank" rel="noreferrer"><span>WhatsApp</span><b>+506 8762 8888 ↗</b></a><div><span>WeChat</span><b>jiangnan010801</b></div></div>
    </section>
    <SiteEnding lang={lang} />
  </main>;
}
