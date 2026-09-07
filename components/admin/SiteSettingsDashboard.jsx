"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const emptyLink = () => ({ label: "", url: "" });
const emptyStat = () => ({ value: "", label: "" });

const SiteSettingsDashboard = ({ initialData }) => {
  const [fields, setFields] = useState({
    name: initialData?.name || "",
    profileImage: initialData?.profileImage || "/zaryab.png",
    favicon: initialData?.favicon || "/favicon.png",
    cvUrl: initialData?.cvUrl || "",
    role: initialData?.role || "",
    heroSince: initialData?.heroSince || "",
    heroDescription: initialData?.heroDescription || "",
    aboutTitle: initialData?.aboutTitle || "",
    aboutParagraphs: initialData?.aboutParagraphs?.join("\n\n") || "",
    aboutStats: initialData?.aboutStats?.length
      ? initialData.aboutStats
      : [emptyStat()],
    email: initialData?.email || "",
    socialLinks: initialData?.socialLinks?.length
      ? initialData.socialLinks
      : [emptyLink()],
  });
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState({
    profileImage: null,
    favicon: null,
    cv: null,
  });

  const updateField = (key, value) =>
    setFields((current) => ({ ...current, [key]: value }));

  const updateSocialLink = (index, field, value) => {
    setFields((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      ),
    }));
  };

  const addSocialLink = () =>
    setFields((current) => ({
      ...current,
      socialLinks: [...current.socialLinks, emptyLink()],
    }));

  const removeSocialLink = (index) => {
    setFields((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const updateStat = (index, field, value) => {
    setFields((current) => ({
      ...current,
      aboutStats: current.aboutStats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat,
      ),
    }));
  };

  const addStat = () =>
    setFields((current) => ({
      ...current,
      aboutStats: [...current.aboutStats, emptyStat()],
    }));

  const removeStat = (index) => {
    setFields((current) => ({
      ...current,
      aboutStats: current.aboutStats.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...fields,
        heroSince: fields.heroSince.trim(),
        aboutParagraphs: fields.aboutParagraphs
          .split(/\n\s*\n/)
          .map((item) => item.trim())
          .filter(Boolean),
        aboutStats: fields.aboutStats
          .filter((stat) => stat.value.trim() || stat.label.trim())
          .map((stat) => ({
            value: stat.value.trim(),
            label: stat.label.trim(),
          })),
        socialLinks: fields.socialLinks.filter(
          (link) => link.label.trim() || link.url.trim(),
        ),
      };

      const form = new FormData();
      form.append("settings", JSON.stringify(payload));
      Object.entries(files).forEach(([key, file]) => {
        if (file) form.append(key, file);
      });

      const res = await fetch("/api/site-settings", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to save settings.");
        return;
      }

      toast.success("Site settings updated.");
      setFiles({ profileImage: null, favicon: null, cv: null });
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="font-secondary text-highlight text-xl">
          admin · site settings
        </p>
        <h2 className="text-3xl font-extrabold text-heading">
          Edit portfolio metadata
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827]">
        <div className="md:col-span-2 grid md:grid-cols-3 gap-4">
          {[
            [
              "profileImage",
              "Profile image",
              "image/png,image/jpeg,image/webp",
            ],
            ["favicon", "Favicon", "image/png,image/x-icon"],
            ["cv", "CV", "application/pdf"],
          ].map(([key, label, accept]) => (
            <label key={key} className="space-y-1.5">
              <span className="text-sm font-bold text-heading">{label}</span>
              <input
                type="file"
                accept={accept}
                onChange={(e) =>
                  setFiles((current) => ({
                    ...current,
                    [key]: e.target.files?.[0] || null,
                  }))
                }
                className="w-full text-sm text-heading"
              />
              <span className="block text-xs text-gray-600 truncate">
                Current: {key === "cv" ? fields.cvUrl : fields[key]}
              </span>
            </label>
          ))}
        </div>
        <label className="space-y-1.5">
          <span className="text-sm font-bold text-heading">Name</span>
          <input
            value={fields.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-bold text-heading">Role</span>
          <input
            value={fields.role}
            onChange={(e) => updateField("role", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-bold text-heading">Hero since</span>
          <input
            value={fields.heroSince}
            onChange={(e) => updateField("heroSince", e.target.value)}
            placeholder="e.g. 2021"
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 space-y-1.5">
          <span className="text-sm font-bold text-heading">
            Hero description
          </span>
          <textarea
            value={fields.heroDescription}
            onChange={(e) => updateField("heroDescription", e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none resize-none"
          />
        </label>
        <label className="md:col-span-2 space-y-1.5">
          <span className="text-sm font-bold text-heading">About title</span>
          <input
            value={fields.aboutTitle}
            onChange={(e) => updateField("aboutTitle", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 space-y-1.5">
          <span className="text-sm font-bold text-heading">
            About paragraphs
          </span>
          <textarea
            value={fields.aboutParagraphs}
            onChange={(e) => updateField("aboutParagraphs", e.target.value)}
            rows={6}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none resize-none"
          />
        </label>

        <div className="md:col-span-2 rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827] space-y-4">
          <h3 className="text-lg font-extrabold text-heading">About stats</h3>
          {fields.aboutStats.map((stat, index) => (
            <div
              key={`${stat.label || "stat"}-${index}`}
              className="grid md:grid-cols-[1fr_1.6fr_auto] gap-3 items-center"
            >
              <input
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
                placeholder="Value (e.g. 2021)"
                className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
              />
              <input
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
                placeholder="Label (e.g. Started coding)"
                className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="px-3 py-2 rounded-md border-2 border-heading text-accent"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addStat}
            className="px-4 py-2 rounded-md border-2 border-heading font-bold text-heading"
          >
            Add stat
          </button>
        </div>

        <label className="md:col-span-2 space-y-1.5">
          <span className="text-sm font-bold text-heading">Email</span>
          <input
            value={fields.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
          />
        </label>
      </div>

      <div className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827] space-y-4">
        <h3 className="text-lg font-extrabold text-heading">Social links</h3>
        {fields.socialLinks.map((link, index) => (
          <div
            key={`${link.label || "link"}-${index}`}
            className="grid md:grid-cols-[180px_1fr_auto] gap-3 items-center"
          >
            <input
              value={link.label}
              onChange={(e) => updateSocialLink(index, "label", e.target.value)}
              placeholder="Label"
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
            />
            <input
              value={link.url}
              onChange={(e) => updateSocialLink(index, "url", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeSocialLink(index)}
              className="px-3 py-2 rounded-md border-2 border-heading text-accent"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSocialLink}
          className="px-4 py-2 rounded-md border-2 border-heading font-bold text-heading"
        >
          Add social link
        </button>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save settings"}
      </button>
    </div>
  );
};

export default SiteSettingsDashboard;
