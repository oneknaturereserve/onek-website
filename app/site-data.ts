export type Lang = "en" | "zh";
export type Localized = { en: string; zh: string };
export type ContentSection = { title: Localized; body: Localized[]; bullets?: Localized[] };
export type PageCard = { href: string; image: string; kicker: Localized; title: Localized; summary: Localized; placeholder?: boolean };
export type SitePage = {
  path: string;
  eyebrow: Localized;
  title: Localized;
  subtitle: Localized;
  intro: Localized;
  image: string;
  imagePlaceholder?: boolean;
  sections?: ContentSection[];
  cards?: PageCard[];
  quote?: Localized;
};

const L = (en: string, zh: string): Localized => ({ en, zh });
const section = (en: string, zh: string, enBody: string[], zhBody: string[], bullets?: Localized[]): ContentSection => ({
  title: L(en, zh),
  body: enBody.map((text, index) => L(text, zhBody[index] ?? zhBody[zhBody.length - 1] ?? text)),
  bullets,
});
const card = (href: string, image: string, enKicker: string, zhKicker: string, enTitle: string, zhTitle: string, enSummary: string, zhSummary: string, placeholder = true): PageCard => ({
  href, image, kicker: L(enKicker, zhKicker), title: L(enTitle, zhTitle), summary: L(enSummary, zhSummary), placeholder,
});

const history = [
  ["2018.04.10", "The day OneK began", "一切开始的地方", "The gate opened on the first chapter of a family and a rainforest growing together.", "我们第一次打开通往雨林的大门，一个家庭与一片雨林共同成长的故事由此开始。", "beginning"],
  ["2018.12", "Building the road to OneK", "通往 OneK 的道路建设", "A carefully limited access road made long-term protection, monitoring, and safe field work possible.", "为了进入森林、守护森林，我们在尽量减少生态扰动的前提下修建了通行道路。", "access-road"],
  ["2019.04", "Construction of the field camp", "OneK 营地建设启动", "The first field base was designed to coexist with the rainforest and later became the foundation of the biological station.", "营地以减少生态扰动为原则，逐渐成为巡护、监测与生物站工作的基础。", "field-camp"],
  ["2019.05", "Discovering the spring", "发现 OneK 地下泉眼", "A newly discovered water source changed how the reserve understood and protected its watershed.", "一处地下泉眼的发现，让我们更加重视流域保护与雨林淡水生态系统。", "spring"],
  ["2019.08.22", "The first anti-poaching action", "首次反偷猎清理行动", "Removing hunting infrastructure marked an early, concrete commitment to wildlife protection.", "清理非法狩猎设施，标志着 OneK 开始系统推进野生动物保护和日常巡护。", "anti-poaching"],
  ["2020.03.02", "The first OneK toucan drawing", "孩子们画下第一只巨嘴鸟", "A family field observation became a symbol of nature education growing alongside the reserve.", "孩子们用画笔记录巨嘴鸟，自然观察也逐渐成为家庭成长与教育的一部分。", "toucan-drawing"],
  ["2020.04", "Micro-hydropower experiment", "微型水力发电系统试验", "A small renewable-energy experiment explored how field infrastructure could reduce its footprint.", "微型水力发电实验探索了野外基地如何在保障运行的同时降低环境影响。", "micro-hydro"],
  ["2020.07.03", "Responding to illegal hunting", "发现非法狩猎并加强巡护", "Evidence of hunting reinforced the need for boundaries, patrols, and long-term monitoring.", "非法狩猎痕迹让我们进一步加强边界管理、巡护与长期生态监测。", "illegal-hunting"],
  ["2020.11", "The open butterfly farm", "建立开放式蝴蝶农场", "Native plants and low-intervention habitat management created a living space for butterflies and pollinators.", "通过本地植物和低干预管理，开放式蝴蝶农场逐渐成为传粉昆虫的生境。", "butterfly-farm"],
  ["2021.07", "Stingless bees arrive", "无刺蜂入住蝴蝶农场", "Native stingless bees expanded the farm into a richer pollinator network.", "本地无刺蜂的加入，让蝴蝶农场逐渐形成更加完整的传粉者生态网络。", "stingless-bees"],
  ["2024.05", "Natural Echo is founded", "Natural Echo 自然教育社团成立", "A youth-led initiative began carrying OneK's conservation values into schools and communities.", "由青少年发起的自然教育项目，把 OneK 的保护理念带到更多学校和社区。", "natural-echo-founded"],
] as const;

