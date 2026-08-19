"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiLogOut } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-primary bg-dotted">
      <header className="sticky top-0 z-50 w-full bg-primary border-b-2 border-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-heading hover:text-highlight transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" /> Back
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-heading hover:text-accent transition-colors"
          >
            <FiLogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </header>

      {children}
    </div>
  );
};

export default AdminLayout;
