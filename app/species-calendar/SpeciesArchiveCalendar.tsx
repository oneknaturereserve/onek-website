"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useState } from "react";
import { navItems } from "../navigation";
import SiteEnding from "../_components/SiteEnding";

export type SpeciesRecord = {
  observationId: number; observedOn: string; month: number; commonEn: string; commonZh: string;
  scientific: string; orderEn: string; orderZh: string; photo: string; observationUrl: string;
  attribution: string; license: string;
};

type Config = {
  titleEn: string; titleZh: string; eyebrowEn: string; eyebrowZh: string; introEn: string; introZh: string;
  projectUrl: string; projectNameEn: string; projectNameZh: string;
};

const months = [
  [1, "January", "一月"], [2, "February", "二月"], [3, "March", "三月"],
  [4, "April", "四月"], [5, "May", "五月"], [6, "June", "六月"],
  [7, "July", "七月"], [8, "August", "八月"], [9, "September", "九月"],
  [10, "October", "十月"], [11, "November", "十一月"], [12, "December", "十二月"],
] as const;

export default function SpeciesArchiveCalendar({ records, config }: { records: SpeciesRecord[]; config: Config }) {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [menu, setMenu] = useState(false);
  const [month, setMonth] = useState(0);
  const isEn = lang === "en";
  const visible = useMemo(() => month ? records.filter((record) => record.month === month) : records, [month, records]);
  const groups = useMemo(() => {
    const grouped = new Map<string, SpeciesRecord[]>();
    visible.forEach((record) => grouped.set(record.orderEn, [...(grouped.get(record.orderEn) || []), record]));
    return [...grouped.entries()];
  }, [visible]);
  const monthCounts = useMemo(() => Object.fromEntries(months.map(([number]) => [number, records.filter((record) => record.month === number).length])), [records]);
  const orderCount = new Set(records.map((record) => record.orderEn)).size;

  return <main className="species-calendar-page" id="top">
    <header className="interior-header"><Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav><div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")} aria-label={isEn ? "Switch to Chinese" : "切换到英文"}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{isEn ? "Menu" : "菜单"}</button></div></header>

    <section className="species-calendar-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(8,20,13,.84),rgba(8,20,13,.14)),linear-gradient(180deg,transparent 45%,rgba(7,17,11,.7)),url('${records[0]?.photo}')` }}><div><p>{isEn ? config.eyebrowEn : config.eyebrowZh}</p><h1>{isEn ? config.titleEn : config.titleZh}</h1><h2>{isEn ? config.introEn : config.introZh}</h2><span>{isEn ? `${records.length} species · ${orderCount} orders · updated from iNaturalist` : `${records.length} 种 · ${orderCount} 个目 · 数据同步自 iNaturalist`}</span></div></section>

    <section className="species-calendar-controls" aria-label={isEn ? "Filter observations by month" : "按月份筛选观察记录"}><button className={month === 0 ? "active" : ""} onClick={() => setMonth(0)}>{isEn ? "All months" : "全年"}<small>{records.length}</small></button>{months.map(([number, en, zh]) => <button className={month === number ? "active" : ""} onClick={() => setMonth(number)} key={number}>{isEn ? en : zh}<small>{monthCounts[number]}</small></button>)}</section>

    <section className="species-calendar-intro"><p>{isEn ? "SPECIES DIVERSITY" : "物种多样性"}</p><h2>{month ? (isEn ? `Species recorded in ${months[month - 1][1]}` : `${months[month - 1][2]}记录的物种`) : (isEn ? "OneK records, organized by taxonomic order." : "按分类目整理的 OneK 物种记录")}</h2><p>{isEn ? "Each photograph is linked to its original OneK observation on iNaturalist. Repeated species are represented once, using the latest project record." : "每张照片均链接至 OneK 在 iNaturalist 上的原始观察记录；重复物种只保留项目中的最新记录。"}</p></section>

    <div className="species-calendar-groups">{groups.map(([order, species]) => <section className="species-order" key={order}><div className="species-order-heading"><span>{String(species.length).padStart(2, "0")}</span><div><p>{isEn ? "ORDER" : "目"}</p><h2>{isEn ? order : species[0].orderZh}</h2><small>{order}</small></div></div><div className="species-calendar-grid">{species.map((record) => <article className="species-calendar-card" key={record.observationId}><a href={record.observationUrl} target="_blank" rel="noreferrer"><img src={record.photo} alt={isEn ? record.commonEn : record.commonZh} loading="lazy" /></a><div><time dateTime={record.observedOn}>{record.observedOn}</time><h3>{isEn ? record.commonEn : record.commonZh}</h3><p><i>{record.scientific}</i></p><small>{record.attribution} · {record.license}</small><a href={record.observationUrl} target="_blank" rel="noreferrer">{isEn ? "View observation" : "查看原始记录"} ↗</a></div></article>)}</div></section>)}</div>

    <section className="species-calendar-source"><p>{isEn ? "SOURCE & ATTRIBUTION" : "数据来源与授权"}</p><h2>{isEn ? config.projectNameEn : config.projectNameZh}</h2><p>{isEn ? "Names, dates, identifications, and photographs are synchronized from OneK’s public iNaturalist project. Photograph attribution and licensing are retained on every record." : "物种名称、日期、鉴定结果与照片同步自 OneK 的公开 iNaturalist 项目，并在每条记录中保留照片署名和授权信息。"}</p><a href={config.projectUrl} target="_blank" rel="noreferrer">{isEn ? "Open the iNaturalist project" : "打开 iNaturalist 项目"} ↗</a></section>
    <SiteEnding lang={lang} />
  </main>;
}
