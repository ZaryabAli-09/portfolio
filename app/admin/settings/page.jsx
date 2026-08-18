import { isAuthenticated } from "@/lib/auth";
import { readSiteSettings } from "@/lib/contentStore";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import SiteSettingsDashboard from "@/components/admin/SiteSettingsDashboard";

export const metadata = {
  title: "Admin · Settings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!isAuthenticated()) {
    return <AdminLoginForm />;
  }

  const settings = await readSiteSettings();
  return (
    <main className="min-h-screen bg-primary bg-dotted px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SiteSettingsDashboard initialData={settings} />
      </div>
    </main>
  );
}
