import Image from "next/image";
import { readExperiences } from "@/lib/experienceStore";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const ExperienceCard = ({ entry, isLast }) => (
  <div className="relative flex gap-5 sm:gap-6">
    {/* Timeline rail */}
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl border-2 border-heading bg-primary overflow-hidden shadow-[3px_3px_0_0_#111827]">
        {entry.logo ? (
          <Image
            src={entry.logo}
            alt={entry.company}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-secondary text-xl text-highlight">
            {initials(entry.company)}
          </div>
        )}
      </div>
      {!isLast && (
        <span className="w-0.5 flex-1 mt-2 border-l-2 border-dashed border-gray-300" />
      )}
    </div>

    {/* Content */}
    <div className={isLast ? "pb-0" : "pb-12"}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
        <h3 className="text-xl font-bold text-heading">{entry.company}</h3>
        {entry.employmentType && (
          <span className="font-mono text-xs text-heading border-2 border-heading rounded-full px-3 py-0.5">
            {entry.employmentType}
          </span>
        )}
      </div>

      <p className="font-secondary text-highlight text-lg mb-1">{entry.role}</p>

      <p className="text-description text-sm mb-4">
        {[entry.location, entry.duration].filter(Boolean).join(" · ")}
      </p>

      {entry.bullets?.length > 0 && (
        <ul className="space-y-2">
          {entry.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-description text-sm sm:text-base leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const Experience = async () => {
  const experiences = await readExperiences();

  if (!experiences.length) return null;

  return (
    <section
      id="experience"
      className="w-full bg-primary bg-dotted border-b-2 border-dashed border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <p className="font-secondary text-highlight text-xl mb-2">
          the journey
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-12 leading-tight">
          Where I&apos;ve worked
        </h2>

        <div className="max-w-3xl">
          {experiences.map((entry, i) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
