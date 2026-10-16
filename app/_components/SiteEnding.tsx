"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

type Props = { lang: "en" | "zh"; hideContact?: boolean };

export default function SiteEnding({ lang, hideContact = false }: Props) {
  const isEn = lang === "en";

  return <>
    {!hideContact && <section className="contact-section legacy-contact">
      <p>RESEARCH · EDUCATION · CONSERVATION</p>
      <h2>{isEn ? "Continue the rainforest story with us." : "与我们一起，继续书写雨林的未来。"}</h2>
      <p className="legacy-contact-body">{isEn ? "Protect rainforest habitat, support long‑term research, or take part in field programs at OneK Nature Reserve." : "守护雨林栖息地、支持长期科研监测，或亲自参与 OneK 自然保护区的野外项目。"}</p>
      <div className="contact-links"><Link href="/contact">{isEn ? "Contact OneK" : "联系 OneK"}</Link><Link href="/programs">{isEn ? "Join a Program" : "参与项目"}</Link><Link href="/support">{isEn ? "Support Conservation" : "支持保护行动"}</Link></div>
    </section>}
    <footer className="legacy-footer"><div className="legacy-footer-inner">
      <div className="legacy-footer-about"><img src="/onek/logo.png" alt="OneK Nature Reserve"/><b>{isEn ? "Established in 2018" : "始于 2018 年"}</b><p>{isEn ? "OneK protects tropical rainforest through habitat conservation, ecological restoration, long‑term research, nature education, and community participation in southern Costa Rica." : "OneK 在哥斯达黎加南部通过栖息地保护、生态恢复、长期科研、自然教育与社区参与守护热带雨林。"}</p></div>
      <div className="legacy-footer-col"><h3>{isEn ? "Quick Links" : "快速导航"}</h3><Link href="/">{isEn ? "Home" : "主页"}</Link><Link href="/about">{isEn ? "About" : "关于 OneK"}</Link><Link href="/species">{isEn ? "Species" : "物种档案"}</Link><Link href="/research">{isEn ? "Research" : "科研监测"}</Link><Link href="/programs">{isEn ? "Programs" : "参与项目"}</Link></div>
      <div className="legacy-footer-col legacy-footer-contact"><h3>{isEn ? "Contact" : "联系我们"}</h3><a href="mailto:OneK.CR2018@gmail.com">Email<br/><span>OneK.CR2018@gmail.com</span></a><a href="tel:+50687628888">{isEn ? "Phone" : "电话"}<br/><span>+506 8762-8888 (CR)</span></a><div className="legacy-socials"><a href="https://wa.me/50687628888" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="/species-archive/GeneralImage/WhatUp.png" alt=""/></a><span aria-label="Instagram link reserved"><img src="/species-archive/GeneralImage/Instagram.png" alt=""/></span><button onClick={() => navigator.clipboard?.writeText("jiangnan010801")} aria-label="Copy WeChat ID"><img src="/species-archive/GeneralImage/wechat.png" alt=""/><i>WeChat<br/><strong>jiangnan010801</strong></i></button></div></div>
    </div><div className="legacy-footer-bottom">© 2026 OneK Nature Reserve · Southern Costa Rica · All Rights Reserved <a href="#top">{isEn ? "Back to canopy" : "返回顶部"} ↑</a></div></footer>
  </>;
}
