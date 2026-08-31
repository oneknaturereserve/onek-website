"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "zh";

const copy = {
  en: {
    nav: [
      ["Home", "/"],
      ["About", "/about"], ["Field Notes", "/field-notes"], ["Research", "/research"],
      ["Programs", "/programs"], ["Species", "/#species"], ["Natural Echo", "/natural-echo"],
      ["Archive", "/archive"], ["Discover & Observe", "/discover-observe"],
    ],
    reserve: "Private Nature Reserve · Costa Rica",
    title: "OneK Nature Reserve",
    enter: "Enter the rainforest",
    signal: "A living signal from southern Costa Rica",
    aboutKicker: "About OneK",
    aboutTitle: "Growing together with the rainforest",
    aboutBody: "OneK Nature Reserve is a private rainforest reserve in Costa Rica. It is a home for wildlife and a place where ecological restoration, scientific research, and nature education grow together. Through long-term protection and careful stewardship, we work to safeguard biodiversity and keep this land full of life.",
    readStory: "Discover our story",
    fieldKicker: "Latest field note · July 2025",
    fieldTitle: "A Costa Rican endemic appears in the understory",
    fieldBody: "The Black-cheeked Ant-Tanager was recorded in the rainforest understory at OneK Biological Station—an encounter that adds another point to our long-term record of this remarkable forest.",
    readNote: "Read the field note",
    researchKicker: "Research & long-term monitoring",
    researchTitle: "The forest changes. We keep listening.",
    researchBody: "Through camera trapping, field surveys, biodiversity inventories, and restoration assessments, OneK continuously monitors ecological changes within the tropical rainforest. Long-term monitoring helps us understand biodiversity dynamics while providing valuable information for research and conservation management. We believe that effective conservation is built upon long-term data and a deeper understanding of nature.",
    enterStation: "Enter the biological station",
    cameraKicker: "Camera trap · Night signal",
    cameraTitle: "The forest does not sleep",
    cameraPrompt: "Reveal tonight’s visitor",
    cameraFact: "Collared peccary · forest floor survey · temporary image",
    programsKicker: "Explore OneK Private Reserve",
    programsTitle: "Immerse yourself in the rainforest through field exploration, conservation volunteering, and professional research opportunities.",
    speciesKicker: "Species archive",
    nonprofitKicker: "OneK Conservation",
    nonprofitTitle: "Protect the rainforest. Protect life.",
    nonprofitBody: "Asociación ONE K Conservación de la Biodiversidad Costa Rica advances biodiversity conservation, restoration, research, environmental education, and community participation.",
    support: "Support our work",
    echoKicker: "Natural Echo",
    echoTitle: "Let more children hear the voice of nature",
    echoBody: "A youth-led nature education initiative using birdwatching, field observation, ecological learning, and community action to help children build a lasting connection with the natural world.",
    archiveKicker: "OneK historical archive",
    archiveTitle: "One forest. One family. A story still being written.",
    archiveBody: "From the first path in 2018 to wildlife monitoring, restoration, and education today—explore the moments that shaped OneK.",
    contactTitle: "Continue the rainforest story with us.",
    temp: "Temporary image · replace later",
    sound: "Listen to OneK",
    soundPending: "Rainforest recording will be added here",
  },
  zh: {
    nav: [
      ["主页", "/"],
      ["关于 OneK", "/about"], ["雨林信息", "/field-notes"], ["科研监测", "/research"],
      ["参与项目", "/programs"], ["物种档案", "/#species"], ["自然回声", "/natural-echo"],
      ["历史档案", "/archive"], ["发现与观察", "/discover-observe"],
    ],
    reserve: "哥斯达黎加私人自然保护区",
    title: "OneK 自然保护区",
    enter: "走进雨林",
    signal: "来自哥斯达黎加南部的生命信号",
    aboutKicker: "关于 OneK",
    aboutTitle: "与雨林共同成长",
    aboutBody: "OneK Nature Reserve 是一片位于哥斯达黎加热带雨林中的私人自然保护区。这里不仅是野生动物的家园，也是生态恢复、科学研究和自然教育共同开展的地方。通过长期保护与管理，我们致力于守护生物多样性，并让这片土地持续焕发生命力。",
    readStory: "了解我们的故事",
    fieldKicker: "最新雨林记录 · 2025年7月",
    fieldTitle: "在林下遇见哥斯达黎加特有鸟",
    fieldBody: "OneK Biological Station 在保护区雨林下层记录到黑颊蚁唐纳雀。这次相遇，为我们长期记录这片雨林增添了新的坐标。",
    readNote: "阅读完整记录",
    researchKicker: "科研与长期监测",
    researchTitle: "森林不断变化，我们持续聆听。",
    researchBody: "通过红外相机、定点监测、物种记录和生态恢复评估，OneK 持续追踪热带雨林生态系统的变化。长期监测不仅帮助我们了解生物多样性的动态，也为科学研究和保护决策提供依据。我们相信，真正有效的保护，建立在长期的数据积累与对自然的深入理解之上。",
    enterStation: "进入 OneK 生物站",
    cameraKicker: "红外相机 · 深夜信号",
    cameraTitle: "雨林从不入睡",
    cameraPrompt: "揭晓今晚的访客",
    cameraFact: "领西猯 · 林下监测 · 临时示意图片",
    programsKicker: "探索 OneK 私人自然保护区",
    programsTitle: "通过野外探索、保护志愿服务和专业研究机会，深入体验热带雨林。",
    speciesKicker: "物种档案",
    nonprofitKicker: "OneK 保护行动",
    nonprofitTitle: "守护雨林，保护生命。",
    nonprofitBody: "Asociación ONE K Conservación de la Biodiversidad Costa Rica 致力于生物多样性保护、生态恢复、科学研究、环境教育与社区参与。",
    support: "支持保护行动",
    echoKicker: "自然回声 Natural Echo",
    echoTitle: "让自然的声音，被更多孩子听见",
    echoBody: "通过观鸟、自然观察、生态课程和社区行动，帮助更多孩子与真实的自然建立长久连接。",
    archiveKicker: "OneK 历史档案",
    archiveTitle: "一片森林，一个家庭，一段持续书写的故事。",
    archiveBody: "从2018年的第一条道路，到今天的物种监测、生态修复和自然教育——沿着时间，发现塑造 OneK 的重要时刻。",
    contactTitle: "与我们一起，继续书写雨林的未来。",
    temp: "临时图片 · 后续替换",
    sound: "聆听 OneK",
    soundPending: "雨林声音素材将在这里加入",
  },
} as const;