const observations = [
  ["2019.09", "Bioluminescent mushrooms", "记录到生物发光蘑菇", "A night encounter revealed a quiet blue-green light emerging from the forest floor.", "夜间调查中，森林地表出现幽微的蓝绿色光芒。", "bioluminescent-mushrooms", "/species-archive/InsectsImage/31-1.jpg"],
  ["2019.11.26", "The first puma camera-trap record", "红外相机首次记录到美洲狮", "A camera trap confirmed the presence of one of the rainforest's most important predators.", "红外相机第一次确认了雨林顶级捕食者美洲狮的活动。", "first-puma", "/onek/camera.jpg"],
  ["2020.01", "A mass gathering of Urania fulgens", "数百只 Urania fulgens 聚集", "Hundreds of day-flying moths gathered to obtain minerals, creating an exceptional natural-history record.", "数百只日行蛾为获取矿物质而聚集，形成罕见的自然历史记录。", "urania-gathering", "/species-archive/InsectsImage/50-3.jpg"],
  ["2020.04", "Seven puma records in fifteen days", "15 天内 7 次记录美洲狮", "Repeated detections offered an early glimpse of predator activity across the reserve.", "短时间内的连续记录，为理解保护区内捕食者活动提供了重要线索。", "puma-activity", "/onek/camera.jpg"],
  ["2021.10", "A trogon nests in a termite nest", "灰尾美洲咬鹃利用白蚁巢繁殖", "A breeding record documented an intricate connection between birds, insects, and old forest structures.", "这次繁殖记录呈现了鸟类、昆虫与森林结构之间精妙的生态联系。", "trogon-nest", "/species-archive/BirdsImage/16-1.jpg"],
  ["2022.03", "A rare albino hummingbird", "记录到罕见白化蜂鸟", "An unusual hummingbird record became one of OneK's most memorable wildlife encounters.", "一只罕见白化蜂鸟成为 OneK 最令人难忘的野生动物记录之一。", "albino-hummingbird", "/species-archive/BirdsImage/20-200.jpg"],
  ["2023.05", "The sunbittern returns", "首次记录日鳽", "The return of a stream-dependent bird reflected the growing ecological value of recovering waterways.", "溪流依赖型鸟类的出现，体现了水域生态恢复带来的变化。", "sunbittern", "/species-archive/BirdsImage/7-1.jpg"],
  ["2023.05", "The wasp-mimicking katydid", "拟蜂螽：不只是长得像蜂", "A small insect opened a window into mimicry, defense, and rainforest evolution.", "一只小型昆虫，让我们看到拟态、防御与雨林演化的复杂关系。", "wasp-mimic-katydid", "/species-archive/InsectsImage/12-1.jpg"],
  ["2024.02", "Longhorn beetles on decaying wood", "朽木上的长臂天牛繁殖聚集", "A breeding aggregation showed why fallen and decaying wood is essential habitat, not waste.", "繁殖聚集说明朽木并非废弃物，而是雨林中不可替代的微生境。", "longhorn-beetles", "/species-archive/InsectsImage/34-1.jpg"],
  ["2025.07", "The Black-cheeked Ant-Tanager", "记录到黑颊蚁唐纳雀", "A Costa Rican endemic appeared in the understory, adding a new coordinate to OneK's long-term record.", "哥斯达黎加特有鸟出现在林下，为 OneK 的长期记录增添了新的坐标。", "black-cheeked-ant-tanager", "/onek/fieldnote.jpg"],
  ["2025.08", "An orchid bee aggregation", "记录到兰花蜂聚集行为", "A concentrated gathering offered a rare opportunity to observe pollinator behavior and chemical ecology.", "兰花蜂聚集为观察传粉行为与化学生态提供了难得机会。", "orchid-bees", "/species-archive/InsectsImage/70-1.jpg"],
  ["DRY SEASON", "Mass activity of bioluminescent click beetles", "发光叩甲大规模活动记录", "Seasonal activity transformed the night forest into a field of moving lights.", "旱季的集中活动让夜间森林变成一片流动的微光。", "click-beetles", "/species-archive/InsectsImage/40-1.jpg"],
] as const;

const researchProjects = [
  ["Camera Trap Program", "红外相机长期监测", "Monitoring elusive mammals, activity patterns, habitat use, and ecological recovery across the reserve.", "持续记录隐蔽性哺乳动物、活动节律、栖息地利用及生态恢复变化。", "camera-traps", "/onek/camera.jpg"],
  ["Artificial Tree Cavity Restoration", "雨林人工树洞生态恢复", "Restoring scarce nesting resources while documenting how wildlife uses artificial cavities.", "补充稀缺的繁殖资源，并长期记录野生动物对人工树洞的利用。", "artificial-cavities", "/species-archive/BirdsImage/20-230.jpg"],
  ["Nest Ecology Program", "鸟巢生态长期监测", "ONEP documents nest architecture, habitat selection, breeding status, and reproductive strategies.", "ONEP 系统记录巢型结构、巢位选择、繁殖状态与热带鸟类繁殖策略。", "nest-ecology", "/species-archive/BirdsImage/20-240.jpg"],
  ["Manakin Monitoring Program", "娇鹟长期生态监测", "Long-term observation of lek behavior, habitat use, and the conservation of display sites.", "长期观察娇鹟求偶场行为、栖息地利用及展示地保护。", "manakins", "/species-archive/BirdsImage/20-300.jpg"],
  ["Tyrannidae Breeding Ecology", "霸鹟科繁殖生态监测", "Comparing the extraordinary diversity of flycatcher nests and breeding strategies.", "比较霸鹟科丰富多样的巢型结构、繁殖行为与生态适应。", "flycatchers", "/species-archive/BirdsImage/20-201.jpg"],
  ["Butterfly Chemical Ecology", "绡蝶药物摄食与化学生态", "Studying plant compounds, butterfly behavior, predators, mimicry, and evolutionary relationships.", "研究植物化合物、蝴蝶行为、捕食者、拟态系统与演化关系。", "butterfly-ecology", "/species-archive/InsectsImage/50-11.jpg"],
  ["Insect Biodiversity Survey", "昆虫生物多样性长期调查", "Building a long-term photographic and field record of one of the rainforest's richest groups.", "持续建立雨林中最丰富类群之一的影像档案与长期调查记录。", "insect-diversity", "/species-archive/InsectsImage/2-1.jpg"],
  ["Forest Restoration", "森林生态恢复", "Tracking regeneration, canopy continuity, understory recovery, and biodiversity response.", "监测森林更新、林冠连续性、林下恢复及生物多样性响应。", "forest-restoration", "/onek/research.jpg"],
  ["Stream Restoration", "河流与溪流生态恢复", "Recovering riparian habitat, freshwater biodiversity, and the ecological corridor formed by water.", "恢复河岸生境、淡水生物多样性及由水系连接的生态廊道。", "stream-restoration", "/onek/explore.jpg"],
] as const;

const collaborations = [
  ["Research Internship", "科研实习项目", "Scientific methods, biodiversity monitoring, field data, and tropical ecology for students and early-career researchers.", "面向大学生、研究生和青年研究者的科研方法、生物多样性监测与野外数据实践。", "research-internship", "/onek/research.jpg"],
  ["Conservation Internship", "保护实习项目", "Longer-form practical experience in protected-area management, wildlife monitoring, and restoration.", "深入参与保护区管理、野生动物监测和生态恢复的长期实践。", "conservation-internship", "/onek/volunteer.jpg"],
  ["Independent Research", "独立研究项目", "Design and carry out an original field study using OneK's research setting and long-term records.", "依托 OneK 的研究场地与长期数据，设计并完成独立野外研究。", "independent-research", "/onek/camera.jpg"],
  ["University Field Courses", "大学野外课程", "Custom field courses for universities, professors, and study-abroad programs.", "面向高校、课程负责人和海外学习项目定制的热带生态野外课程。", "university-field-course", "/onek/education.jpg"],
] as const;

