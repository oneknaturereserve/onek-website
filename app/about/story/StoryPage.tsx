"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import SiteEnding from "../../_components/SiteEnding";
import { navItems } from "../../navigation";

type Lang = "en" | "zh";

type StorySection = {
  enTitle: string;
  zhTitle: string;
  en: readonly string[];
  zh: readonly string[];
  image?: string;
  imagePosition?: string;
};

const opening: StorySection = {
  enTitle: "It Began with a Dream",
  zhTitle: "从一个梦想开始",
  image: "/onek/about-old/story.jpg",
  imagePosition: "65% center",
  en: [
    "The story of OneK began with a simple yet unwavering wish:",
    "To have a piece of land that belonged to nature, and to do everything within our power to protect it.",
    "Many years ago, our family came to Costa Rica.",
    "We were drawn by its extraordinary biodiversity, vast tropical rainforests, and the vitality of life found everywhere.",
    "We loved nature and had always hoped to do something for conservation.",
    "So when OneK was first established, our goal was clear:",
    "To create a nature reserve that could truly protect wildlife and its habitats.",
    "At the time, however, we did not have a complete plan.",
    "We did not know what research we would undertake in the future.",
    "We did not know what projects we would build.",
    "Nor did we imagine that it would one day develop into a biological station.",
    "We knew only this:",
    "This forest was worth protecting.",
  ],
  zh: [
    "OneK 的故事，始于一个简单而坚定的愿望：",
    "拥有一片属于自然的土地，并尽自己所能保护它。",
    "多年前，我们一家人来到哥斯达黎加。",
    "吸引我们的，是这里丰富的生物多样性、广袤的热带雨林，以及无处不在的生命力。",
    "我们热爱自然，也一直希望能够为自然保护做一些事情。",
    "因此，当 OneK 成立之初，我们的目标很明确：",
    "建立一个真正能够保护野生动植物及其栖息地的自然保护区。",
    "但那时的我们并没有一个完整的规划。",
    "我们不知道未来会开展什么研究。",
    "不知道会建立什么项目。",
    "更不知道有一天会发展成为一个生物站。",
    "我们只是知道：",
    "这片森林值得被保护。",
  ],
};

