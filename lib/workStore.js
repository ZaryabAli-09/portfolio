import "server-only";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join(process.cwd(), "data", "work.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "work");
const PUBLIC_UPLOAD_PATH = "/uploads/work";

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

function normalizeStringArray(values) {
  if (!Array.isArray(values)) return [];
  return values.map((value) => String(value ?? "").trim()).filter(Boolean);
}

function normalizeDetailSection(section, index = 0) {
  if (!section || typeof section !== "object") return null;

  const type = section.type === "bullets" ? "bullets" : "text";
  const heading = String(section.heading ?? "").trim();
  const content = String(section.content ?? "").trim();

  if (!heading && !content) return null;

  return {
    id: section.id || `section-${index}`,
    heading,
    type,
    content,
  };
}

function normalizeProject(project, index = 0) {
  const galleryImages = normalizeStringArray(project?.galleryImages);
  const detailSections = Array.isArray(project?.detailSections)
    ? project.detailSections
        .map((section, sectionIndex) =>
          normalizeDetailSection(section, sectionIndex),
        )
        .filter(Boolean)
    : [];

  return {
    id: project?.id || crypto.randomUUID(),
    title: String(project?.title || "").trim(),
    role: String(project?.role || "").trim(),
    period: String(project?.period || "").trim(),
    description: String(project?.description || "").trim(),
    image: String(project?.image || "").trim(),
    link: String(project?.link || "").trim(),
    tags: Array.isArray(project?.tags)
      ? project.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    galleryImages: galleryImages.slice(0, 6),
    detailSections,
    category: ["side", "learning", "fyp", "work"].includes(project?.category)
      ? project.category
      : "work",
    order: Number.isFinite(project?.order) ? project.order : index,
  };
}

async function writeProjects(list) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export async function readProjects() {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw || "[]");
  const list = Array.isArray(parsed)
    ? parsed.map((item, index) => normalizeProject(item, index))
    : [];
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getProject(id) {
  const list = await readProjects();
  return list.find((item) => item.id === id) || null;
}

async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function saveImage(file) {
  await ensureUploadDir();
  const sharp = (await import("sharp")).default;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${crypto.randomUUID()}.webp`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await sharp(buffer)
    .resize(800, 600, { fit: "cover" })
    .webp({ quality: 85 })
    .toFile(filepath);

  return `${PUBLIC_UPLOAD_PATH}/${filename}`;
}

export async function saveImages(files = []) {
  const urls = [];
  for (const file of files) {
    if (file && typeof file === "object" && file.size > 0) {
      urls.push(await saveImage(file));
    }
  }
  return urls;
}

export async function deleteImage(publicUrl) {
  if (!publicUrl || !publicUrl.startsWith(PUBLIC_UPLOAD_PATH)) return;
  const filename = path.basename(publicUrl);
  const filepath = path.join(UPLOAD_DIR, filename);
  try {
    await fs.unlink(filepath);
  } catch {
    // File may already be gone — safe to ignore.
  }
}

export async function deleteProjectImageFiles(project) {
  const assets = [project?.image, ...(project?.galleryImages || [])].filter(
    Boolean,
  );
  for (const asset of assets) {
    await deleteImage(asset);
  }
}

export async function createProject(data) {
  const list = await readProjects();
  const item = normalizeProject(
    {
      ...data,
      id: data?.id || crypto.randomUUID(),
      order: list.length,
    },
    list.length,
  );
  list.push(item);
  await writeProjects(list);
  return item;
}

export async function updateProject(id, data) {
  const list = await readProjects();
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) return null;

  const updated = normalizeProject(
    {
      ...list[idx],
      ...data,
      id,
      order: list[idx].order,
    },
    list[idx].order,
  );

  list[idx] = updated;
  await writeProjects(list);
  return updated;
}

export async function deleteProject(id) {
  const list = await readProjects();
  const exists = list.some((item) => item.id === id);
  if (!exists) return null;

  const next = list
    .filter((item) => item.id !== id)
    .map((item, index) => ({ ...item, order: index }));

  await writeProjects(next);
  return true;
}