const projectCards = researchProjects.map(([en, zh, enSummary, zhSummary, slug, image]) => card(`/research/projects/${slug}`, image, "ONGOING PROJECT", "持续开展", en, zh, enSummary, zhSummary));
const collaborationCards = collaborations.map(([en, zh, enSummary, zhSummary, slug, image]) => card(`/research/collaboration/${slug}`, image, "INTERNATIONAL COLLABORATION", "国际合作", en, zh, enSummary, zhSummary));
const historyCards = history.map(([date, en, zh, enSummary, zhSummary, slug], index) => card(`/archive/${slug}`, index % 3 === 0 ? "/onek/hero.jpg" : index % 3 === 1 ? "/onek/about.jpg" : "/onek/explore.jpg", date, date, en, zh, enSummary, zhSummary));
const observationCards = observations.map(([date, en, zh, enSummary, zhSummary, slug, image]) => card(`/discover-observe/${slug}`, image, date, date, en, zh, enSummary, zhSummary));

const pages: Record<string, SitePage> = {};
const add = (page: SitePage) => { pages[page.path] = page; };

add({
  path: "about", eyebrow: L("ABOUT ONEK", "关于 OneK"), title: L("Growing together with the rainforest", "与雨林共同成长"), subtitle: L("From loving nature to protecting it", "从热爱自然，到守护自然"),
  intro: L("OneK's story has unfolded through observation, documentation, restoration, and the daily work of caring for a living rainforest.", "OneK 的故事并非来自预先规划好的蓝图，而是在一次次观察、记录、修复与守护中慢慢展开。"), image: "/onek/about.jpg",
  cards: [
    card("/about/story", "/onek/about.jpg", "THE ONEK STORY", "OneK 的故事", "A family and a rainforest", "一家人与一片雨林的共同成长", "How a love of nature became a long-term conservation commitment.", "从热爱自然，到理解自然，再到守护自然。", false),
    card("/support", "/onek/conservation-logo.jpg", "PROTECT LIFE", "守护雨林，保护生命", "OneK Conservation", "OneK Conservation", "The nonprofit platform behind restoration, protection, research, and community action.", "连接生态恢复、野生动物保护、科研与社区参与的非营利行动平台。", false),
    card("/natural-echo", "/onek/natural-echo-logo.png", "LET NATURE BE HEARD", "让自然的声音被听见", "Natural Echo", "Natural Echo 自然回声", "Youth-led nature education from the rainforest to communities around the world.", "由青少年发起，从雨林走向世界各地社区的自然教育行动。", false),
    card("/research/station", "/onek/station-logo.jpg", "EXPLORE LIFE · RECORD NATURE", "探索生命 · 记录自然", "OneK Biological Station", "OneK 生物站", "The field platform for biodiversity research and long-term monitoring.", "开展生物多样性研究与长期生态监测的野外平台。", false),
  ],
  sections: [
    section("Why this place matters", "为什么这里重要", ["OneK lies in Costa Rica's southern Pacific lowland rainforest, where North and South American lineages meet in one of the world's great biodiversity crossroads."], ["OneK 位于哥斯达黎加南太平洋低地雨林，这里是南北美洲生物相交汇的重要生物多样性热点。"]),
    section("Conservation in practice", "持续发生的保护行动", ["Since 2018, the reserve has combined habitat protection, forest and stream restoration, wildlife monitoring, nature education, and collaboration."], ["自 2018 年以来，保护区持续推进栖息地保护、森林与河流恢复、野生动物监测、自然教育及合作项目。"]),
  ], quote: L("We came here not to possess this forest, but to ensure that it will always belong to itself.", "我们来到这里，不是为了占有森林，而是希望森林永远属于它自己。"),
});

add({ path: "about/story", eyebrow: L("THE ONEK STORY", "OneK 的故事"), title: L("A family and a rainforest growing together", "一家人与一片雨林的共同成长"), subtitle: L("Finding answers in the rainforest", "在雨林中寻找答案"), intro: L("OneK began with a simple wish: to protect a place where wildlife could continue to thrive. The direction emerged slowly through years of living with and learning from the forest.", "OneK 始于一个简单而坚定的愿望：拥有一片属于自然的土地，并尽自己所能保护它。真正的方向，是在多年与森林相处和学习的过程中逐渐形成的。"), image: "/onek/hero.jpg", sections: [
  section("It started with recording species", "从记录物种开始", ["Countless walks, photographs, bird records, butterfly searches, and nights beside rainforest streams gradually became a shared journey for the whole family."], ["一次次走进森林、拍摄昆虫、记录鸟类、寻找蝴蝶和观察树蛙，逐渐成为整个家庭共同参与的旅程。"]),
  section("What the rainforest taught us", "雨林教会我们的事情", ["The most important discoveries were not isolated species, but the relationships among streams, old trees, insects, birds, predators, and the changing forest."], ["真正重要的不只是某一个物种，而是溪流、老树、昆虫、鸟类、捕食者与森林变化之间的联系。"]),
  section("From observers to guardians", "从观察者到守护者", ["Observation led to stream restoration, forest protection, wildlife monitoring, ecological databases, breeding records, and nature education."], ["观察逐渐引导我们开始河流恢复、森林保护、野生动物监测、生态数据库、繁殖记录与自然教育。"]),
  section("A biological station still growing", "一个持续成长的生物站", ["Today OneK is developing into a long-term ecological monitoring and natural-history research station that connects conservation, science, education, and international participation."], ["今天，OneK 正在发展成为连接保护、科研、教育与国际参与的长期生态监测和自然历史研究基地。"]),
], quote: L("Every species recorded is a key to understanding nature. Every stream restored creates new opportunities for life.", "每一个被记录的物种，都是理解自然的一把钥匙；每一条恢复的溪流，都会重新孕育生命。") });

add({ path: "field-notes", eyebrow: L("FROM THE RAINFOREST", "来自雨林的信息"), title: L("Field notes from a living forest", "一片持续变化的雨林记录"), subtitle: L("Observation becomes knowledge when it is recorded over time", "当观察被长期记录，它便成为知识"), intro: L("Short field records connect daily encounters to OneK's longer ecological story.", "这里汇集野外相遇、季节变化和自然历史记录，并将每一次观察连接到 OneK 更长期的生态故事。"), image: "/onek/fieldnote.jpg", cards: [observationCards[9], observationCards[10], observationCards[6], observationCards[1]], sections: [section("A growing field journal", "持续更新的野外日志", ["Each note records a place, a season, a behavior, or an ecological relationship worth following."], ["每一条信息都记录一个地点、季节、行为或值得继续追踪的生态关系。"])] });