const chapters: readonly StorySection[] = [
  {
    enTitle: "Finding Our Direction in the Forest",
    zhTitle: "在森林里寻找方向",
    image: "/onek/about-old/research.jpg",
    imagePosition: "center 42%",
    en: [
      "During the first few years, we devoted much of our time to daily observation.",
      "Recording birds.",
      "Observing insects.",
      "Searching for amphibians and reptiles.",
      "Photographing mammals.",
      "Learning which forms of life inhabited this forest.",
      "At the same time, our children were also growing up in the forest.",
      "Our daughter began participating in species observation and nature documentation at the age of eight.",
      "Our son began using a camera to record the rainforest’s many forms of life at the age of ten.",
      "For our family, this forest was not only a protected place; it was also a school in which we never stopped learning.",
      "And it was through these observations, repeated day after day, that we began to truly know this rainforest.",
    ],
    zh: [
      "最初几年，我们把大量时间投入到日常观察之中。",
      "记录鸟类。",
      "观察昆虫。",
      "寻找两栖动物和爬行动物。",
      "拍摄哺乳动物。",
      "了解这片森林里生活着哪些生命。",
      "与此同时，我们的孩子也在森林中成长。",
      "女儿从八岁开始参与物种观察和自然记录。",
      "儿子从十岁开始使用相机记录雨林中的各种生物。",
      "对于我们一家人来说，这片森林不仅是一处保护地，也是一所不断学习的学校。",
      "而正是在这些日复一日的观察中，我们开始真正认识这片雨林。",
    ],
  },
  {
    enTitle: "The Rainforest Changed Us",
    zhTitle: "雨林改变了我们",
    image: "/onek/about-old/biodiversity.jpg",
    imagePosition: "center 45%",
    en: [
      "As time passed, we gradually came to realize:",
      "Conservation is not simply about owning a piece of forest.",
      "What truly matters is understanding how the forest works.",
      "We began to notice:",
      "Some birds return to breed beside the same stream every year;",
      "Some butterflies gather near particular plants;",
      "The movement of army ants can influence an entire bird community;",
      "An old tree with nesting cavities may affect the reproductive success of multiple species.",
      "We discovered that the greatest value lay not only in recording a list of species.",
      "It lay in understanding the complex and delicate connections among these lives.",
      "A forest is not merely a collection of many species.",
      "It is an ecosystem in which everything is connected.",
    ],
    zh: [
      "随着时间推移，我们逐渐意识到：",
      "保护并不仅仅是拥有一片森林。",
      "真正重要的是理解森林如何运作。",
      "我们开始注意到：",
      "有些鸟每年都会回到同一条溪流边繁殖；",
      "有些蝴蝶会在特定植物附近聚集；",
      "行军蚁的迁徙会影响整个鸟类群落；",
      "一棵拥有树洞的老树可能关系着多个物种的繁殖成功。",
      "我们发现，最有价值的不仅是记录物种名录。",
      "更是理解这些生命之间复杂而精妙的联系。",
      "森林不只是许多物种的集合。",
      "它是一个彼此连接的生态系统。",
    ],
  },
  {
    enTitle: "From Nature Reserve to Biological Station",
    zhTitle: "从保护区走向生物站",
    image: "/onek/camera.jpg",
    imagePosition: "center",
    en: [
      "As our observations grew deeper, we began to build systems for long‑term documentation.",
      "From the chance discovery of a bird nest to monitoring the breeding behavior of the same species over many years;",
      "From recording a butterfly to studying the relationship between insects and plants;",
      "From protecting a stream to following the recovery of an entire watershed ecosystem.",
      "The direction of OneK gradually became clear.",
      "We began to understand:",
      "Long‑term monitoring is the foundation for understanding ecological change;",
      "Natural history observation is an essential starting point for ecological research;",
      "Scientific research and ecological conservation should support one another.",
      "And so, OneK was no longer simply a protected forest.",
      "It gradually grew into a platform for long‑term ecological monitoring and natural history research.",
      "A biological station connecting conservation, research, and education.",
    ],
    zh: [
      "随着观察越来越深入，我们开始建立长期记录体系。",
      "从偶然发现一个鸟巢，到连续多年监测同一种鸟的繁殖行为；",
      "从记录一只蝴蝶，到研究昆虫与植物之间的关系；",
      "从保护一条溪流，到关注整个流域生态系统的恢复。",
      "OneK 的方向也逐渐变得清晰。",
      "我们开始认识到：",
      "长期监测是理解生态系统变化的基础；",
      "自然历史观察是生态研究的重要起点；",
      "科学研究与生态保护应该相互支持。",
      "于是，OneK 不再仅仅是一片受到保护的森林。",
      "它逐渐成长为一个长期生态监测和自然历史研究平台。",
      "一个连接保护、研究和教育的生物站。",
    ],
  },
];

const workItems = {
  en: [
    "Biodiversity surveys and species documentation",
    "Long‑term monitoring of avian breeding ecology",
    "Insect and butterfly ecology research",
    "Research on army ants and ant-following birds",
    "Camera-trap monitoring of mammals",
    "River and forest ecosystem restoration",
    "International volunteer and ecological education programs",
  ],
  zh: [
    "生物多样性调查与物种记录",
    "鸟类繁殖生态长期监测",
    "昆虫与蝴蝶生态研究",
    "行军蚁与蚁鸟关系研究",
    "哺乳动物红外相机监测",
    "河流与森林生态恢复",
    "国际志愿者与生态教育项目",
  ],
} as const;

const closing = {
  en: [
    "True conservation is not only about safeguarding the nature of today.",
    "It is also about building knowledge for the future, restoring ecosystems, and nurturing the next generation’s understanding and love of nature.",
    "OneK did not grow from a blueprint designed in advance.",
    "It took shape little by little through countless observations, records, discoveries, and reflections.",
    "From a nature reserve to a long‑term ecological monitoring base;",
    "From loving nature to understanding nature;",
    "From a dream to an ongoing endeavor.",
    "This journey continues.",
    "Through long‑term effort, we hope that the story of this rainforest can be recorded, understood, and passed on for generations to come.",
  ],
  zh: [
    "真正的保护不仅仅是守护今天的自然。",
    "更是为未来积累知识、恢复生态系统，并培养下一代对自然的理解与热爱。",
    "OneK 的成长并非来自一份预先设计好的蓝图。",
    "它是在无数次观察、记录、发现和思考中一点一点形成的。",
    "从保护区，到长期生态监测基地；",
    "从热爱自然，到理解自然；",
    "从一个梦想，到一项持续进行中的事业。",
    "这段旅程仍在继续。",
    "而我们希望，通过长期的努力，让这片雨林的故事能够被记录、被理解，并持续传承下去。",
  ],
} as const;

