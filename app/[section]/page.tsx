import Link from "next/link";

const sections: Record<string, { eyebrow: string; title: string; zh: string; description: string; image: string }> = {
  about: { eyebrow: "ABOUT ONEK", title: "Growing with the rainforest", zh: "与雨林共同成长", description: "Our story, the reserve, OneK Conservation, Natural Echo, and the people behind a long-term commitment to this forest.", image: "/onek/about.jpg" },
  "field-notes": { eyebrow: "FROM THE RAINFOREST", title: "Field notes & discoveries", zh: "来自雨林的信息", description: "Sightings, observations, and stories recorded as the rainforest reveals itself over time.", image: "/onek/fieldnote.jpg" },
  research: { eyebrow: "ONEK BIOLOGICAL STATION", title: "Research & long-term monitoring", zh: "科研与长期监测", description: "Active projects, long-term datasets, the biological station, and opportunities for international collaboration.", image: "/onek/research.jpg" },
  programs: { eyebrow: "EXPLORE · LEARN · PROTECT", title: "Programs at OneK", zh: "参与 OneK", description: "Rainforest exploration, international programs, research placements, field courses, and nature education.", image: "/onek/explore.jpg" },
  exploration: { eyebrow: "RAINFOREST EXPLORATION", title: "Enter the living forest", zh: "探索之旅", description: "A field-based encounter with rainforest, rivers, wildlife, and the ecological relationships that connect them.", image: "/onek/explore.jpg" },
  volunteer: { eyebrow: "INTERNATIONAL PROGRAMS", title: "Take part in real conservation", zh: "国际志愿者项目", description: "Research, conservation, and youth programs connecting people from around the world with meaningful field work.", image: "/onek/volunteer.jpg" },
  education: { eyebrow: "NATURE EDUCATION", title: "The rainforest becomes the classroom", zh: "自然教育", description: "Rainforest School, youth nature programs, and field experiences that build understanding through direct observation.", image: "/onek/education.jpg" },
  species: { eyebrow: "SPECIES ARCHIVE", title: "The lives recorded at OneK", zh: "物种档案", description: "Mammals, birds, insects, amphibians, and reptiles documented across the reserve.", image: "/onek/birds.png" },
  "natural-echo": { eyebrow: "NATURAL ECHO", title: "Let nature be heard", zh: "让自然的声音被更多孩子听见", description: "Youth-led nature education, birdwatching, community learning, and a growing network of young conservationists.", image: "/onek/education.jpg" },
  archive: { eyebrow: "ONEK HISTORICAL ARCHIVE", title: "A story still being written", zh: "历史档案", description: "Milestones from 2018 to today: roads, springs, restoration, anti-poaching, community initiatives, and discoveries.", image: "/onek/hero.jpg" },
  "discover-observe": { eyebrow: "DISCOVER & OBSERVE", title: "Look closer. Discover more.", zh: "发现与观察", description: "Follow wildlife encounters, seasonal changes, field observations, and the small discoveries that reveal how OneK’s rainforest lives and changes.", image: "/onek/fieldnote.jpg" },
  support: { eyebrow: "SUPPORT ONEK", title: "Protect the rainforest. Protect life.", zh: "支持 OneK 保护行动", description: "Donation methods for Costa Rica, the Americas, and China will be connected after the organization’s verified payment details are ready.", image: "/onek/camera.jpg" },
};

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const page = sections[section] ?? sections.about;
  return <main className="framework-page">
    <header><Link href="/"><img src="/onek/logo.png" alt="OneK" /></Link><Link href="/">← BACK TO HOME</Link></header>
    <section style={{ backgroundImage: `linear-gradient(90deg,rgba(5,20,11,.78),rgba(5,20,11,.2)),url('${page.image}')` }}>
      <p>{page.eyebrow}</p><h1>{page.title}</h1><h2>{page.zh}</h2><p>{page.description}</p><span>PAGE FRAMEWORK · CONTENT WILL BE ADDED AFTER HOMEPAGE APPROVAL</span>
    </section>
  </main>;
}