add({ path: "research", eyebrow: L("LONG-TERM · CONSISTENCY · CHANGE", "长期 · 持续 · 理解变化"), title: L("Research & long-term monitoring", "科研与长期监测"), subtitle: L("Returning to the same places, year after year", "年复一年，回到同一个地方"), intro: L("By returning to the same places year after year, we document ecological processes that unfold beyond a single season, generating knowledge that supports science and conservation.", "通过持续回到相同地点开展观察与记录，我们追踪跨越单个季节的生态过程，为科学研究和保护决策积累长期知识。"), image: "/onek/research.jpg", cards: [
  card("/research/station", "/onek/station-logo.jpg", "ONEK BIOLOGICAL STATION", "OneK 生物站", "Explore life. Document nature. Support conservation.", "探索生命、记录自然、服务保护", "A field base for research, long-term monitoring, and nature education.", "面向科研、长期监测与自然教育的野外基地。", false),
  card("/research/collaboration", "/onek/volunteer.jpg", "SCIENCE ACROSS BORDERS", "科研与国际合作", "International collaboration", "国际合作", "Research internships, conservation internships, independent studies, and university field courses.", "科研实习、保护实习、独立研究与大学野外课程。"),
  card("/research/projects", "/onek/camera.jpg", "ONGOING", "持续开展", "Long-term monitoring projects", "科研与长期监测项目", "Wildlife, biodiversity, breeding ecology, and restoration programs.", "覆盖野生动物、生物多样性、繁殖生态与生态恢复的长期项目。"),
  card("/research/annual-reports", "/onek/about.jpg", "DISCOVERY · GROWTH · PROTECTION", "发现 · 成长 · 守护", "Annual reports", "年度报告", "Tracking each year of research, conservation, and education.", "记录 OneK 在科研、保护与自然教育中的每一步成长。"),
] });

add({ path: "research/station", eyebrow: L("ONEK BIOLOGICAL STATION", "OneK 生物站"), title: L("Exploring life. Documenting nature.", "探索生命 · 记录自然"), subtitle: L("A field-based platform for biodiversity research and ecological monitoring", "面向生物多样性研究与生态监测的野外平台"), intro: L("Established within OneK Nature Reserve, the station brings scientific inquiry, conservation practice, field learning, and long-term ecological records together.", "OneK 生物站依托自然保护区建立，将科学研究、保护实践、野外学习与长期生态记录连接在一起。"), image: "/onek/research.jpg", sections: [
  section("Our mission", "我们的使命", ["Build a long-term ecological knowledge base for Costa Rica's Pacific lowland rainforest and generate reliable data for science, management, and education."], ["建立哥斯达黎加太平洋低地雨林的长期生态知识基础，为科研、保护管理与自然教育提供可靠数据。"]),
  section("Research and monitoring", "研究与监测方向", ["Biodiversity surveys, long-term ecological monitoring, natural-history research, and ecological restoration assessment form the station's core work."], ["生物多样性调查、长期生态监测、自然历史研究和生态恢复评估构成生物站的核心工作。"], [L("Species and long-term monitoring databases", "区域物种数据库与长期监测数据库"), L("Camera-trap and bird monitoring networks", "红外相机与鸟类监测体系"), L("Insect and herpetofauna programs", "昆虫及两栖爬行动物监测项目"), L("Forest and stream restoration assessment", "森林与溪流生态恢复评估")]),
  section("Collaboration", "合作与研究机会", ["The station welcomes universities, research institutions, conservation organizations, naturalists, citizen scientists, and independent researchers."], ["生物站欢迎大学、研究机构、保护组织、自然历史学者、公民科学项目与独立研究人员开展合作。"]),
] });

add({ path: "research/collaboration", eyebrow: L("INTERNATIONAL COLLABORATION", "科研与国际合作"), title: L("Building bridges across borders", "连接科学、保护与教育"), subtitle: L("Research · conservation · education", "科研 · 保护 · 教育"), intro: L("OneK welcomes universities, institutions, students, and nature enthusiasts to take part in long-term monitoring and hands-on conservation in Costa Rica.", "OneK 欢迎世界各地的高校、研究机构、学生及自然爱好者共同参与热带雨林长期监测、生态研究与保护实践。"), image: "/onek/volunteer.jpg", cards: collaborationCards });

add({ path: "research/projects", eyebrow: L("ONEK LONG-TERM MONITORING NETWORK", "OneK 长期生态监测网络"), title: L("Follow ecological change over time", "持续观察雨林中的变化与联系"), subtitle: L("Every record adds depth to the next", "每一份记录，都让下一次观察更有意义"), intro: L("These projects began with field observations and continue to grow into connected long-term datasets.", "这些项目大多始于一次野外发现，并逐渐发展为彼此关联、持续积累的长期生态数据。"), image: "/onek/camera.jpg", cards: projectCards });

add({ path: "research/annual-reports", eyebrow: L("ANNUAL REPORTS", "年度报告"), title: L("Discovery, growth & protection", "发现、成长与守护"), subtitle: L("Tracking each step in research, conservation, and education", "记录科研、保护与自然教育中的每一步成长"), intro: L("Annual reports bring together monitoring results, restoration progress, challenges, and priorities for the years ahead.", "年度报告汇集监测成果、生态恢复进展、面临的挑战与未来重点。"), image: "/onek/about.jpg", cards: [card("/research/annual-reports/2025", "/onek/research.jpg", "REPORTING PERIOD · 2025", "报告周期 · 2025", "Annual Ecological Monitoring Report", "年度生态监测报告", "Seven years of field conservation and the foundation for a more standardized monitoring system.", "基于过去七年持续保护与现场监测整理，并作为未来标准化监测体系的基础。")], imagePlaceholder: true });

add({ path: "research/annual-reports/2025", eyebrow: L("2025 ANNUAL REPORT", "2025 年度报告"), title: L("A rainforest ecosystem in recovery", "持续恢复中的雨林生态系统"), subtitle: L("Ecological restoration · long-term monitoring · biodiversity", "生态恢复 · 长期监测 · 生物多样性研究"), intro: L("Seven years of continuous field observation show recovering streams, regenerating forest, expanding biodiversity records, and a stronger foundation for future science.", "过去七年的持续观察表明，溪流、森林与生物多样性正在逐步恢复，也为未来科研建立了更加可靠的基础。"), image: "/onek/research.jpg", sections: [
  section("Long-term conservation actions", "长期保护工作", ["Stream protection, forest regeneration, reduced disturbance, native vegetation recovery, and the preservation of deadwood and microhabitats have guided restoration."], ["溪流保护、森林自然更新、减少干扰、本地植被恢复以及枯立木和微生境保护，共同构成长期恢复工作。"]),
  section("Biodiversity monitoring", "生物多样性监测", ["Current records include more than 300 bird species, 1,000 insect species, 60 amphibian and reptile species, and 40 mammal species."], ["目前已记录鸟类 300 余种、昆虫 1000 余种、两栖爬行动物 60 余种、哺乳动物 40 余种。"]),
  section("Next priorities", "未来重点", ["Standardized protocols, GIS, permanent transects and plots, climate records, acoustic monitoring, and AI-assisted sound identification are next priorities."], ["下一阶段将重点推进标准化监测、GIS、固定样线与样方、气候记录、自动声学监测及 AI 声音识别。"]),
] });

