import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { readSiteSettings, writeSiteSettings } from "@/lib/contentStore";

export async function GET() {
  const settings = await readSiteSettings();
  return Response.json(settings, { status: 200 });
}

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const saved = await writeSiteSettings(body);
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
