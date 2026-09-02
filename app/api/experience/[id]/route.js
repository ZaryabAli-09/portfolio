import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import {
  getExperience,
  updateExperience,
  deleteExperience,
  saveImage,
  deleteImage,
} from "@/lib/experienceStore";

export async function PUT(req, { params }) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = params;
    const existing = await getExperience(id);
    if (!existing) {
      return Response.json({ message: "Not found." }, { status: 404 });
    }

    const form = await req.formData();

    const company = form.get("company")?.toString().trim();
    const role = form.get("role")?.toString().trim();
    if (!company || !role) {
      return Response.json(
        { message: "Company and role are required." },
        { status: 400 },
      );
    }

    const bulletsRaw = form.get("bullets")?.toString() || "[]";
    const bullets = JSON.parse(bulletsRaw).filter((b) => b?.trim());

    let logo = existing.logo;
    const removeLogo = form.get("removeLogo") === "true";
    const file = form.get("logo");

    if (file && typeof file === "object" && file.size > 0) {
      // Replacing the logo — delete the old file, save the new one.
      if (existing.logo) await deleteImage(existing.logo);
      logo = await saveImage(file);
    } else if (removeLogo && existing.logo) {
      await deleteImage(existing.logo);
      logo = null;
    }

    const updated = await updateExperience(id, {
      company,
      companyLink: form.get("companyLink")?.toString().trim() || "",
      role,
      employmentType: form.get("employmentType")?.toString() || "",
      location: form.get("location")?.toString() || "",
      duration: form.get("duration")?.toString() || "",
      bullets,
      logo,
    });

    revalidatePath("/");
    return Response.json(updated, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to update experience.", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_req, { params }) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = params;
    const deleted = await deleteExperience(id);
    if (!deleted) {
      return Response.json({ message: "Not found." }, { status: 404 });
    }

    revalidatePath("/");
    return Response.json({ message: "Deleted." }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to delete experience.", error: error.message },
      { status: 500 },
    );
  }
}
