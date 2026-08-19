"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import toast from "react-hot-toast";
import ExperienceForm from "./ExperienceForm";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const ExperienceDashboard = ({ initialData }) => {
  const [list, setList] = useState(initialData);
  const [mode, setMode] = useState(null); // null | "add" | { editing: entry }
  const [deletingId, setDeletingId] = useState(null);
  const formRef = useRef(null);

  // Scroll the form into view whenever we open add/edit.
  useEffect(() => {
    if (mode) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mode]);

  const refresh = async () => {
    const res = await fetch("/api/experience", { cache: "no-store" });
    if (res.ok) setList(await res.json());
  };

  const handleDone = async () => {
    setMode(null);
    await refresh();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this experience entry? This can't be undone.")) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to delete.");
        return;
      }
      toast.success("Experience deleted.");
      await refresh();
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const move = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;

    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    setList(next); // optimistic

    try {
      const res = await fetch("/api/experience/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: next.map((e) => e.id) }),
      });
      if (!res.ok) throw new Error();
    } catch {
      toast.error("Failed to reorder.");
      await refresh();
    }
  };

  return (
    <div className="min-h-screen bg-primary bg-dotted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="font-secondary text-highlight text-xl">
            admin · experience
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-10">
          Manage experience
        </h1>

        {(mode === "add" || mode?.editing) && (
          <div ref={formRef} className="mb-10">
            <ExperienceForm
              entry={mode?.editing}
              onDone={handleDone}
              onCancel={() => setMode(null)}
            />
          </div>
        )}

        {!mode && (
          <button
            onClick={() => setMode("add")}
            className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-md font-bold bg-heading text-primary border-2 border-heading
              shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
              transition-all duration-150 ease-out"
          >
            <FiPlus className="w-4 h-4" /> Add new experience
          </button>
        )}

        <div className="space-y-4">
          {list.length === 0 && (
            <p className="text-description">No experience entries yet.</p>
          )}

          {list.map((entry, i) => (
            <div
              key={entry.id}
              className="flex items-start gap-4 bg-primary border-2 border-heading rounded-2xl p-5 shadow-[4px_4px_0_0_#111827]"
            >
              <div className="relative w-14 h-14 shrink-0 rounded-xl border-2 border-heading bg-primary overflow-hidden">
                {entry.logo ? (
                  <Image
                    src={entry.logo}
                    alt={entry.company}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-secondary text-lg text-highlight">
                    {initials(entry.company)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-bold text-heading">{entry.company}</h3>
                  {entry.employmentType && (
                    <span className="font-mono text-xs text-description">
                      {entry.employmentType}
                    </span>
                  )}
                </div>
                <p className="font-secondary text-highlight">{entry.role}</p>
                <p className="text-description text-sm">
                  {[entry.location, entry.duration].filter(Boolean).join(" · ")}
                </p>
                <p className="text-description text-xs mt-1">
                  {entry.bullets?.length || 0} bullet point
                  {entry.bullets?.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 shrink-0">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="p-1.5 rounded border-2 border-heading disabled:opacity-30"
                >
                  <FiArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === list.length - 1}
                  aria-label="Move down"
                  className="p-1.5 rounded border-2 border-heading disabled:opacity-30"
                >
                  <FiArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => setMode({ editing: entry })}
                  aria-label="Edit"
                  className="p-2 rounded-md border-2 border-heading hover:bg-heading/5 transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  disabled={deletingId === entry.id}
                  aria-label="Delete"
                  className="p-2 rounded-md border-2 border-heading text-accent hover:bg-heading/5 transition-colors disabled:opacity-50"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDashboard;
