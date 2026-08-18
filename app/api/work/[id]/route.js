import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { updateProject, deleteProject } from "@/lib/workStore";

export async function PUT(req, { params }) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateProject(params.id, body);
    if (!updated) {
      return Response.json({ message: "Not found." }, { status: 404 });
    }

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
