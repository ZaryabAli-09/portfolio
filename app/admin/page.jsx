import { isAuthenticated } from "@/lib/auth";
import { readToolbox, readSiteSettings } from "@/lib/contentStore";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAuthenticated()) {
    return <AdminLoginForm />;
  }

  const [toolbox, siteSettings] = await Promise.all([
    readToolbox(),
    readSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-primary bg-dotted px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-secondary text-highlight text-xl">admin</p>
          <h1 className="text-4xl font-extrabold text-heading">
            Portfolio dashboard
          </h1>
        </div>

        <div className="rounded-2xl border-2 border-heading bg-primary p-6 shadow-[4px_4px_0_0_#111827]">
          <p className="text-description">
            Welcome back. Use the tabs below to manage your experience, toolbox,
            projects, and site settings.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <a
              href="/admin/experience"
              className="rounded-xl border-2 border-heading bg-primary px-4 py-3 text-center font-bold text-heading hover:bg-heading/5"
            >
              Experiences
            </a>
            <a
              href="/admin/toolbox"
              className="rounded-xl border-2 border-heading bg-primary px-4 py-3 text-center font-bold text-heading hover:bg-heading/5"
            >
              Toolbox
            </a>
            <a
              href="/admin/work"
              className="rounded-xl border-2 border-heading bg-primary px-4 py-3 text-center font-bold text-heading hover:bg-heading/5"
            >
              Work
            </a>
            <a
              href="/admin/settings"
              className="rounded-xl border-2 border-heading bg-primary px-4 py-3 text-center font-bold text-heading hover:bg-heading/5"
            >
              Settings
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827]">
            <p className="text-sm font-bold text-heading">Toolbox count</p>
            <p className="mt-2 text-3xl font-extrabold text-highlight">
              {toolbox.length}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827]">
            <p className="text-sm font-bold text-heading">Email</p>
            <p className="mt-2 text-2xl font-extrabold text-highlight">
              {siteSettings.email}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