function TemporaryImage({ src, alt, position, isEn }: { src: string; alt: string; position?: string; isEn: boolean }) {
  return <figure className="story-legacy-image">
    <img src={src} alt={alt} style={{ objectPosition: position }} />
    <figcaption>{isEn ? "Temporary image · to be replaced" : "临时图片 · 待正式照片替换"}</figcaption>
  </figure>;
}

export default function StoryPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const isEn = lang === "en";

  return <main className="story-detail-page story-legacy-page" id="top">
    <header className="interior-header">
      <Link className="interior-brand" href="/"><img src="/onek/logo.png" alt="OneK Nature Reserve" /></Link>
      <nav className={menu ? "is-open" : ""}><Link href="/">{isEn ? "Home" : "主页"}</Link>{navItems.map(([en, zh, href]) => <Link key={href} href={href}>{isEn ? en : zh}</Link>)}<Link href="/contact">{isEn ? "Contact" : "联系我们"}</Link></nav>
      <div className="interior-actions"><button onClick={() => setLang(isEn ? "zh" : "en")}><b>{isEn ? "EN" : "中"}</b><span>{isEn ? "中" : "EN"}</span></button><button className="interior-menu" onClick={() => setMenu(!menu)}>{isEn ? "Menu" : "菜单"}</button></div>
    </header>

    <section className="story-legacy-hero">
      <img src="/onek/about-old/hero.jpg" alt={isEn ? "OneK rainforest" : "OneK 热带雨林"} />
      <div className="story-legacy-hero-shade" />
      <div className="story-legacy-hero-copy">
        <p>{isEn ? "THE STORY OF ONEK" : "ONEK 的故事"}</p>
        <h1>{isEn ? "It Began with a Dream" : "从一个梦想开始"}</h1>
      </div>
    </section>

    <section className="story-legacy-opening">
      <TemporaryImage src={opening.image!} position={opening.imagePosition} alt={isEn ? "A family story in the rainforest" : "一家人与雨林的故事"} isEn={isEn} />
      <article>
        <p className="story-legacy-kicker">{isEn ? "THE STORY OF ONEK" : "ONEK 的故事"}</p>
        <h2>{isEn ? opening.enTitle : opening.zhTitle}</h2>
        {(isEn ? opening.en : opening.zh).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </article>
    </section>

    <div className="story-legacy-chapters">
      {chapters.map((chapter, index) => <section className={index % 2 ? "story-legacy-chapter reverse" : "story-legacy-chapter"} key={chapter.enTitle}>
        <article>
          <p className="story-legacy-kicker">{String(index + 1).padStart(2, "0")}</p>
          <h2>{isEn ? chapter.enTitle : chapter.zhTitle}</h2>
          {(isEn ? chapter.en : chapter.zh).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
        </article>
        <TemporaryImage src={chapter.image!} position={chapter.imagePosition} alt={isEn ? chapter.enTitle : chapter.zhTitle} isEn={isEn} />
      </section>)}
    </div>

    <section className="story-legacy-work">
      <div className="story-legacy-work-heading">
        <p className="story-legacy-kicker">04</p>
        <h2>{isEn ? "What We Do Today" : "我们今天在做什么"}</h2>
        <p>{isEn ? "Today, OneK continues to carry out:" : "如今，OneK 持续开展："}</p>
      </div>
      <div className="story-legacy-work-body">
        <TemporaryImage src="/onek/about-old/conservation.jpg" position="center 42%" alt={isEn ? "Conservation work at OneK" : "OneK 的保护工作"} isEn={isEn} />
        <article>
          <ul>{(isEn ? workItems.en : workItems.zh).map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{isEn ? "These projects may appear different, yet they all arise from the same goal:" : "这些项目看似不同，却都源于同一个目标："}</p>
          <h3>{isEn ? "To understand this forest more deeply, and to protect it more effectively." : "更深入地了解这片森林，并更好地保护它。"}</h3>
        </article>
      </div>
    </section>

    <section className="story-legacy-belief">
      <div>
        <p className="story-legacy-kicker">05</p>
        <h2>{isEn ? "What We Believe" : "我们相信"}</h2>
        {(isEn ? closing.en : closing.zh).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </section>

    <div className="story-legacy-back"><Link href="/about">← {isEn ? "Back to About OneK" : "返回关于 OneK"}</Link></div>
    <SiteEnding lang={lang} />
  </main>;
}