collaborations.forEach(([en, zh, enSummary, zhSummary, slug, image]) => add({ path: `research/collaboration/${slug}`, eyebrow: L("INTERNATIONAL COLLABORATION", "国际合作项目"), title: L(en, zh), subtitle: L("Learn in the rainforest. Contribute through the field.", "在雨林中学习，在实践中参与"), intro: L(enSummary, zhSummary), image, imagePlaceholder: true, sections: [
  section("Program focus", "项目重点", ["Participants combine guided field training with meaningful work in biodiversity monitoring, restoration, conservation practice, and ecological documentation."], ["参与者将在指导下学习野外方法，并实际参与生物多样性监测、生态恢复、保护实践与生态记录。"], [L("Field methods and ethical observation", "野外方法与低干扰观察"), L("Data collection and ecological records", "数据采集与生态记录"), L("Tropical ecology and conservation", "热带生态与自然保护")]),
  section("Who it is for", "适合人群", [slug === "university-field-course" ? "Universities, professors, academic departments, and study-abroad programs." : "Students, early-career researchers, gap-year participants, naturalists, and emerging conservationists."], [slug === "university-field-course" ? "适合大学、教授、院系课程及海外学习项目。" : "适合大学生、研究生、间隔年参与者、自然爱好者与青年保护工作者。"]),
  section("How to apply", "如何申请", ["Contact OneK with your background, interests, proposed dates, and any academic or accessibility requirements. Program details will be confirmed individually."], ["请通过申请表、电子邮件或 WhatsApp 提供个人背景、兴趣方向、计划日期以及学习或无障碍需求，项目细节将逐一确认。"]),
] }));

researchProjects.forEach(([en, zh, enSummary, zhSummary, slug, image]) => add({ path: `research/projects/${slug}`, eyebrow: L("ONGOING RESEARCH", "持续开展的科研项目"), title: L(en, zh), subtitle: L("Long-term field observation for science and conservation", "以长期野外观察服务科研与保护"), intro: L(enSummary, zhSummary), image, imagePlaceholder: true, sections: [
  section("Why this project matters", "为什么开展这一项目", ["Long-term records reveal ecological patterns that cannot be understood from a single visit or season. This project connects natural-history observation to conservation decisions."], ["长期记录能够揭示单次调查或单个季节无法看见的生态规律，并把自然历史观察连接到保护决策。"]),
  section("What we record", "我们记录什么", ["Standardized observations combine species identity, location, habitat, behavior, seasonal timing, photographic evidence, and relevant environmental conditions."], ["标准化记录涵盖物种、地点、生境、行为、季节时间、影像证据及相关环境条件。"], [L("Field observations and GPS records", "野外观察与 GPS 坐标"), L("Photographic and video archives", "照片与影像档案"), L("Habitat and microclimate information", "生境与微气候信息"), L("Repeated monitoring across years", "跨年度重复监测")]),
  section("Long-term vision", "长期愿景", ["As records accumulate, the project can support student training, independent research, institutional collaboration, and evidence-based conservation management."], ["随着资料积累，项目将支持学生培训、独立研究、机构合作以及基于证据的保护管理。"]),
] }));

add({ path: "programs", eyebrow: L("EXPLORE · LEARN · PROTECT", "探索自然 · 学习科学 · 守护雨林"), title: L("Take part in OneK", "参与 OneK"), subtitle: L("Experiences with purpose", "有目标的真实雨林体验"), intro: L("OneK connects visitors, students, researchers, and young naturalists with meaningful exploration, science, education, and conservation.", "OneK 让访客、学生、研究者和青年自然观察者通过探索、科研、教育与保护行动与雨林建立真实联系。"), image: "/onek/explore.jpg", cards: [
  card("/exploration", "/onek/explore.jpg", "ADVENTURE", "探索", "Exploration Journey", "探索之旅", "Guided rainforest walks, birdwatching, nights in the forest, and close attention to a living ecosystem.", "雨林徒步、观鸟、夜间探索与对真实生态系统的细致观察。", false),
  card("/volunteer", "/onek/volunteer.jpg", "INTERNATIONAL PROGRAMS", "国际项目", "International Volunteer Program", "国际志愿者项目", "Research, conservation, and youth pathways for meaningful participation.", "通过科研、保护与青少年项目参与真实的雨林工作。", false),
  card("/education", "/onek/education.jpg", "RAINFOREST CLASSROOM", "雨林课堂", "Nature Education", "自然教育", "Observation, exploration, and hands-on learning in a living classroom.", "在真实雨林课堂中观察、探索并动手实践。", false),
] });

add({ path: "exploration", eyebrow: L("EXPLORE ONEK", "探索 OneK"), title: L("Enter the living forest", "走进一片会呼吸的森林"), subtitle: L("Discovery, not just sightseeing", "不只是观光，而是发现"), intro: L("At OneK, exploration unfolds through sound, movement, texture, rivers, wildlife signs, and patient attention.", "在 OneK，探索发生在声音、移动、触感、溪流、野生动物痕迹以及耐心观察之中。"), image: "/onek/explore.jpg", sections: [
  section("Rainforest hiking", "雨林徒步", ["Walk beneath a layered canopy where streams, tracks, light, and forest sound turn each route into a field experience."], ["在多层林冠下行走，让溪流、动物足迹、光线和森林声音把每一段路线变成野外体验。"]),
  section("Birdwatching", "观鸟", ["Quiet observation reveals the exceptional bird diversity of southern Costa Rica across forest, stream, and edge habitats."], ["安静观察保护区森林、溪流与林缘生境中丰富的哥斯达黎加南部鸟类。"]),
  section("Live in nature", "住进自然", ["Wake to bird choruses and end the day beneath stars and insect song in the heart of the reserve."], ["在鸟鸣中醒来，在保护区深处的星空与虫鸣中结束一天。"]),
  section("Night exploration", "夜间探索", ["After dark, frogs, insects, reptiles, and other nocturnal species reveal an entirely different rainforest."], ["入夜后，蛙类、昆虫、爬行动物和其他夜行物种呈现出完全不同的雨林。"]),
] });

