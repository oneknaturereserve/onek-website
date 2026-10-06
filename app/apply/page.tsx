"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

export default function ApplyPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name / 姓名: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Country / 国家: ${data.get("country")}`,
      `Program / 项目: ${data.get("program")}`,
      `Dates / 计划时间: ${data.get("dates")}`,
      `Background / 个人背景: ${data.get("background")}`,
      `Interests / 兴趣与目标: ${data.get("interests")}`,
      `Health & accessibility / 健康及无障碍需求: ${data.get("health")}`,
    ].join("\n\n");
    setSent(true);
    window.location.href = `mailto:OneK.CR2018@gmail.com?subject=${encodeURIComponent("[OneK] Program application")}&body=${encodeURIComponent(body)}`;
  }

  return <main className="application-page">
    <header><Link href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link><Link href="/volunteer">← PROGRAMS / 返回项目</Link></header>
    <section className="application-intro"><p>ONEK INTERNATIONAL PROGRAMS</p><h1>Apply to OneK</h1><h2>申请参与 OneK</h2><p>Complete the form below. Submitting will open your email application with the information already prepared. You may also contact us directly through WhatsApp.</p><p>请填写下面的申请信息。提交后将打开电子邮件并自动整理内容；您也可以直接通过 WhatsApp 联系我们。</p></section>
    <section className="application-layout">
      <form onSubmit={submit}>
        <label><span>Name / 姓名 *</span><input name="name" required /></label>
        <label><span>Email *</span><input name="email" type="email" required /></label>
        <label><span>Country / 国家</span><input name="country" /></label>
        <label><span>Program / 申请项目 *</span><select name="program" required defaultValue=""><option value="" disabled>Select / 请选择</option><option>Research Internship / 科研实习</option><option>Conservation Internship / 保护实习</option><option>Independent Research / 独立研究</option><option>University Field Course / 大学野外课程</option><option>Conservation Volunteer / 自然保护志愿者</option><option>Youth Program / 青少年项目</option><option>Nature Education / 自然教育</option></select></label>
        <label><span>Preferred dates / 计划时间</span><input name="dates" placeholder="YYYY-MM — YYYY-MM" /></label>
        <label className="wide"><span>Background / 个人背景 *</span><textarea name="background" rows={5} required /></label>
        <label className="wide"><span>Interests and learning goals / 兴趣与学习目标 *</span><textarea name="interests" rows={5} required /></label>
        <label className="wide"><span>Health or accessibility considerations / 健康或无障碍需求</span><textarea name="health" rows={3} /></label>
        <button type="submit">Prepare email application / 生成邮件申请 ↗</button>
        {sent ? <p className="application-note">Your email application is ready. If no email window opened, write to OneK.CR2018@gmail.com. / 申请邮件已生成；如未打开邮件窗口，请直接发送至 OneK.CR2018@gmail.com。</p> : null}
      </form>
      <aside><p>OTHER WAYS TO APPLY</p><h2>Contact OneK directly</h2><a href="mailto:OneK.CR2018@gmail.com">Email<br/><b>OneK.CR2018@gmail.com ↗</b></a><a href="https://wa.me/50687628888" target="_blank" rel="noreferrer">WhatsApp<br/><b>+506 8762-8888 ↗</b></a><span>WeChat<br/><b>jiangnan010801</b></span><small>Applications are reviewed individually. Dates, fees, accommodation, supervision, safety, and project scope will be confirmed before participation.</small></aside>
    </section>
  </main>;
}
