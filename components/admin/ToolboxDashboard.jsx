"use client";

import { useState } from "react";
import { FiPlus, FiArrowUp, FiArrowDown, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const emptyGroup = () => ({ id: crypto.randomUUID(), title: "", tags: "" });

const ToolboxDashboard = ({ initialData = [] }) => {
  const [items, setItems] = useState(
    initialData.map((item) => ({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
    })),
  );
  const [saving, setSaving] = useState(false);

  const updateItem = (index, field, value) => {
    setItems((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: field === "tags" ? value : value,
            }
          : item,
      ),
    );
  };

  const addItem = () => {
    setItems((current) => [...current, emptyGroup()]);
  };

  const removeItem = (index) => {
    setItems((current) => current.filter((_, i) => i !== index));
  };

  const move = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);

    try {
      const res = await fetch("/api/toolbox/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: next.map((item) => item.id) }),
      });
      if (!res.ok) throw new Error();
    } catch {
      toast.error("Failed to reorder toolbox.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = items.map((item) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
        title: item.title.trim(),
        tags: (Array.isArray(item.tags) ? item.tags.join(",") : item.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }));

      const res = await fetch("/api/toolbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to save toolbox.");
        return;
      }

      setItems(
        (data.items || payload).map((item) => ({
          ...item,
          tags: Array.isArray(item.tags)
            ? item.tags.join(", ")
            : item.tags || "",
        })),
      );
      toast.success("Toolbox saved.");
    } catch {
      toast.error("Failed to save toolbox.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-secondary text-highlight text-xl">
            admin · toolbox
          </p>
          <h2 className="text-3xl font-extrabold text-heading">
            Manage toolbox cards
          </h2>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading shadow-[4px_4px_0_0_#111827]"
        >
          <FiPlus className="w-4 h-4" /> Add section
        </button>
      </div>

      <div className="space-y-4">
        {items.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-heading bg-primary p-6 text-description">
            No toolbox sections yet.
          </div>
        )}

        {items.map((item, index) => (
          <div
            key={item.id || `${item.title}-${index}`}
            className="rounded-2xl border-2 border-heading bg-primary p-5 shadow-[4px_4px_0_0_#111827]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded border-2 border-heading disabled:opacity-30"
                  aria-label="Move toolbox section up"
                >
                  <FiArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-1.5 rounded border-2 border-heading disabled:opacity-30"
                  aria-label="Move toolbox section down"
                >
                  <FiArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 grid md:grid-cols-[1.1fr_1.8fr] gap-3">
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  placeholder="Section title"
                  className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
                />
                <input
                  type="text"
                  value={item.tags || ""}
                  onChange={(e) => updateItem(index, "tags", e.target.value)}
                  placeholder="Tags, separated by commas"
                  className="w-full px-3 py-2.5 rounded-md border-2 border-heading bg-primary text-heading focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-2.5 rounded-md border-2 border-heading text-accent hover:bg-heading/5"
                aria-label="Remove toolbox section"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save toolbox"}
      </button>
    </div>
  );
};

export default ToolboxDashboard;
