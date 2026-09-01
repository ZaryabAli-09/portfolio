import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import {
  readProjects,
  createProject,
  saveImage,
  saveImages,
} from "@/lib/workStore";

export async function GET() {
  const projects = await readProjects();
  return Response.json(projects, { status: 200 });
}

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await req.formData();

    const title = form.get("title")?.toString().trim();
    if (!title) {
      return Response.json({ message: "Title is required." }, { status: 400 });
    }

    const tagsRaw = form.get("tags")?.toString() || "[]";
    const tags = JSON.parse(tagsRaw).filter((t) => t?.trim());

    let detailSections = [];
    try {
      detailSections = JSON.parse(
        form.get("detailSections")?.toString() || "[]",
      );
    } catch {
      detailSections = [];
    }

    let image = "";
    const file = form.get("image");
    if (file && typeof file === "object" && file.size > 0) {
      image = await saveImage(file);
    }

    const galleryFiles = form
      .getAll("galleryImages")
      .filter((file) => file && typeof file === "object" && file.size > 0);
    const galleryImages = await saveImages(galleryFiles);

    const created = await createProject({
      title,
      role: form.get("role")?.toString().trim() || "",
      period: form.get("period")?.toString().trim() || "",
      description: form.get("description")?.toString().trim() || "",
      link: form.get("link")?.toString().trim() || "",
      category: form.get("category")?.toString() || "work",
      tags,
      image,
      galleryImages,
      detailSections,
    });

    revalidatePath("/");
    revalidatePath("/admin/work");
    return Response.json(created, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create project.", error: error.message },
      { status: 500 },
    );
  }
}
