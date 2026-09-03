import Image from "next/image";
import { readExperiences } from "@/lib/experienceStore";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const formatMonthYear = (value) => {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTimeSpent = (startDate, endDate) => {
  if (!startDate) return "";

  const start = new Date(`${startDate}T00:00:00`);
  const end = endDate ? new Date(`${endDate}T00:00:00`) : new Date();
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return "";
  }

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();
  if (end.getDate() < start.getDate()) months -= 1;
  months = Math.max(1, months);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];
  if (years) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (remainingMonths) {
    parts.push(`${remainingMonths} month${remainingMonths === 1 ? "" : "s"}`);
  }

  return parts.join(" ") || "1 month";
};

const experienceDateLabel = (entry) => {
  if (!entry.startDate) return entry.duration || "";

  const start = formatMonthYear(entry.startDate);
  const end = entry.endDate ? formatMonthYear(entry.endDate) : "Present";
  const timeSpent = formatTimeSpent(entry.startDate, entry.endDate);
  return [start && `${start} - ${end}`, timeSpent && `(${timeSpent})`]
    .filter(Boolean)
    .join(" ");
};

const ExperienceCard = ({ entry, isLast }) => (
  <div className="relative flex gap-5 sm:gap-6">
    {/* Timeline rail */}
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl border-2 border-heading bg-primary overflow-hidden shadow-[3px_3px_0_0_#111827] flex items-center justify-center p-1.5">
        {entry.companyLink ? (
          <a
            href={entry.companyLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${entry.company}`}
            className="relative w-full h-full flex items-center justify-center"
          >
            {entry.logo ? (
              <Image
                src={entry.logo}
                alt={entry.company}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-secondary text-xl text-highlight">
                {initials(entry.company)}
              </div>
            )}
          </a>
        ) : entry.logo ? (
          <Image
            src={entry.logo}
            alt={entry.company}
            fill
            className="object-contain"
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
        {entry.companyLink ? (
          <a
            href={entry.companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-heading hover:text-highlight transition-colors"
          >
            {entry.company}
          </a>
        ) : (
          <h3 className="text-xl font-bold text-heading">{entry.company}</h3>
        )}
        {entry.employmentType && (
          <span className="font-mono text-xs text-heading border-2 border-heading rounded-full px-3 py-0.5">
            {entry.employmentType}
          </span>
        )}
      </div>

      <p className="font-secondary text-highlight text-lg mb-1">{entry.role}</p>

      <p className="text-description text-sm mb-4">
        {[entry.location, experienceDateLabel(entry)]
          .filter(Boolean)
          .join(" · ")}
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
      className="w-full bg-[#EDEAE1] border-t-2 border-dashed border-gray-300"
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
