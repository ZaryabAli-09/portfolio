import "server-only";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const TOOLBOX_FILE = path.join(DATA_DIR, "toolbox.json");
const SITE_FILE = path.join(DATA_DIR, "site.json");

const defaultToolbox = [
  { id: "niche", title: "Niche", tags: ["Mapbox", "BabylonJS", "Unity 3D", "3D Web (legacy)"] },
  { id: "languages", title: "Languages & Frameworks", tags: ["TypeScript", "React", "Next.js", "React Native", "Python"] },
  { id: "past-life", title: "A past life", tags: ["Ruby", "PHP", "Rust", "C++", "C#", "Bash", "Inno Setup"] },
  { id: "backend", title: "Backend & Auth", tags: ["PostgreSQL", "Supabase", "Auth0", "Azure Functions", "Stripe"] },
  { id: "platform-ai", title: "Platform & AI", tags: ["Monorepos", "MCP", "TanStack", "Expo", "OpenAI"] },
  { id: "leadership", title: "Leading", tags: ["Leadership", "Mentorship", "Problem Solving", "Communication"] },
];

const defaultSiteSettings = {
  name: "Zaryab Ali",
  role: "Full-stack MERN developer",
  heroDescription:
    "A full-stack MERN developer who's been shipping software since 2017 and loves turning ideas into production-ready web and mobile products.",
  aboutTitle: "Full-stack by trade, curious by nature.",
  aboutParagraphs: [
    "I'm a full-stack developer finishing my Software Engineering degree at Iqra National University, Peshawar. I started writing code in 2021 and have been building with JavaScript, React and the MERN stack ever since.",
    "These days I focus on Next.js, React and Node.js — building clean, production-ready web and mobile products. I've worked as a backend-focused engineer at a software house, taken on freelance full-stack and AI-integration projects, and led my own final year project: a multi-vendor fashion marketplace with real-time chat, AI recommendations and a React Native mobile app.",
    "Outside of coursework and client work, I like exploring new tools in the JS ecosystem, tightening up my Figma-to-code workflow, and shipping small side projects just to keep learning.",
  ],
  email: "zaryabkhan248@gmail.com",
  socialLinks: [
    { label: "GitHub", url: "https://github.com/ZaryabAli-09" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/zaryab-ali-softdev" },
  ],
};

async function ensureJsonFile(filePath, fallback) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
  }
}

function normalizeToolboxItem(item, index) {
  return {
    id: item?.id || `toolbox-${index + 1}-${crypto.randomUUID().slice(0, 8)}`,
    title: String(item?.title || "New skill group").trim(),
    tags: Array.isArray(item?.tags)
      ? item.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
  };
}

export async function readToolbox() {
  await ensureJsonFile(TOOLBOX_FILE, defaultToolbox);
  const raw = await fs.readFile(TOOLBOX_FILE, "utf-8");
  const parsed = JSON.parse(raw || "[]");
  const list = Array.isArray(parsed) ? parsed.map(normalizeToolboxItem) : defaultToolbox;
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function writeToolbox(list) {
  await ensureJsonFile(TOOLBOX_FILE, defaultToolbox);
  const normalized = (Array.isArray(list) ? list : []).map((item, index) => ({
    ...normalizeToolboxItem(item, index),
    order: index,
  }));
  await fs.writeFile(TOOLBOX_FILE, JSON.stringify(normalized, null, 2), "utf-8");
  return normalized;
}

export async function reorderToolbox(orderedIds) {
  const list = await readToolbox();
  const byId = Object.fromEntries(list.map((item) => [item.id, item]));
  const reordered = orderedIds
    .map((id, index) => (byId[id] ? { ...byId[id], order: index } : null))
    .filter(Boolean)
    .map((item) => ({ ...item, tags: Array.isArray(item.tags) ? item.tags : [] }));
  await writeToolbox(reordered);
  return reordered;
}

export async function readSiteSettings() {
  await ensureJsonFile(SITE_FILE, defaultSiteSettings);
  const raw = await fs.readFile(SITE_FILE, "utf-8");
  const parsed = JSON.parse(raw || "{}");
  return {
    ...defaultSiteSettings,
    ...parsed,
    socialLinks: Array.isArray(parsed.socialLinks) && parsed.socialLinks.length
      ? parsed.socialLinks.map((link) => ({
          label: String(link?.label || "Link"),
          url: String(link?.url || "#"),
        }))
      : defaultSiteSettings.socialLinks,
    aboutParagraphs: Array.isArray(parsed.aboutParagraphs) && parsed.aboutParagraphs.length
      ? parsed.aboutParagraphs.map((paragraph) => String(paragraph))
      : defaultSiteSettings.aboutParagraphs,
  };
}

export async function writeSiteSettings(settings) {
  await ensureJsonFile(SITE_FILE, defaultSiteSettings);
  const next = {
    ...defaultSiteSettings,
    ...settings,
    socialLinks: Array.isArray(settings?.socialLinks) ? settings.socialLinks : defaultSiteSettings.socialLinks,
    aboutParagraphs: Array.isArray(settings?.aboutParagraphs) ? settings.aboutParagraphs : defaultSiteSettings.aboutParagraphs,
  };
  await fs.writeFile(SITE_FILE, JSON.stringify(next, null, 2), "utf-8");
  return next;
}
