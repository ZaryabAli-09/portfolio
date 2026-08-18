import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { readToolbox, writeToolbox } from "@/lib/contentStore";

export async function GET() {
  const items = await readToolbox();
  return Response.json(items, { status: 200 });
}

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { items } = await req.json();
    if (!Array.isArray(items)) {
      return Response.json({ message: "Items must be an array." }, { status: 400 });
    }

    const saved = await writeToolbox(items);
    revalidatePath("/");
    return Response.json({ items: saved }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to save toolbox.", error: error.message }, { status: 500 });
  }
}
