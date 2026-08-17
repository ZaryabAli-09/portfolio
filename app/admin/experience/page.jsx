import { isAuthenticated } from "@/lib/auth";
import { readExperiences } from "@/lib/experienceStore";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import ExperienceDashboard from "@/components/admin/ExperienceDashboard";

export const metadata = {
  title: "Admin · Experience",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  if (!isAuthenticated()) {
    return <AdminLoginForm />;
  }

  const experiences = await readExperiences();
  return <ExperienceDashboard initialData={experiences} />;
}
