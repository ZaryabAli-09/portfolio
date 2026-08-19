"use client";

import { useState, useEffect, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX } from "react-icons/fi";
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const formRef = useRef(null);

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
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    setMode("add");
  };

  const openEdit = (project) => {
    setFields(hydrateFields(project));
    setImageFile(null);
    setImagePreview(project?.image || null);
    setRemoveImage(false);
    setMode({ edit: project });
  };

  // Scroll the form into view whenever we open add/edit.
  useEffect(() => {
    if (mode) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mode]);

  const refresh = async () => {
    const res = await fetch("/api/work", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setRemoveImage(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  };

  const handleSave = async () => {
    if (!fields.title.trim()) {
      toast.error("Project title is required.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", fields.title.trim());
      formData.append("role", fields.role.trim());
      formData.append("period", fields.period.trim());
      formData.append("description", fields.description.trim());
      formData.append("link", fields.link.trim());
      formData.append("category", fields.category);
      formData.append(
        "tags",
        JSON.stringify(
          fields.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );
      if (imageFile) formData.append("image", imageFile);
      if (mode?.edit && removeImage) formData.append("removeImage", "true");

      const isEdit = Boolean(mode?.edit);
      const url = isEdit ? `/api/work/${mode.edit.id}` : "/api/work";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to save project.");
        return;
      }

      toast.success(isEdit ? "Project updated." : "Project added.");
      setMode(null);
      setFields(EMPTY);
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
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
          <h2 className="text-3xl font-extrabold text-heading">
            Manage projects
          </h2>
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
        <div
          ref={formRef}
          className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827] space-y-3"
        >
          <h3 className="text-lg font-extrabold text-heading">
            {mode === "add" ? "Add project" : "Edit project"}
          </h3>

          {/* Image */}
          <div>
            <label className="block text-sm font-bold text-heading mb-2">
              Project image
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-16 shrink-0 rounded-xl border-2 border-heading bg-primary overflow-hidden">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-description text-xs">
                    No image
                  </div>
                )}
              </div>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 border-heading bg-primary text-sm font-bold cursor-pointer hover:bg-heading/5 transition-colors">
                <FiUpload className="w-4 h-4" />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-1 text-sm text-accent font-bold"
                >
                  <FiX className="w-4 h-4" /> Remove
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Title *"
              value={fields.title}
              onChange={(e) =>
                setFields((f) => ({ ...f, title: e.target.value }))
              }
            />
            <select
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              value={fields.category}
              onChange={(e) =>
                setFields((f) => ({ ...f, category: e.target.value }))
              }
            >
              <option value="work">At work</option>
              <option value="side">On the side</option>
            </select>
            <input
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Role"
              value={fields.role}
              onChange={(e) =>
                setFields((f) => ({ ...f, role: e.target.value }))
              }
            />
            <input
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Period"
              value={fields.period}
              onChange={(e) =>
                setFields((f) => ({ ...f, period: e.target.value }))
              }
            />
            <input
              className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Project link"
              value={fields.link}
              onChange={(e) =>
                setFields((f) => ({ ...f, link: e.target.value }))
              }
            />
            <input
              className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Tags separated by commas"
              value={fields.tags}
              onChange={(e) =>
                setFields((f) => ({ ...f, tags: e.target.value }))
              }
            />
            <textarea
              className="md:col-span-2 w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading resize-none"
              rows={4}
              placeholder="Description"
              value={fields.description}
              onChange={(e) =>
                setFields((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading shadow-[4px_4px_0_0_#111827] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : mode === "add"
                  ? "Add project"
                  : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(null);
                setImageFile(null);
                setImagePreview(null);
                setRemoveImage(false);
              }}
              className="px-5 py-2.5 rounded-md font-bold bg-primary border-2 border-heading"
            >
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
          <div
            key={project.id}
            className="rounded-2xl border-2 border-heading bg-primary p-4 shadow-[4px_4px_0_0_#111827]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-heading">{project.title}</h4>
                <p className="text-sm text-description">
                  {project.role} {project.period ? `· ${project.period}` : ""}
                </p>
                <p className="text-sm text-description mt-1">
                  {project.category === "side" ? "On the side" : "At work"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(project)}
                  className="p-2 rounded-md border-2 border-heading"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  disabled={deletingId === project.id}
                  className="p-2 rounded-md border-2 border-heading text-accent disabled:opacity-50"
                >
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
