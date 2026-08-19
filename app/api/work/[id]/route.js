import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import {
  getProject,
  updateProject,
  deleteProject,
  saveImage,
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

    let image = existing.image;
    const removeImage = form.get("removeImage") === "true";
    const file = form.get("image");

    if (file && typeof file === "object" && file.size > 0) {
      // Replacing the image — delete the old file, save the new one.
      if (existing.image) await deleteImage(existing.image);
      image = await saveImage(file);
    } else if (removeImage && existing.image) {
      await deleteImage(existing.image);
      image = "";
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
