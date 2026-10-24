"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useState } from "react";
import { navItems } from "../navigation";
import SiteEnding from "../_components/SiteEnding";
import records from "./species-calendar-data.json";

type Lang = "en" | "zh";

const months = [
  [1, "January", "一月"], [2, "February", "二月"], [3, "March", "三月"],
  [4, "April", "四月"], [5, "May", "五月"], [6, "June", "六月"],
  [7, "July", "七月"], [8, "August", "八月"], [9, "September", "九月"],
  [10, "October", "十月"], [11, "November", "十一月"], [12, "December", "十二月"],
] as const;

export default function SpeciesCalendarPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const [month, setMonth] = useState(0);
  const isEn = lang === "en";

  const visible = useMemo(() => month ? records.filter((record) => record.month === month) : records, [month]);
  const groups = useMemo(() => {
    const grouped = new Map<string, typeof records>();
    visible.forEach((record) => {
      const key = record.orderEn;
      grouped.set(key, [...(grouped.get(key) || []), record]);
    });
    return [...grouped.entries()];
  }, [visible]);

  return <main className="species-calendar-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav>
      <div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div>
    </header>

    <section className="species-calendar-hero">
      <div><p>{isEn ? "ONEK · INATURALIST BIRD RECORDS" : "ONEK · iNATURALIST 鸟类记录"}</p><h1>{isEn ? "Species Calendar" : "物种日历"}</h1><h2>{isEn ? "A living calendar of birds observed at OneK Nature Reserve." : "记录 OneK 自然保护区每一次真实鸟类相遇的生命日历。"}</h2><span>{isEn ? `${records.length} species · 18 orders · updated from iNaturalist` : `${records.length} 种鸟类 · 18 个目 · 数据同步自 iNaturalist`}</span></div>
    </section>

    <section className="species-calendar-controls" aria-label={isEn ? "Filter observations by month" : "按月份筛选观察记录"}>
      <button className={month === 0 ? "active" : ""} onClick={() => setMonth(0)}>{isEn ? "All months" : "全年"}<small>{records.length}</small></button>
      {months.map(([number, en, zh]) => {
        const count = records.filter((record) => record.month === number).length;
        return <button className={month === number ? "active" : ""} onClick={() => setMonth(number)} key={number}>{isEn ? en : zh}<small>{count}</small></button>;
      })}
    </section>

    <section className="species-calendar-intro"><p>{isEn ? "BIRD DIVERSITY" : "鸟类多样性"}</p><h2>{month ? (isEn ? `Birds recorded in ${months[month - 1][1]}` : `${months[month - 1][2]}记录的鸟类`) : (isEn ? "The avian life of the reserve, organized by order." : "按鸟类目整理的保护区鸟类记录")}</h2><p>{isEn ? "Each photograph is linked to its original OneK observation on iNaturalist. Repeated species are represented once, using the current project record." : "每张照片均链接至 OneK 在 iNaturalist 上的原始观察记录；重复物种只保留一条当前项目记录。"}</p></section>

    <div className="species-calendar-groups">
      {groups.map(([order, species]) => <section className="species-order" key={order}>
        <div className="species-order-heading"><span>{String(species.length).padStart(2, "0")}</span><div><p>{isEn ? "ORDER" : "目"}</p><h2>{isEn ? order : species[0].orderZh}</h2><small>{order}</small></div></div>
        <div className="species-calendar-grid">{species.map((record) => <article className="species-calendar-card" key={record.observationId}>
          <a href={record.observationUrl} target="_blank" rel="noreferrer"><img src={record.photo} alt={isEn ? record.commonEn : record.commonZh} loading="lazy" /></a>
          <div><time dateTime={record.observedOn}>{record.observedOn}</time><h3>{isEn ? record.commonEn : record.commonZh}</h3><p><i>{record.scientific}</i></p><small>{record.attribution} · {record.license}</small><a href={record.observationUrl} target="_blank" rel="noreferrer">{isEn ? "View observation" : "查看原始记录"} ↗</a></div>
        </article>)}</div>
      </section>)}
    </div>

    <section className="species-calendar-source"><p>{isEn ? "SOURCE & ATTRIBUTION" : "数据来源与授权"}</p><h2>{isEn ? "One K Costa Rica on iNaturalist" : "iNaturalist 上的 One K Costa Rica 项目"}</h2><p>{isEn ? "Names, dates, identifications, and observation photographs are synchronized from OneK’s public iNaturalist project. Photographs are used under CC BY-NC with attribution retained on every record." : "物种名称、日期、鉴定结果与观察照片同步自 OneK 的公开 iNaturalist 项目。所有照片均按 CC BY-NC 授权使用，并在每条记录中保留署名。"}</p><a href="https://www.inaturalist.org/projects/one-k-costa-rica" target="_blank" rel="noreferrer">{isEn ? "Open the iNaturalist project" : "打开 iNaturalist 项目"} ↗</a></section>
    <SiteEnding lang={lang} />
  </main>;
}