const programs = [
  { no: "01", tagEn: "Adventure", tagZh: "探索", titleEn: "Exploration Journey", titleZh: "探索之旅", img: "/onek/explore.jpg", href: "/exploration", bodyEn: ["Journey into one of the most biodiverse rainforests in Costa Rica, where rivers, waterfalls, and wildlife await around every corner."], bodyZh: ["走进哥斯达黎加生物多样性最丰富的热带雨林之一，在这里，河流、瀑布与野生动物出现在探索旅程的每一个转角。"] },
  { no: "02", tagEn: "Explore. Learn. Protect.", tagZh: "探索自然 · 学习科学 · 守护雨林", titleEn: "International Volunteer Program", titleZh: "国际志愿者项目", img: "/onek/volunteer.jpg", href: "/volunteer", bodyEn: ["OneK International Programs connect people from around the world with real rainforest conservation, ecological research, and environmental education in Costa Rica.", "Join us to experience the rainforest, contribute to meaningful conservation work, and become part of a global community dedicated to protecting biodiversity."], bodyZh: ["OneK 国际项目连接来自世界各地的自然爱好者、学生和青年研究者，共同参与哥斯达黎加热带雨林的自然保护、生态研究和环境教育工作。", "在这里，你不仅是自然的观察者，更是保护行动的参与者。"] },
  { no: "03", tagEn: "Nature Education", tagZh: "自然教育", titleEn: "Nature Education", titleZh: "自然教育", img: "/onek/education.jpg", href: "/education", bodyEn: ["At OneK, the rainforest becomes the classroom. Through observation, exploration, and hands-on experiences, participants develop an understanding of ecological connections and a deeper commitment to conservation."], bodyZh: ["OneK 的自然教育以真实的雨林为课堂，通过观察、探索与实践，引导参与者理解生命之间的联系，并在体验中建立对自然的尊重与守护意识。"] },
];

