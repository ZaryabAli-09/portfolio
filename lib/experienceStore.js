import "server-only";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join(process.cwd(), "data", "experience.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "experience");
const PUBLIC_UPLOAD_PATH = "/uploads/experience";

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

/** Read all experiences, sorted by `order`. */
export async function readExperiences() {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const list = JSON.parse(raw || "[]");
  return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

async function writeExperiences(list) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export async function getExperience(id) {
  const list = await readExperiences();
  return list.find((e) => e.id === id) || null;
}

export async function createExperience(data) {
  const list = await readExperiences();
  const id = data.id || crypto.randomUUID();
  const entry = {
    id,
    company: data.company,
    role: data.role,
    employmentType: data.employmentType || "",
    location: data.location || "",
    duration: data.duration || "",
    logo: data.logo || null,
    bullets: data.bullets || [],
    order: list.length ? Math.max(...list.map((e) => e.order ?? 0)) + 1 : 0,
  };
  list.push(entry);
  await writeExperiences(list);
  return entry;
}

export async function updateExperience(id, data) {
  const list = await readExperiences();
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const updated = {
    ...list[idx],
    ...data,
    id: list[idx].id,
  };
  list[idx] = updated;
  await writeExperiences(list);
  return updated;
}

export async function deleteExperience(id) {
  const list = await readExperiences();
  const entry = list.find((e) => e.id === id);
  const filtered = list.filter((e) => e.id !== id);
  await writeExperiences(filtered);
  if (entry?.logo) {
    await deleteImage(entry.logo);
  }
  return entry;
}

export async function reorderExperiences(orderedIds) {
  const list = await readExperiences();
  const byId = Object.fromEntries(list.map((e) => [e.id, e]));
  const reordered = orderedIds
    .map((id, i) => (byId[id] ? { ...byId[id], order: i } : null))
    .filter(Boolean);
  await writeExperiences(reordered);
  return reordered;
}

/**
 * Save an uploaded image file to disk, resized/optimized server-side with
 * sharp, and return its public URL (e.g. "/uploads/experience/<id>.webp").
 */
export async function saveImage(file) {
  await ensureUploadDir();
  const sharp = (await import("sharp")).default;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${crypto.randomUUID()}.webp`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await sharp(buffer)
    .resize(400, 400, { fit: "cover" })
    .webp({ quality: 85 })
    .toFile(filepath);

  return `${PUBLIC_UPLOAD_PATH}/${filename}`;
}

/** Delete a previously saved logo image from disk, given its public URL. */
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
