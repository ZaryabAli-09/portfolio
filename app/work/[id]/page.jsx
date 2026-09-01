import { notFound } from "next/navigation";
import { getProject } from "@/lib/workStore";
import ProjectDetail from "@/components/main_page_comps/ProjectDetail";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
