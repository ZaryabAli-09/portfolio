"use client";

import { useState } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const EMPTY = {
  company: "",
  companyLink: "",
  role: "",
  employmentType: "",
  location: "",
  startDate: "",
  endDate: "",
  duration: "",
  bullets: [""],
};

/**
 * `entry`   — pass an existing experience object to edit it, or omit to add new.
 * `onDone`  — called with the saved entry after a successful create/update.
 * `onCancel`— called when the user cancels out of the form.
 */
const ExperienceForm = ({ entry, onDone, onCancel }) => {
  const isEdit = Boolean(entry);
  const [fields, setFields] = useState(
    entry
      ? {
          company: entry.company || "",
          companyLink: entry.companyLink || "",
          role: entry.role || "",
          employmentType: entry.employmentType || "",
          location: entry.location || "",
          startDate: entry.startDate || "",
          endDate: entry.endDate || "",
          duration: entry.duration || "",
          bullets: entry.bullets?.length ? entry.bullets : [""],
        }
      : EMPTY,
  );
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(entry?.logo || null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setFields((f) => ({ ...f, [key]: value }));

  const updateBullet = (i, value) => {
    const next = [...fields.bullets];
    next[i] = value;
    update("bullets", next);
  };

  const addBullet = () => update("bullets", [...fields.bullets, ""]);

  const removeBullet = (i) => {
    const next = fields.bullets.filter((_, idx) => idx !== i);
    update("bullets", next.length ? next : [""]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setRemoveLogo(false);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setRemoveLogo(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.company.trim() || !fields.role.trim()) {
      toast.error("Company and role are required.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("company", fields.company.trim());
      formData.append("companyLink", fields.companyLink.trim());
      formData.append("role", fields.role.trim());
      formData.append("employmentType", fields.employmentType.trim());
      formData.append("location", fields.location.trim());
      formData.append("startDate", fields.startDate);
      formData.append("endDate", fields.endDate);
      formData.append("duration", fields.duration.trim());
      formData.append(
        "bullets",
        JSON.stringify(fields.bullets.map((b) => b.trim()).filter(Boolean)),
      );
      if (logoFile) formData.append("logo", logoFile);
      if (isEdit && removeLogo) formData.append("removeLogo", "true");

      const url = isEdit ? `/api/experience/${entry.id}` : "/api/experience";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      toast.success(isEdit ? "Experience updated." : "Experience added.");
      onDone?.(data);
    } catch (err) {
      toast.error("Failed to save experience.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary border-2 border-heading rounded-2xl p-6 shadow-[6px_6px_0_0_#111827] space-y-5"
    >
      <h3 className="text-lg font-extrabold text-heading">
        {isEdit ? "Edit experience" : "Add new experience"}
      </h3>

      {/* Logo */}
      <div>
        <label className="block text-sm font-bold text-heading mb-2">
          Company logo
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0 rounded-xl border-2 border-heading bg-primary overflow-hidden flex items-center justify-center p-1.5">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Logo preview"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-description text-xs">
                No logo
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

          {logoPreview && (
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="inline-flex items-center gap-1 text-sm text-accent font-bold"
            >
              <FiX className="w-4 h-4" /> Remove
            </button>
          )}
        </div>
      </div>

      {/* Text fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-heading mb-1.5">
            Company *
          </label>
          <input
            type="text"
            value={fields.company}
            onChange={(e) => update("company", e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-heading mb-1.5">
            Role *
          </label>
          <input
            type="text"
            value={fields.role}
            onChange={(e) => update("role", e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-heading mb-1.5">
            Company link
          </label>
          <input
            type="url"
            value={fields.companyLink}
            onChange={(e) => update("companyLink", e.target.value)}
            placeholder="https://company.com"
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading placeholder:text-description/60 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-heading mb-1.5">
            Employment type
          </label>
          <input
            type="text"
            value={fields.employmentType}
            onChange={(e) => update("employmentType", e.target.value)}
            placeholder="Internship, Full-time, Part-time..."
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading placeholder:text-description/60 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-heading mb-1.5">
            Duration
          </label>
          <input
            type="text"
            value={fields.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="3 months, 1+ years..."
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading placeholder:text-description/60 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-heading mb-1.5">
            Location
          </label>
          <input
            type="text"
            value={fields.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-heading mb-1.5">
            Start date
          </label>
          <input
            type="date"
            value={fields.startDate}
            onChange={(e) => update("startDate", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-heading mb-1.5">
            End date
          </label>
          <input
            type="date"
            value={fields.endDate}
            min={fields.startDate || undefined}
            onChange={(e) => update("endDate", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
          <p className="mt-1 text-xs text-description">
            Leave empty if this role is ongoing.
          </p>
        </div>
      </div>

      {/* Bullets */}
      <div>
        <label className="block text-sm font-bold text-heading mb-1.5">
          Description bullet points
        </label>
        <div className="space-y-2">
          {fields.bullets.map((bullet, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={bullet}
                onChange={(e) => updateBullet(i, e.target.value)}
                placeholder={`Bullet point ${i + 1}`}
                className="flex-1 px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading placeholder:text-description/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeBullet(i)}
                aria-label="Remove bullet"
                className="shrink-0 p-2.5 rounded-md border-2 border-heading text-accent hover:bg-heading/5 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addBullet}
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-highlight"
        >
          <FiPlus className="w-4 h-4" /> Add bullet point
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading
            shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827]
            hover:translate-x-[2px] hover:translate-y-[2px]
            active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
            transition-all duration-150 ease-out disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save changes" : "Add experience"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-md font-bold bg-primary border-2 border-heading"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