add({ path: "volunteer", eyebrow: L("EXPLORE · LEARN · PROTECT", "探索自然 · 学习科学 · 守护雨林"), title: L("International Volunteer Program", "国际志愿者项目"), subtitle: L("Become part of real rainforest conservation", "成为真实保护行动的参与者"), intro: L("OneK connects people from around the world with biodiversity monitoring, habitat restoration, wildlife protection, and environmental education in Costa Rica.", "OneK 连接世界各地的自然爱好者、学生和青年研究者，共同参与哥斯达黎加的生物多样性监测、栖息地恢复、野生动物保护与环境教育。"), image: "/onek/volunteer.jpg", cards: [
  card("/volunteer/research", "/onek/research.jpg", "SCIENCE", "科研", "Research Internship", "科研实习项目", "Field methods, ecological monitoring, and long-term scientific data.", "学习野外方法，参与生态监测与长期科学数据积累。"),
  card("/volunteer/conservation", "/onek/volunteer.jpg", "ACTION", "行动", "Conservation Volunteer Program", "自然保护志愿者项目", "Hands-on rainforest protection, patrols, restoration, and biodiversity documentation.", "亲身参与雨林保护、巡护、生态恢复与生物多样性记录。"),
  card("/volunteer/youth", "/onek/education.jpg", "NEXT GENERATION", "下一代", "Future Conservationists", "未来自然保护者培养计划", "A youth rainforest camp combining science, exploration, and stewardship.", "融合科学、探索与守护意识的青少年雨林项目。"),
  card("/apply", "/onek/about.jpg", "APPLICATION", "项目申请", "Apply to OneK", "申请参与 OneK", "Submit an application online, or contact OneK through email and WhatsApp.", "可填写在线申请，也可以通过电子邮件或 WhatsApp 联系 OneK。"),
] });

[
  ["research", "Research Internship", "科研实习项目", "Scientific observation, data collection, field methodology, and ecological analysis.", "科学观察、数据采集、野外方法与生态分析。", "/onek/research.jpg"],
  ["conservation", "Conservation Volunteer Program", "自然保护志愿者项目", "Real conservation work for participants who want to learn by doing.", "面向希望通过行动理解保护工作的参与者。", "/onek/volunteer.jpg"],
  ["youth", "Future Conservationists Program", "未来自然保护者培养计划", "Young explorers learn to observe, question, record, and care for the living world.", "帮助青少年学习观察、提问、记录并守护生命世界。", "/onek/education.jpg"],
].forEach(([slug, en, zh, enSummary, zhSummary, image]) => add({ path: `volunteer/${slug}`, eyebrow: L("ONEK INTERNATIONAL PROGRAMS", "OneK 国际项目"), title: L(en, zh), subtitle: L("Learn through participation", "在参与中学习"), intro: L(enSummary, zhSummary), image, imagePlaceholder: true, sections: [
  section("Program experience", "项目体验", ["Participants work alongside OneK's ongoing projects rather than following a fixed tourism itinerary. Daily activities respond to season, weather, monitoring needs, and conservation priorities."], ["参与者加入 OneK 正在开展的项目，而不是遵循固定旅游行程。每日活动会根据季节、天气、监测需求和保护重点调整。"]),
  section("Possible activities", "可能参与的工作", ["Activities may include camera traps, biodiversity surveys, trail patrols, stream and forest restoration, bird monitoring, night surveys, nature journaling, and citizen science."], ["活动可能包括红外相机、生物多样性调查、步道巡护、河流与森林恢复、鸟类监测、夜间调查、自然笔记和公民科学。"]),
  section("Application", "申请方式", ["Apply through the online form, email, or WhatsApp. Tell us your age, background, interests, dates, health considerations, and learning goals."], ["可通过在线表格、电子邮件或 WhatsApp 申请，并说明年龄、背景、兴趣、时间、健康注意事项与学习目标。"]),
] }));

add({ path: "education", eyebrow: L("NATURE EDUCATION", "自然教育"), title: L("The rainforest becomes the classroom", "让雨林成为课堂"), subtitle: L("Experience → learning → growth", "体验 → 学习 → 成长"), intro: L("Through observation, exploration, and hands-on experiences, participants understand ecological connections and build a deeper commitment to conservation.", "通过观察、探索与实践，参与者理解生命之间的联系，并在体验中建立对自然的尊重与守护意识。"), image: "/onek/education.jpg", cards: [
  card("/education/international-base", "/onek/explore.jpg", "PLATFORM", "教育平台", "International Ecological Education Base", "国际生态教育基地", "Immersive rainforest learning for schools, families, organizations, and international groups.", "面向学校、家庭、教育机构和国际团体的沉浸式雨林学习。"),
  card("/education/rainforest-school", "/onek/education.jpg", "LEARNING SYSTEM", "教育体系", "Rainforest School", "雨林学校", "Long-term field-based environmental education in forests, rivers, and living ecosystems.", "在森林、溪流与真实生态系统中长期开展的自然教育。"),
  card("/education/youth-nature", "/onek/volunteer.jpg", "PROGRAMS", "具体课程", "Youth Nature Programs", "青少年自然课程", "Birds, insects, amphibians, photography, observation, and citizen science.", "涵盖鸟类、昆虫、两栖动物、摄影、自然观察与公民科学。"),
] });

