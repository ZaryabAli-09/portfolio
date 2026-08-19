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

function normalizeProject(project, index = 0) {
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
    category: project?.category === "side" ? "side" : "work",
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

/** Save an uploaded image file to disk, resized/optimized with sharp, and return its public URL. */
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

/** Delete a previously saved work image from disk, given its public URL. */
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
