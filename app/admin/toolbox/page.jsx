import { isAuthenticated } from "@/lib/auth";
import { readToolbox } from "@/lib/contentStore";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import ToolboxDashboard from "@/components/admin/ToolboxDashboard";

export const metadata = {
  title: "Admin · Toolbox",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminToolboxPage() {
  if (!isAuthenticated()) {
    return <AdminLoginForm />;
  }

  const toolbox = await readToolbox();
  return <main className="min-h-screen bg-primary bg-dotted px-4 py-16"><div className="mx-auto max-w-5xl"><ToolboxDashboard initialData={toolbox} /></div></main>;
}
