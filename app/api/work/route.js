import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { readProjects, createProject } from "@/lib/workStore";

export async function GET() {
  const projects = await readProjects();
  return Response.json(projects, { status: 200 });
}

export async function POST(req) {
  if (!isAuthenticated()) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body?.title?.trim()) {
      return Response.json({ message: "Title is required." }, { status: 400 });
    }

    const created = await createProject(body);
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
