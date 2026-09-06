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
  galleryImages: [],
  detailSections: [],
};

const WorkDashboard = ({ initialData = [] }) => {
  const [projects, setProjects] = useState(initialData);
  const [mode, setMode] = useState(null); // null | "add" | { edit: project }
  const [fields, setFields] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState([]);
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
    category: ["side", "learning", "fyp", "work"].includes(project?.category)
      ? project.category
      : "work",
    galleryImages: Array.isArray(project?.galleryImages)
      ? project.galleryImages
      : [],
    detailSections: Array.isArray(project?.detailSections)
      ? project.detailSections.map((section) => ({
          ...section,
          type: section?.type === "bullets" ? "bullets" : "text",
        }))
      : [],
  });

  const openAdd = () => {
    setFields(EMPTY);
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    setGalleryFiles([]);
    setMode("add");
  };

  const openEdit = (project) => {
    setFields(hydrateFields(project));
    setImageFile(null);
    setImagePreview(project?.image || null);
    setRemoveImage(false);
    setGalleryFiles([]);
    setMode({ edit: project });
  };

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

  const handleGallerySelect = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    setGalleryFiles((current) => [...current, ...selected].slice(0, 6));
    e.target.value = "";
  };

  const removeStoredGalleryImage = (index) => {
    setFields((current) => ({
      ...current,
      galleryImages: current.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const removeNewGalleryImage = (index) => {
    setGalleryFiles((current) => current.filter((_, i) => i !== index));
  };

  const addSection = () => {
    setFields((current) => ({
      ...current,
      detailSections: [
        ...(current.detailSections || []),
        { id: `section-${Date.now()}`, heading: "", type: "text", content: "" },
      ],
    }));
  };

  const updateSection = (index, field, value) => {
    setFields((current) => ({
      ...current,
      detailSections: (current.detailSections || []).map(
        (section, sectionIndex) =>
          sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const removeSection = (index) => {
    setFields((current) => ({
      ...current,
      detailSections: (current.detailSections || []).filter(
        (_, i) => i !== index,
      ),
    }));
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
      formData.append(
        "detailSections",
        JSON.stringify(
          (fields.detailSections || [])
            .map((section) => ({
              id: section.id || `section-${Date.now()}`,
              heading: String(section.heading || "").trim(),
              type: section.type === "bullets" ? "bullets" : "text",
              content: String(section.content || "").trim(),
            }))
            .filter((section) => section.heading || section.content),
        ),
      );
      formData.append(
        "existingGalleryImages",
        JSON.stringify(
          Array.isArray(fields.galleryImages) ? fields.galleryImages : [],
        ),
      );

      if (imageFile) formData.append("image", imageFile);
      if (mode?.edit && removeImage) formData.append("removeImage", "true");

      galleryFiles.forEach((file) => formData.append("galleryImages", file));

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
      setGalleryFiles([]);
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
          className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827] space-y-4"
        >
          <h3 className="text-lg font-extrabold text-heading">
            {mode === "add" ? "Add project" : "Edit project"}
          </h3>

          <div>
            <label className="block text-sm font-bold text-heading mb-2">
              Project image
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-16 shrink-0 rounded-xl border-2 border-heading bg-primary overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-full h-full object-contain"
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

          <div className="space-y-3">
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
                <option value="learning">Initial Learning</option>
                <option value="fyp">FYP Research</option>
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
            </div>

            <input
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Project link"
              value={fields.link}
              onChange={(e) =>
                setFields((f) => ({ ...f, link: e.target.value }))
              }
            />

            <input
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading"
              placeholder="Tags separated by commas"
              value={fields.tags}
              onChange={(e) =>
                setFields((f) => ({ ...f, tags: e.target.value }))
              }
            />

            <textarea
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading resize-none"
              rows={4}
              placeholder="Description"
              value={fields.description}
              onChange={(e) =>
                setFields((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-3 rounded-xl border-2 border-heading bg-primary p-3">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-sm font-bold text-heading">
                More project images
              </label>
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border-2 border-heading bg-primary text-sm font-bold cursor-pointer">
                <FiUpload className="w-4 h-4" /> Add up to 6
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGallerySelect}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(fields.galleryImages || []).map((src, index) => (
                <div key={`stored-${src}-${index}`} className="relative">
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="h-24 w-full rounded-lg object-contain border-2 border-heading"
                  />
                  <button
                    type="button"
                    onClick={() => removeStoredGalleryImage(index)}
                    className="absolute -top-2 -right-2 rounded-full bg-heading text-primary p-1 border-2 border-heading"
                    aria-label="Remove gallery image"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {galleryFiles.map((file, index) => (
                <div key={`new-${file.name}-${index}`} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New gallery ${index + 1}`}
                    className="h-24 w-full rounded-lg object-contain border-2 border-heading"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewGalleryImage(index)}
                    className="absolute -top-2 -right-2 rounded-full bg-heading text-primary p-1 border-2 border-heading"
                    aria-label="Remove uploaded gallery image"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-xl border-2 border-heading bg-primary p-3">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-sm font-bold text-heading">
                Detail sections
              </label>
              <button
                type="button"
                onClick={addSection}
                className="px-3 py-2 rounded-md border-2 border-heading font-bold text-sm"
              >
                + Add section
              </button>
            </div>

            {(fields.detailSections || []).map((section, index) => (
              <div
                key={section.id || index}
                className="rounded-xl border-2 border-heading bg-primary p-3 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    className="w-full px-3 py-2 rounded-md border-2 border-heading bg-primary text-heading"
                    placeholder="Section heading"
                    value={section.heading || ""}
                    onChange={(e) =>
                      updateSection(index, "heading", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-accent font-bold"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
                  <select
                    value={section.type || "text"}
                    onChange={(e) =>
                      updateSection(index, "type", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-md border-2 border-heading bg-primary text-heading"
                  >
                    <option value="text">Plain text</option>
                    <option value="bullets">Bullet list</option>
                  </select>
                </div>

                <textarea
                  className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading resize-none"
                  rows={5}
                  placeholder={
                    section.type === "bullets"
                      ? "Add one bullet per line"
                      : "Add section description"
                  }
                  value={section.content || ""}
                  onChange={(e) =>
                    updateSection(index, "content", e.target.value)
                  }
                />
              </div>
            ))}
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
                setGalleryFiles([]);
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
                  {project.category === "learning"
                    ? "Initial Learning"
                    : project.category === "fyp"
                      ? "FYP Research"
                      : project.category === "side"
                        ? "On the side"
                        : "At work"}
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
