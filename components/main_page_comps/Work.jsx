"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

const ROTATIONS = ["-rotate-[0.5deg]", "rotate-[0.5deg]", "-rotate-[0.3deg]"];

const FILTERS = [
  { key: "work", label: "At work" },
  { key: "side", label: "On the side" },
  { key: "learning", label: "Initial Learning" },
  { key: "fyp", label: "FYP Research" },
];

const CATEGORY_LABELS = {
  work: "At work",
  side: "On the side",
  learning: "Initial Learning",
  fyp: "FYP Research",
};

const ProjectCard = ({ project, rotation }) => {
  const router = useRouter();
  const isExternal = project.link?.startsWith("http");
  const hasLiveLink = Boolean(project.link?.trim());

  return (
    <div
      onClick={() => router.push(`/work/${project.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(`/work/${project.id}`);
        }
      }}
      role="link"
      tabIndex={0}
      className={cn(
        "flex cursor-pointer flex-col bg-primary border-2 border-heading rounded-2xl overflow-hidden shadow-[6px_6px_0_0_#111827] transition-transform hover:-translate-y-1",
        rotation,
      )}
    >
      <div className="relative h-48 w-full border-b-2 border-heading bg-gray-100">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-highlight/20 to-secondary/20">
            <span className="font-secondary text-highlight text-lg">{project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-lg font-bold text-heading leading-snug">{project.title}</h3>
        </div>

        <p className="font-secondary text-highlight text-lg mb-3">
          {project.role} · {project.period}
        </p>
        <p className="text-description text-sm mb-3">
          {CATEGORY_LABELS[project.category] || "At work"}
        </p>

        <p className="text-description text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {Array.isArray(project.tags) &&
            project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-heading border-2 border-heading rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
        </div>

        {hasLiveLink && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              window.open(project.link, "_blank", "noopener,noreferrer");
            }}
            className="mt-5 inline-flex w-fit items-center gap-2 self-start border-2 border-heading rounded-md bg-primary px-3 py-2 text-sm font-bold text-heading"
          >
            See in action
            <FiArrowUpRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const Work = ({ initialData = [], githubUrl = "" }) => {
  const [active, setActive] = useState("work");

  const visibleProjects = initialData.filter(
    (project) => Array.isArray(project.tags) && project.tags.length > 0,
  );

  const counts = {
    work: visibleProjects.filter((p) => p.category === "work").length,
    side: visibleProjects.filter((p) => p.category === "side").length,
    learning: visibleProjects.filter((p) => p.category === "learning").length,
    fyp: visibleProjects.filter((p) => p.category === "fyp").length,
  };

  const filtered =
    active === "all"
      ? visibleProjects
      : visibleProjects.filter((p) => p.category === active);

  return (
    <section
      id="work"
      className="w-full bg-primary bg-dotted border-b-2 border-dashed border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <p className="font-secondary text-highlight text-xl mb-2">selected work</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-10 leading-tight">
          Things I&apos;ve built
        </h2>

        <div className="flex flex-wrap gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={cn(
                "px-4 py-2 rounded-full border-2 border-heading text-sm font-bold transition-colors",
                active === f.key
                  ? "bg-heading text-primary"
                  : "bg-primary text-heading hover:bg-heading/5",
              )}
            >
              {f.label} ({counts[f.key] || 0})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              rotation={ROTATIONS[i % ROTATIONS.length]}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-heading bg-primary p-8 text-center text-description">
            No projects found in this section yet.
          </div>
        )}

        {githubUrl && (
          <div className="flex justify-center mt-14">
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-bold bg-primary border-2 border-heading
                shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827]
                hover:translate-x-[2px] hover:translate-y-[2px]
                active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                transition-all duration-150 ease-out"
            >
              See all {visibleProjects.length} projects
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
