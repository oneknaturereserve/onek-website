import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const stories = [
  {
    file: "1、一切开始的地方.txt",
    slug: "beginning",
    zhHeader: "2018年4月10日｜一切开始的地方",
    enHeader: "April 10, 2018｜The Day OneK Began",
    zhTitle: "OneK 的开始",
    enTitle: "The Day OneK Began",
  },
  {
    file: "2、修路.txt",
    slug: "access-road",
    zhHeader: "2018年12月｜OneK启动了通往保护区的道路建设工程。",
    enHeader: "December 2018｜Building the Road to OneK",
    zhTitle: "通往 OneK 保护区的道路建设",
    enTitle: "Building the Road to OneK",
    zhLead: "2018年12月｜OneK启动了通往保护区的道路建设工程。",
    enLead: "December 2018 | OneK began construction of the road leading to the reserve.",
    zhHeadings: ["为了进入森林，而不是开发森林", "一切建设的开始", "通往未来的第一步"],
    enHeadings: ["Reaching the Forest to Protect It", "The Foundation of Everything That Followed", "The First Step Toward a Bigger Vision"],
  },
  {
    file: "3、营地建设.txt",
    slug: "field-camp",
    zhHeader: "2019年4月｜OneK营地正式开始建设。",
    enHeader: "April 2019｜Construction of the OneK Field Camp Begins",
    zhTitle: "OneK 营地建设启动",
    enTitle: "Construction of the OneK Field Camp Begins",
    zhLead: "2019年4月｜OneK营地正式开始建设。",
    enLead: "April 2019 | Construction of the OneK field camp officially began.",
    zhHeadings: ["为保护而设计", "基础设施也是保护工作的一部分", "从营地到生物站", "一种与森林共存的尝试"],
    enHeadings: ["Designed for Conservation", "Infrastructure as Part of Conservation", "From Field Camp to Biological Station", "An Ongoing Experiment in Coexistence"],
  },
  {
    file: "4、发现泉眼.txt",
    slug: "spring",
    zhHeader: "2019年5月｜在对保护区进行日常调查和探索的过程中，我们发现了一处常年持续出水的地下泉眼。",
    enHeader: "May 2019｜Discovering the Spring That Would Sustain OneK",
    zhTitle: "发现 OneK 地下泉眼",
    enTitle: "Discovering the Spring That Would Sustain OneK",
    zhLead: "2019年5月｜在对保护区进行日常调查和探索的过程中，我们发现了一处常年持续出水的地下泉眼。",
    enLead: "May 2019 | During routine surveys and exploration of the reserve, we discovered a perennial underground spring.",
    zhHeadings: ["雨林中的生命之源", "从泉眼到供水系统", "一次改变未来的发现"],
    enHeadings: ["A Lifeline from the Forest", "Building a Sustainable Water System", "A Discovery That Shaped the Future"],
  },
  {
    file: "5、首次反偷猎.txt",
    slug: "anti-poaching",
    zhHeader: "2019年8月22日｜开展首次反偷猎清理行动",
    enHeader: "August 22, 2019 | OneK Conducts Its First Anti-Poaching Patrol",
    zhTitle: "开展首次反偷猎清理行动",
    enTitle: "OneK Conducts Its First Anti-Poaching Patrol",
  },
  {
    file: "6、画巨嘴鸟.txt",
    slug: "toucan-drawing",
    zhHeader: "2020年3月2日｜孩子们画下属于OneK的第一只巨嘴鸟",
    enHeader: "March 2, 2020 | A Family Creates OneK’s First Wildlife Mural",
    zhTitle: "孩子们画下属于 OneK 的第一只巨嘴鸟",
    enTitle: "A Family Creates OneK’s First Wildlife Mural",
  },
  {
    file: "7、水利发电.txt",
    slug: "micro-hydro",
    zhHeader: "2020年4月｜OneK微型水力发电系统试验",
    enHeader: "April 2020｜Testing a Small Hydropower System in the Rainforest",
    zhTitle: "OneK 微型水力发电系统试验",
    enTitle: "Testing a Small Hydropower System in the Rainforest",
    zhHeadings: ["一次重要的实践与探索", "保护与发展的平衡", "每一次尝试都值得记录"],
    enHeadings: ["Learning from the Rainforest", "Conservation with Minimal Impact", "Every Attempt Matters"],
    zhStop: "这段历史其实很有价值",
  },
  {
    file: "8、发现非法狩猎.txt",
    slug: "illegal-hunting",
    zhHeader: "2020年7月3日｜发现非法狩猎活动，加强保护区巡护",
    enHeader: "July 3, 2020 | Illegal Hunting Activity Detected, Patrol Efforts Strengthened",
    zhTitle: "发现非法狩猎活动，加强保护区巡护",
    enTitle: "Illegal Hunting Activity Detected, Patrol Efforts Strengthened",
  },
  {
    file: "9、蝴蝶农场.txt",
    slug: "butterfly-farm",
    zhHeader: "2020年11月｜建立 OneK 开放式蝴蝶农场",
    enHeader: "November 2020 | Establishment of the OneK Open Butterfly Farm",
    zhTitle: "建立 OneK 开放式蝴蝶农场",
    enTitle: "Establishment of the OneK Open Butterfly Farm",
  },
  {
    file: "10、无刺蜂入住蝴蝶农场.txt",
    slug: "stingless-bees",
    zhHeader: "2021年7月｜蝴蝶农场迎来新成员——无刺蜂入住",
    enHeader: "July 2021 | New Residents Arrive at the Butterfly Farm: Stingless Bees Introduced",
    zhTitle: "蝴蝶农场迎来新成员——无刺蜂入住",
    enTitle: "New Residents Arrive at the Butterfly Farm: Stingless Bees Introduced",
  },
  {
    file: "11、社团成立.txt",
    slug: "natural-echo-founded",
    zhHeader: "2024年5月｜Natural Echo 自然教育社团成立",
    enHeader: "May 2024 | Natural Echo is Founded at OneK",
    zhTitle: "Natural Echo（自然回声）自然教育社团成立",
    enTitle: "Natural Echo is Founded at OneK",
    enStop: "Category: Education & Community Engagement",
  },
];

function cleanLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && line !== "⸻");
}

function contentAfterLast(lines, marker) {
  const index = lines.lastIndexOf(marker);
  if (index < 0) throw new Error(`Missing marker: ${marker}`);
  return lines.slice(index + 1);
}

function removeArchiveLabels(lines, language) {
  const result = [];
  let skipNextDate = false;
  for (const line of lines) {
    const isLabel = language === "zh" ? line.startsWith("OneK历史档案") : line === "OneK Historical Archive";
    if (isLabel) {
      skipNextDate = true;
      continue;
    }
    if (skipNextDate) {
      skipNextDate = false;
      continue;
    }
    result.push(line);
  }
  return result;
}

function stopAt(lines, marker) {
  if (!marker) return lines;
  const index = lines.findIndex((line) => line.startsWith(marker));
  return index < 0 ? lines : lines.slice(0, index);
}

function toBlocks(lines) {
  const blocks = [];
  let list = [];
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list.splice(0) });
  };
  for (const line of lines) {
    if (line.startsWith("•")) {
      list.push(line.replace(/^•\s*/, "").replace(/[;；]$/, ""));
    } else {
      flushList();
      blocks.push({ type: "paragraph", text: line });
    }
  }
  flushList();
  return blocks;
}

function toSections(lines, title, headings = []) {
  const headingSet = new Set(headings);
  const sections = [];
  let current = { title, lines: [] };
  for (const line of lines) {
    if (headingSet.has(line)) {
      if (current.lines.length) sections.push({ title: current.title, blocks: toBlocks(current.lines) });
      current = { title: line, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.length) sections.push({ title: current.title, blocks: toBlocks(current.lines) });
  return sections;
}

const output = {};
for (const story of stories) {
  const text = readFileSync(resolve(root, "content/archive-history", story.file), "utf8");
  const allLines = cleanLines(text);
  const englishIndex = allLines.indexOf(story.enHeader);
  if (englishIndex < 0) throw new Error(`Missing English header in ${story.file}`);
  const zhSource = allLines.slice(0, englishIndex);
  const enSource = allLines.slice(englishIndex);
  const zhLines = stopAt(removeArchiveLabels(contentAfterLast(zhSource, story.zhHeader), "zh"), story.zhStop);
  const enLines = stopAt(removeArchiveLabels(contentAfterLast(enSource, story.enHeader), "en"), story.enStop);
  if (story.zhLead) zhLines.unshift(story.zhLead);
  if (story.enLead) enLines.unshift(story.enLead);
  output[story.slug] = {
    zh: toSections(zhLines, story.zhTitle, story.zhHeadings),
    en: toSections(enLines, story.enTitle, story.enHeadings),
  };
}

const banner = "// Generated from content/archive-history by scripts/generate-archive-history.mjs.\n";
writeFileSync(resolve(root, "app/archive-history-content.ts"), `${banner}export const archiveHistoryContent = ${JSON.stringify(output, null, 2)} as const;\n`);
