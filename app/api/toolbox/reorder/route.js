import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { reorderToolbox } from "@/lib/contentStore";

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return Response.json({ message: "orderedIds must be an array." }, { status: 400 });
    }

    const reordered = await reorderToolbox(orderedIds);
    revalidatePath("/");
    return Response.json({ items: reordered }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to reorder toolbox.", error: error.message }, { status: 500 });
  }
}
