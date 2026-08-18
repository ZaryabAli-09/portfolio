import { isAuthenticated } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin · Work",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminWorkPage() {
  if (!isAuthenticated()) {
    return <AdminLoginForm />;
  }

  return (
    <main className="min-h-screen bg-primary bg-dotted px-4 py-16">
      <div className="mx-auto max-w-5xl rounded-2xl border-2 border-heading bg-primary p-8 shadow-[4px_4px_0_0_#111827]">
        <p className="font-secondary text-highlight text-xl">admin · work</p>
        <h1 className="mt-2 text-4xl font-extrabold text-heading">Work projects</h1>
        <p className="mt-4 text-description">
          This section is ready for your future project management flow. For now, it is intentionally left as a placeholder and can later be connected to a JSON-driven project store or CMS.
        </p>
      </div>
    </main>
  );
}