[
  ["international-base", "International Ecological Education Base", "国际生态教育基地", "Immersive rainforest learning and conservation experiences for schools, families, education organizations, and international groups.", "为学校、家庭、教育机构和国际团体提供沉浸式雨林学习与保护体验。", "/onek/explore.jpg"],
  ["rainforest-school", "Rainforest School", "雨林学校", "A long-term initiative that develops curiosity, scientific thinking, and stewardship through direct experiences in nature.", "通过真实自然体验培养好奇心、科学思维和环境责任感的长期教育项目。", "/onek/education.jpg"],
  ["youth-nature", "Youth Nature Programs", "青少年自然课程", "Hands-on learning through insects, birds, amphibians, ecology, photography, and citizen science.", "通过昆虫、鸟类、两栖动物、生态、摄影与公民科学开展实践学习。", "/onek/volunteer.jpg"],
].forEach(([slug, en, zh, enSummary, zhSummary, image]) => add({ path: `education/${slug}`, eyebrow: L("NATURE EDUCATION", "自然教育"), title: L(en, zh), subtitle: L("Learn through exploration. Grow through nature.", "在探索中学习，在自然中成长"), intro: L(enSummary, zhSummary), image, imagePlaceholder: true, sections: [
  section("Learning in place", "在真实场域中学习", ["Forests, streams, wildlife, weather, and field observations become part of the curriculum. Participants learn through attention, questions, and direct experience."], ["森林、溪流、野生动物、天气与野外观察都成为课程的一部分。参与者通过注意、提问和真实体验学习。"]),
  section("What participants develop", "参与者获得什么", ["Programs build observation skills, ecological literacy, scientific curiosity, teamwork, respect for life, and a practical understanding of conservation."], ["课程培养观察能力、生态素养、科学好奇心、团队协作、对生命的尊重以及对保护实践的理解。"]),
] }));

add({ path: "species", eyebrow: L("SPECIES ARCHIVE", "物种档案"), title: L("Wildlife in the reserve", "保护区的野生动物"), subtitle: L("Thousands of species woven into one living system", "数千种生命共同编织成一个生态系统"), intro: L("Explore the growing visual archive inherited from the original OneK website.", "探索从旧网站完整保留下来的物种影像档案。"), image: "/onek/birds.png", cards: [
  card("/species-archive/SpeciesPageMammals.html", "/onek/species-home/mammals.png", "40+ SPECIES", "40+ 种", "Mammals", "哺乳动物", "Wild cats, ungulates, primates, sloths, and other mammals recorded at OneK.", "OneK 记录到的猫科、偶蹄类、灵长类、树懒及其他哺乳动物。", false),
  card("/species-archive/SpeciesPageBirds.html", "/onek/species-home/birds.png", "300+ SPECIES", "300+ 种", "Birds", "鸟类", "A growing archive from one of Costa Rica's richest bird regions.", "来自哥斯达黎加鸟类多样性最丰富地区之一的持续档案。", false),
  card("/species-archive/SpeciesPageInsects.html", "/onek/species-home/insects.png", "1000+ SPECIES", "1000+ 种", "Insects", "昆虫", "A photographic record spanning many orders and ecological roles.", "涵盖众多目级类群与生态功能的影像记录。", false),
  card("/species-archive/SpeciesPageHerps.html", "/onek/species-home/herps.png", "60+ SPECIES", "60+ 种", "Herps", "两栖与爬行动物", "Frogs, salamanders, snakes, and lizards from rainforest and stream habitats.", "记录雨林与溪流生境中的蛙类、蝾螈、蛇类与蜥蜴。", false),
] });

add({ path: "natural-echo", eyebrow: L("NATURAL ECHO", "自然回声"), title: L("Let nature be heard", "让自然的声音被更多孩子听见"), subtitle: L("Youth-led nature education", "由青少年发起的自然教育"), intro: L("Founded by Haoming and Keying, Natural Echo helps children connect with nature through birdwatching, observation, outdoor learning, and community exchange. Activities are volunteer-driven and free of charge.", "Natural Echo 由 Haoming 和 Keying 发起，通过观鸟、自然观察、户外学习与社区交流帮助更多孩子连接自然。所有活动均由志愿者推动并免费开展。"), image: "/onek/education.jpg", cards: [
  card("/natural-echo/bay-area-birding", "/onek/birds.png", "CLUB ACTIVITY", "社团活动", "Bay Area Birdwatching", "湾区观鸟", "Weekend birdwatching and nature exploration for children in the San Francisco Bay Area.", "面向旧金山湾区儿童开展的周末观鸟与自然探索活动。"),
  card("/natural-echo/book-donation", "/onek/education.jpg", "COMMUNITY ENGAGEMENT · 2023", "社区参与 · 2023", "Books across borders", "图书捐赠与文化交流", "Students from the United States and Costa Rica met through books, reading, and shared stories.", "美国与哥斯达黎加学生因书籍、阅读和故事分享而相遇。"),
  card("/natural-echo/amazon-exchange", "/onek/explore.jpg", "COMMUNITY ENGAGEMENT · 2018", "社区参与 · 2018", "Friendship in the Amazon", "亚马逊社区交流", "A visit, school supplies, and a football match became a lesson in culture, nature, and friendship.", "一次探访、学习用品与一场足球赛，成为关于文化、自然和友谊的课程。"),
  card("/natural-echo/story", "/onek/natural-echo-logo.png", "FROM BEIJING TO THE WORLD", "从北京到世界", "The Natural Echo story", "Natural Echo 的故事", "How growing up through global nature journeys and the OneK rainforest inspired a youth-led initiative.", "在全球自然旅行和 OneK 雨林中成长的经历，如何催生一个青少年自然教育项目。", false),
] });

[
  ["bay-area-birding", "Bay Area Birdwatching", "湾区观鸟", "Natural Echo continues beyond Costa Rica through free weekend birdwatching and local nature exploration for children in the San Francisco Bay Area.", "Natural Echo 从哥斯达黎加延伸至旧金山湾区，通过免费周末观鸟与本地自然探索连接更多孩子。", "/onek/birds.png"],
  ["book-donation", "Books across borders", "图书捐赠与文化交流", "In 2023, OneK connected visiting American students with a local Costa Rican primary school for book donation, reading, and cultural exchange.", "2023 年，OneK 协助美国学生与哥斯达黎加当地小学开展图书捐赠、共同阅读与文化交流。", "/onek/education.jpg"],
  ["amazon-exchange", "Friendship in the Amazon", "亚马逊社区交流", "During a 2018 nature education journey, children visited an Indigenous community in Ecuador's Amazon and connected through conversation, school supplies, and football.", "2018 年自然教育旅程中，孩子们走进厄瓜多尔亚马逊原住民社区，通过交流、学习用品和足球建立连接。", "/onek/explore.jpg"],
  ["story", "The Natural Echo story", "Natural Echo 的故事", "Born from journeys across more than thirty biodiverse regions and years of growing up in the OneK rainforest, Natural Echo is young people inspiring other young people.", "从三十多个生物多样性地区的旅程，到在 OneK 雨林中成长，Natural Echo 是年轻人启发年轻人的故事。", "/onek/education.jpg"],
].forEach(([slug, en, zh, enSummary, zhSummary, image]) => add({ path: `natural-echo/${slug}`, eyebrow: L(slug === "book-donation" || slug === "amazon-exchange" ? "COMMUNITY ENGAGEMENT" : "NATURAL ECHO ACTIVITY", slug === "book-donation" || slug === "amazon-exchange" ? "社区参与" : "自然回声活动"), title: L(en, zh), subtitle: L("Young people connecting through nature", "让年轻人通过自然建立连接"), intro: L(enSummary, zhSummary), image, imagePlaceholder: true, sections: [
  section("Why it matters", "为什么重要", ["Nature education is not only about learning facts. It develops attention, curiosity, empathy, cultural understanding, and the confidence to care for the living world."], ["自然教育不只是学习知识，也在培养注意力、好奇心、同理心、文化理解以及守护生命世界的信心。"]),
  section("A continuing echo", "持续回响", ["Each activity is a small point of connection that can inspire future naturalists, scientists, educators, and conservationists."], ["每一次活动都是一个连接点，可能启发未来的自然观察者、科学家、教育者与保护工作者。"]),
] }));

