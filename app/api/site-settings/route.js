import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { readSiteSettings, writeSiteSettings } from "@/lib/contentStore";

const ASSET_CONFIG = {
  profileImage: {
    directory: path.join(process.cwd(), "public"),
    filename: "zaryab.png",
    publicUrl: "/zaryab.png",
    types: ["image/png", "image/jpeg", "image/webp"],
    maxSize: 5 * 1024 * 1024,
  },
  favicon: {
    directory: path.join(process.cwd(), "public"),
    filename: "favicon.png",
    publicUrl: "/favicon.png",
    types: ["image/png", "image/x-icon", "image/vnd.microsoft.icon"],
    maxSize: 1 * 1024 * 1024,
  },
  cv: {
    directory: path.join(process.cwd(), "public", "uploads", "cv"),
    filename: "cv.pdf",
    publicUrl: "/uploads/cv/cv.pdf",
    types: ["application/pdf"],
    maxSize: 10 * 1024 * 1024,
  },
};

async function saveAsset(file, assetType) {
  const config = ASSET_CONFIG[assetType];
  if (!config || !file || typeof file !== "object" || file.size === 0) {
    return null;
  }
  if (!config.types.includes(file.type) || file.size > config.maxSize) {
    throw new Error(`Invalid ${assetType} file.`);
  }

  await fs.mkdir(config.directory, { recursive: true });
  const extension = assetType === "cv" ? ".pdf" : ".png";
  const filename =
    assetType === "cv"
      ? config.filename
      : `${path.parse(config.filename).name}-${crypto.randomUUID()}${extension}`;
  const filepath = path.join(config.directory, filename);
  await fs.writeFile(filepath, Buffer.from(await file.arrayBuffer()));

  if (assetType !== "cv") {
    await fs.rename(filepath, path.join(config.directory, config.filename));
  }
  return config.publicUrl;
}

export async function GET() {
  const settings = await readSiteSettings();
  return Response.json(settings, { status: 200 });
}

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const body = JSON.parse(form.get("settings")?.toString() || "{}");
    const uploadedAssets = await Promise.all(
      Object.keys(ASSET_CONFIG).map(async (assetType) => [
        assetType === "cv" ? "cvUrl" : assetType,
        await saveAsset(form.get(assetType), assetType),
      ]),
    );
    const saved = await writeSiteSettings({
      ...body,
      ...Object.fromEntries(uploadedAssets.filter(([, url]) => url)),
    });
    revalidatePath("/");
    revalidatePath("/admin");
    return Response.json(saved, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to save settings.", error: error.message },
      { status: 500 },
    );
  }
}
