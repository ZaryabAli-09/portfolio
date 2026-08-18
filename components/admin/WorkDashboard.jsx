"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const EMPTY = {
  title: "",
  role: "",
  period: "",
  description: "",
  image: "",
  link: "",
  tags: "",
  category: "work",
};

const WorkDashboard = ({ initialData = [] }) => {
  const [projects, setProjects] = useState(initialData);
  const [mode, setMode] = useState(null); // null | "add" | { edit: project }
  const [fields, setFields] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const hydrateFields = (project) => ({
    title: project?.title || "",
    role: project?.role || "",
    period: project?.period || "",
    description: project?.description || "",
    image: project?.image || "",
    link: project?.link || "",
    tags: Array.isArray(project?.tags) ? project.tags.join(", ") : "",
    category: project?.category === "side" ? "side" : "work",
  });

  const openAdd = () => {
    setFields(EMPTY);
    setMode("add");
  };

  const openEdit = (project) => {
    setFields(hydrateFields(project));
    setMode({ edit: project });
  };

  const refresh = async () => {
    const res = await fetch("/api/work", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  };

  const handleSave = async () => {
    if (!fields.title.trim()) {
      toast.error("Project title is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...fields,
        title: fields.title.trim(),
        role: fields.role.trim(),
        period: fields.period.trim(),
        description: fields.description.trim(),
        image: fields.image.trim(),
        link: fields.link.trim(),
        tags: fields.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const isEdit = Boolean(mode?.edit);
      const url = isEdit ? `/api/work/${mode.edit.id}` : "/api/work";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to save project.");
        return;
      }

      toast.success(isEdit ? "Project updated." : "Project added.");
      setMode(null);
      setFields(EMPTY);
      await refresh();
    } catch {
      toast.error("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/work/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to delete.");
        return;
      }

      toast.success("Project deleted.");
      await refresh();
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-secondary text-highlight text-xl">admin · work</p>
          <h2 className="text-3xl font-extrabold text-heading">Manage projects</h2>
        </div>
        {!mode && (
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading shadow-[4px_4px_0_0_#111827]"
          >
            <FiPlus className="w-4 h-4" /> Add project
          </button>
        )}
      </div>

      {mode && (
        <div className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827] space-y-3">
          <h3 className="text-lg font-extrabold text-heading">
            {mode === "add" ? "Add project" : "Edit project"}
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            <input className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" placeholder="Title *" value={fields.title} onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))} />
            <select className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" value={fields.category} onChange={(e) => setFields((f) => ({ ...f, category: e.target.value }))}>
              <option value="work">At work</option>
              <option value="side">On the side</option>
            </select>
            <input className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" placeholder="Role" value={fields.role} onChange={(e) => setFields((f) => ({ ...f, role: e.target.value }))} />
            <input className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" placeholder="Period" value={fields.period} onChange={(e) => setFields((f) => ({ ...f, period: e.target.value }))} />
            <input className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" placeholder="Image path (/image.png)" value={fields.image} onChange={(e) => setFields((f) => ({ ...f, image: e.target.value }))} />
            <input className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" placeholder="Project link" value={fields.link} onChange={(e) => setFields((f) => ({ ...f, link: e.target.value }))} />
            <input className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading" placeholder="Tags separated by commas" value={fields.tags} onChange={(e) => setFields((f) => ({ ...f, tags: e.target.value }))} />
            <textarea className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading resize-none" rows={4} placeholder="Description" value={fields.description} onChange={(e) => setFields((f) => ({ ...f, description: e.target.value }))} />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading shadow-[4px_4px_0_0_#111827] disabled:opacity-60">
              {saving ? "Saving..." : mode === "add" ? "Add project" : "Save changes"}
            </button>
            <button type="button" onClick={() => setMode(null)} className="px-5 py-2.5 rounded-md font-bold bg-primary border-2 border-heading">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-heading bg-primary p-6 text-description">
            No projects yet.
          </div>
        )}

        {projects.map((project) => (
          <div key={project.id} className="rounded-2xl border-2 border-heading bg-primary p-4 shadow-[4px_4px_0_0_#111827]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-heading">{project.title}</h4>
                <p className="text-sm text-description">{project.role} {project.period ? `· ${project.period}` : ""}</p>
                <p className="text-sm text-description mt-1">{project.category === "side" ? "On the side" : "At work"}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => openEdit(project)} className="p-2 rounded-md border-2 border-heading">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => handleDelete(project.id)} disabled={deletingId === project.id} className="p-2 rounded-md border-2 border-heading text-accent disabled:opacity-50">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkDashboard;
