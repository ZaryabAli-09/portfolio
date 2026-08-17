"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

const AdminLoginForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Incorrect password.");
        return;
      }

      toast.success("Welcome back!");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-primary bg-dotted px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-primary border-2 border-heading rounded-2xl p-8 shadow-[6px_6px_0_0_#111827]"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-heading bg-primary mx-auto mb-5">
          <FiLock className="w-5 h-5 text-heading" />
        </div>

        <h1 className="text-2xl font-extrabold text-heading text-center mb-1">
          Admin access
        </h1>
        <p className="text-description text-sm text-center mb-6">
          Enter the admin password to manage experience entries.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 mb-4 rounded-md border-2 border-heading bg-primary text-heading placeholder:text-description/60 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 rounded-md font-bold bg-heading text-primary border-2 border-heading
            shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827]
            hover:translate-x-[2px] hover:translate-y-[2px]
            active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
            transition-all duration-150 ease-out disabled:opacity-60"
        >
          {loading ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
