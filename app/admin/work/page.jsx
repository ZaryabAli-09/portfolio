import { isAuthenticated } from "@/lib/auth";
import { readProjects } from "@/lib/workStore";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import WorkDashboard from "@/components/admin/WorkDashboard";

export const metadata = {
  title: "Admin · Work",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminWorkPage() {
  if (!isAuthenticated()) {
    return <AdminLoginForm />;
  }

  const projects = await readProjects();

  return (
    <main className="min-h-screen bg-primary bg-dotted px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <WorkDashboard initialData={projects} />
      </div>
    </main>
  );
}
