import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import {
  readExperiences,
  createExperience,
  saveImage,
} from "@/lib/experienceStore";

export async function GET() {
  const list = await readExperiences();
  return Response.json(list, { status: 200 });
}

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
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

    let logo = null;
    const file = form.get("logo");
    if (file && typeof file === "object" && file.size > 0) {
      logo = await saveImage(file);
    }

    const entry = await createExperience({
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
    return Response.json(entry, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create experience.", error: error.message },
      { status: 500 },
    );
  }
}
