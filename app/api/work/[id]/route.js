import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import {
  getProject,
  updateProject,
  deleteProject,
  saveImage,
  saveImages,
  deleteImage,
} from "@/lib/workStore";

export async function PUT(req, { params }) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const existing = await getProject(params.id);
    if (!existing) {
      return Response.json({ message: "Not found." }, { status: 404 });
    }

    const form = await req.formData();
    const title = form.get("title")?.toString().trim();
    if (!title) {
      return Response.json({ message: "Title is required." }, { status: 400 });
    }

    const tagsRaw = form.get("tags")?.toString() || "[]";
    const tags = JSON.parse(tagsRaw).filter((t) => t?.trim());

    let detailSections = Array.isArray(existing.detailSections)
      ? existing.detailSections
      : [];
    try {
      detailSections = JSON.parse(
        form.get("detailSections")?.toString() || "[]",
      );
    } catch {
      detailSections = Array.isArray(existing.detailSections)
        ? existing.detailSections
        : [];
    }

    let image = existing.image;
    const removeImage = form.get("removeImage") === "true";
    const file = form.get("image");

    if (file && typeof file === "object" && file.size > 0) {
      if (existing.image) await deleteImage(existing.image);
      image = await saveImage(file);
    } else if (removeImage && existing.image) {
      await deleteImage(existing.image);
      image = "";
    }

    const existingGallery = (() => {
      try {
        return JSON.parse(
          form.get("existingGalleryImages")?.toString() || "[]",
        );
      } catch {
        return Array.isArray(existing.galleryImages)
          ? existing.galleryImages
          : [];
      }
    })();

    const galleryFiles = form
      .getAll("galleryImages")
      .filter((file) => file && typeof file === "object" && file.size > 0);
    const newGalleryImages = await saveImages(galleryFiles);

    const galleryImages = [
      ...(Array.isArray(existingGallery) ? existingGallery : []),
      ...newGalleryImages,
    ].slice(0, 6);
    if (form.get("clearGalleryImages") === "true") {
      for (const asset of existing.galleryImages || []) {
        await deleteImage(asset);
      }
      galleryImages.length = 0;
    }

    const updated = await updateProject(params.id, {
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
    return Response.json(updated, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to update project.", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_req, { params }) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const deleted = await deleteProject(params.id);
    if (!deleted) {
      return Response.json({ message: "Not found." }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/admin/work");
    return Response.json({ message: "Deleted." }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to delete project.", error: error.message },
      { status: 500 },
    );
  }
}