const species = [
  { en: "Mammals", zh: "哺乳动物", metaEn: "Mammals · 40+ species", metaZh: "哺乳动物 · 40+ 种", bodyEn: "From pumas, ocelots, and jaguarundi to peccaries and brocket deer, the reserve shelters a dynamic tropical mammal community.", bodyZh: "从美洲狮、虎猫和细腰猫，到西猯与小红鹿，保护区庇护着一个充满活力的热带哺乳动物群落。", img: "/onek/species-home/mammals.png", href: "/species-archive/SpeciesPageMammals.html" },
  { en: "Birds", zh: "鸟类", metaEn: "Birds · Southern Costa Rica hotspot", metaZh: "鸟类 · 哥斯达黎加南部热点", bodyEn: "Southern Costa Rica hosts exceptional avian diversity, and OneK has documented remarkable bird activity across the reserve’s forest, river, and edge habitats.", bodyZh: "哥斯达黎加南部拥有非凡的鸟类多样性，OneK 已在保护区的森林、河流及林缘生境中记录到丰富而活跃的鸟类活动。", img: "/onek/species-home/birds.png", href: "/species-archive/SpeciesPageBirds.html" },
  { en: "Insects", zh: "昆虫", metaEn: "Insects · Thousands of species", metaZh: "昆虫 · 数千种", bodyEn: "Diverse ecological niches across the lowland rainforest support highly specialized insect communities and a rich foundation for biodiversity research.", bodyZh: "低地雨林中多样的生态位孕育了高度特化的昆虫群落，也为生物多样性研究提供了丰富基础。", img: "/onek/species-home/insects.png", href: "/species-archive/SpeciesPageInsects.html" },
  { en: "Herps", zh: "两栖与爬行动物", metaEn: "Herps · Amphibians & reptiles", metaZh: "两栖与爬行动物", bodyEn: "Costa Rica is globally recognized for amphibian and reptile diversity, and OneK provides habitat for species that reflect the ecological richness of the southern Pacific region.", bodyZh: "哥斯达黎加以两栖和爬行动物多样性闻名全球，OneK 为众多物种提供栖息地，展现出南太平洋地区丰富的生态特征。", img: "/onek/species-home/herps.png", href: "/species-archive/SpeciesPageHerps.html" },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [soundMessage, setSoundMessage] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <main>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="OneK home"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></a>
      <nav className={menu ? "nav-open" : ""} aria-label="Primary navigation">
        {t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        <a className="nav-contact" href="/contact">{lang === "en" ? "Contact Us" : "联系我们"}</a>
        <a className="nav-support" href="/support">{lang === "en" ? "Support" : "支持我们"}</a>
      </nav>
      <div className="header-actions">
        <button className="language" onClick={() => setLang(lang === "en" ? "zh" : "en")} aria-label="Switch language"><b>{lang === "en" ? "EN" : "中"}</b><span>{lang === "en" ? "中" : "EN"}</span></button>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Menu"><i></i><i></i></button>
      </div>
    </header>

    <section className="hero" id="top">
      <div className="hero-bg"></div><div className="hero-canopy"></div>
      <div className="hero-content">
        <p className="eyebrow">{t.reserve}</p>
        <h1>{t.title}</h1>
        <p className="hero-mission">Research <i>•</i> Education <i>•</i> Conservation</p>
        <p className="hero-line">A place where people and nature grow together.</p>
        <div className="hero-actions-row">
          <a className="round-link" href="#about"><span>{t.enter}</span><b>↓</b></a>
          <button className="sound-button" onClick={() => setSoundMessage(!soundMessage)}><span className="sound-bars"><i></i><i></i><i></i><i></i></span>{t.sound}</button>
        </div>
        {soundMessage && <div className="sound-note"><b>Audio placeholder</b><span>{t.soundPending}</span></div>}
      </div>
      <div className="hero-meta"><span>8.6° N · Southern Costa Rica</span><span>{t.signal}</span><span>Since 2018</span></div>
    </section>

    <section className="about section-shell" id="about">
      <div className="section-index">01</div>
      <div className="about-image image-placeholder"><img src="/onek/about.jpg" alt="OneK rainforest life"/><span>{t.temp}</span></div>
      <div className="about-copy"><p className="kicker">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><p className="lead">{t.aboutBody}</p><p className="mission-line">Research · Education · Conservation</p><a className="text-link" href="/about">{t.readStory} <b>↗</b></a></div>
    </section>

    <section className="field-note section-shell">
      <div className="field-photo image-placeholder"><img src="/onek/fieldnote.jpg" alt="Bird recorded at OneK"/><span>{t.temp}</span><div className="photo-label">FIELD RECORD · 2025.07</div></div>
      <article><p className="kicker">{t.fieldKicker}</p><h2>{t.fieldTitle}</h2><p className="latin">Black-cheeked Ant-Tanager · <i>Driophlox atrimaxillaris</i></p><p className="lead">{t.fieldBody}</p><div className="data-row"><span><b>TYPE</b>Field observation</span><span><b>HABITAT</b>Rainforest understory</span><span><b>STATION</b>OneK</span></div><a className="text-link" href="/field-notes">{t.readNote} <b>↗</b></a></article>
    </section>

    <section className="research-section">
      <div className="research-bg"></div>
      <div className="research-copy"><p className="kicker light">{t.researchKicker}</p><h2>{t.researchTitle}</h2><p>{t.researchBody}</p><a className="light-link" href="/research">{t.enterStation} ↗</a></div>
      <div className={`camera-card ${cameraOpen ? "revealed" : ""}`}>
        <div className="camera-top"><span>CAM 07</span><span>02:14:38</span><span className="rec">REC</span></div>
        <img src="/onek/camera.jpg" alt="Camera trap wildlife at OneK" />
        {!cameraOpen && <button onClick={() => setCameraOpen(true)}><i></i>{t.cameraPrompt}</button>}
        {cameraOpen && <div className="camera-caption"><b>{t.cameraKicker}</b><span>{t.cameraFact}</span><small>{t.temp}</small></div>}
      </div>
    </section>

    <section className="program-section">
      <div className="program-heading"><h2>{t.programsKicker}</h2><p>{t.programsTitle}</p></div>
      <div className="program-grid">{programs.map(p => <article className="program-card" key={p.no}>
        <div className="program-image"><img src={p.img} alt={p.titleEn}/></div>
        <div className="program-copy"><small>{lang === "en" ? p.tagEn : p.tagZh}</small><h3>{lang === "en" ? p.titleEn : p.titleZh}</h3>{(lang === "en" ? p.bodyEn : p.bodyZh).map((paragraph, i) => <p key={i}>{paragraph}</p>)}<a href={p.href}>{lang === "en" ? "Explore" : "了解更多"} ↗</a></div>
      </article>)}</div>
    </section>

    <section className="species-section" id="species">
      <div className="species-kicker section-shell"><p className="kicker light">{t.speciesKicker}</p></div>
      <div className="species-legacy-list">{species.map((s, i) => <article className={`species-legacy-card ${i % 2 ? "reverse" : ""}`} key={s.en}>
        <div className="species-legacy-copy"><p className="species-legacy-meta">{lang === "en" ? s.metaEn : s.metaZh}</p><h3>{lang === "en" ? s.en : s.zh}</h3><p className="species-legacy-body">{lang === "en" ? s.bodyEn : s.bodyZh}</p><a href={s.href}>{lang === "en" ? "Learn More" : "了解更多"} ↗</a></div>
        <a className="species-legacy-image" href={s.href} aria-label={`${lang === "en" ? "View" : "查看"} ${lang === "en" ? s.en : s.zh}`}><img src={s.img} alt={lang === "en" ? s.en : s.zh}/></a>
      </article>)}</div>
    </section>

    <section className="dual-feature section-shell">
      <article className="nonprofit-card"><div className="org-logo"><img src="/onek/conservation-logo.jpg" alt="OneK Conservation logo" /></div><div><p className="kicker">{t.nonprofitKicker}</p><h2>{t.nonprofitTitle}</h2><p>{t.nonprofitBody}</p><a className="dark-button" href="/support">{t.support} ↗</a></div></article>
      <article className="echo-card"><div className="echo-photo image-placeholder"><img src="/onek/education.jpg" alt="Nature education at OneK"/><span>{t.temp}</span></div><div><p className="kicker light">{t.echoKicker}</p><h2>{t.echoTitle}</h2><p>{t.echoBody}</p><a className="light-link" href="/natural-echo">EXPLORE NATURAL ECHO ↗</a></div></article>
    </section>

    <section className="archive-section"><div className="archive-year">2018—2026</div><div><p className="kicker">{t.archiveKicker}</p><h2>{t.archiveTitle}</h2><p>{t.archiveBody}</p><a className="text-link" href="/archive">EXPLORE THE ARCHIVE ↗</a></div><div className="timeline"><span>2018<small>THE BEGINNING</small></span><i></i><span>2020<small>RESTORATION</small></span><i></i><span>2023<small>RESEARCH</small></span><i></i><span>2026<small>GROWING</small></span></div></section>

    <section className="contact-section"><p>RESEARCH · EDUCATION · CONSERVATION</p><h2>{t.contactTitle}</h2><div className="contact-links"><a href="/contact">{lang === "en" ? "Contact Us" : "联系我们"} ↗</a><a href="mailto:OneK.CR2018@gmail.com">Email ↗</a><a href="https://wa.me/50687628888" target="_blank" rel="noreferrer">WhatsApp ↗</a><button onClick={() => navigator.clipboard?.writeText("jiangnan010801")}>WeChat · jiangnan010801</button><a href="/support">Donate / 捐赠 ↗</a></div></section>

    <footer><div className="footer-brand"><img src="/onek/logo.png" alt="OneK"/><p>OneK Nature Reserve<span>Southern Costa Rica</span></p></div><p>© 2018–2026 OneK Nature Reserve</p><a href="#top">BACK TO CANOPY ↑</a></footer>
  </main>;
}