add({ path: "archive", eyebrow: L("ONEK HISTORICAL ARCHIVE", "OneK 历史档案"), title: L("One forest. One family. One continuing story.", "一片森林，一个家庭，一段持续书写的故事"), subtitle: L("Milestones along our journey with the rainforest", "每一个里程碑，都是与雨林共同成长的见证"), intro: L("The archive follows how a piece of rainforest became a reserve, a field base, a biological station, and a growing conservation community.", "历史档案记录一片雨林如何逐渐成为保护区、野外基地、生物站和持续成长的保护共同体。"), image: "/onek/hero.jpg", cards: historyCards });

history.forEach(([date, en, zh, enSummary, zhSummary, slug], index) => add({ path: `archive/${slug}`, eyebrow: L("ONEK HISTORICAL ARCHIVE", "OneK 历史档案"), title: L(en, zh), subtitle: L(date, date), intro: L(enSummary, zhSummary), image: index % 3 === 0 ? "/onek/hero.jpg" : index % 3 === 1 ? "/onek/about.jpg" : "/onek/explore.jpg", imagePlaceholder: true, sections: [
  section("The moment", "这一时刻", ["This milestone records a practical step in OneK's gradual development from a family conservation dream into a long-term rainforest reserve and biological station."], ["这一里程碑记录了 OneK 从家庭保护梦想逐渐发展为长期雨林保护区与生物站过程中的一个真实步骤。"]),
  section("What it changed", "它带来的改变", ["Each action created the conditions for later monitoring, restoration, education, or community work. The meaning of the event became clearer as the years accumulated."], ["每一次行动都为之后的监测、恢复、教育或社区工作创造了条件，而它的意义也在多年积累中逐渐显现。"]),
] }));

add({ path: "discover-observe", eyebrow: L("DISCOVER & OBSERVE", "发现与观察"), title: L("Look closer. Discover more.", "靠近观察，发现更多"), subtitle: L("Species events recorded through the years", "这些年发现并记录的物种事件"), intro: L("Unexpected encounters often become the starting point for longer questions, new projects, and a deeper understanding of the rainforest.", "一次偶然相遇，常常会成为更长期问题、新项目以及更深入理解雨林的起点。"), image: "/onek/fieldnote.jpg", cards: observationCards });

observations.forEach(([date, en, zh, enSummary, zhSummary, slug, image]) => add({ path: `discover-observe/${slug}`, eyebrow: L("FIELD OBSERVATION", "野外观察记录"), title: L(en, zh), subtitle: L(date, date), intro: L(enSummary, zhSummary), image, imagePlaceholder: true, sections: [
  section("Observation", "观察记录", ["The record captures a specific encounter in time and place, preserving behavior, habitat, and environmental context for future comparison."], ["这条记录保存了特定时间与地点的相遇，也保留行为、生境和环境背景，便于未来比较。"]),
  section("Why we keep watching", "为什么持续观察", ["Natural-history observations can reveal breeding strategies, seasonal activity, food webs, habitat quality, and ecological relationships that formal surveys may miss."], ["自然历史观察能够揭示繁殖策略、季节活动、食物网、生境质量，以及标准调查可能错过的生态联系。"]),
] }));

add({ path: "support", eyebrow: L("NONPROFIT ORGANIZATION", "非营利组织"), title: L("Protect the rainforest. Protect life.", "守护雨林，保护生命"), subtitle: L("Asociación ONEK de Conservación de Biodiversidad Costa Rica", "Asociación ONEK de Conservación de Biodiversidad Costa Rica"), intro: L("Registration No. 3-002-971175. OneK's nonprofit platform advances biodiversity conservation, ecological restoration, research, environmental education, and community participation.", "注册号 3-002-971175。OneK 的非营利平台致力于生物多样性保护、生态恢复、科学研究、环境教育与社区参与。"), image: "/onek/conservation-logo.jpg", sections: [
  section("Purpose", "组织宗旨", ["The association protects and restores Costa Rica's biodiversity and natural ecosystems while promoting environmental education, scientific research, sustainability, and community participation."], ["协会旨在保护、维护与恢复哥斯达黎加的生物多样性及自然生态系统，并推动环境教育、科学研究、可持续发展与社区参与。"]),
  section("Areas of action", "行动方向", ["Work includes rainforest and watershed protection, restoration, biological monitoring, education, citizen science, volunteering, responsible ecotourism, and institutional collaboration."], ["工作包括雨林与流域保护、生态恢复、生物监测、环境教育、公民科学、志愿服务、负责任生态旅游与机构合作。"], [L("Biodiversity conservation", "生物多样性保护"), L("Ecological restoration", "生态恢复"), L("Scientific research", "科学研究"), L("Environmental education", "环境教育"), L("Community engagement", "社区参与")]),
  section("Donations", "捐赠方式", ["Verified donation channels for the Americas and China will be connected here. Until then, contact OneK directly before making any contribution."], ["面向美洲与中国的正式收款方式将在核验后接入。在此之前，请先联系 OneK 确认，再进行任何捐赠。"]),
] });

export function getSitePage(slug: string[]): SitePage | undefined {
  return pages[slug.join("/")];
}
