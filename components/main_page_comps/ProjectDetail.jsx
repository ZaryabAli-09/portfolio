import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

const renderSectionContent = (section) => {
  if (!section?.content) return null;

  if (section.type === "bullets") {
    const bullets = section.content
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!bullets.length) return null;

    return (
      <ul className="space-y-2 pl-5 text-base leading-relaxed text-description list-disc">
        {bullets.map((item, index) => (
          <li key={`${section.id || "section"}-${index}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-base leading-relaxed text-description whitespace-pre-line">
      {section.content}
    </p>
  );
};

const ProjectDetail = ({ project }) => {
  const galleryImages = Array.isArray(project?.galleryImages)
    ? project.galleryImages.filter(Boolean)
    : [];

  return (
    <main className="bg-primary bg-dotted min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-heading transition-colors hover:text-highlight"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to work
        </Link>

        <article>
          <div className="mb-6">
            <p className="font-secondary text-highlight text-lg">
              {project.role || "Project"}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-heading sm:text-5xl">
              {project.title}
            </h1>{" "}
            {project.description ? (
              <p className="text-base my-4 leading-relaxed text-description whitespace-pre-line">
                {project.description}
              </p>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-[22px] border-2 border-heading bg-gray-100">
            {project.image ? (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-highlight/20 to-secondary/20">
                <span className="font-secondary text-2xl text-heading">
                  {project.title}
                </span>
              </div>
            )}
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-2xl border-2 border-heading bg-gray-100"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {project.link && (
            <Link
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={
                project.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="flex items-center gap-2 text-highlight hover:underline font-bold my-2"
            >
              See in action
              <FiExternalLink className="w-4 h-4" />
            </Link>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {Array.isArray(project.tags) && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-heading px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-heading"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {Array.isArray(project.detailSections) &&
            project.detailSections.length > 0 && (
              <div className="mt-10 space-y-8">
                {project.detailSections.map((section, index) => (
                  <section
                    key={section.id || `${project.id}-section-${index}`}
                    className="border-t border-heading/40 pt-6"
                  >
                    {section.heading && (
                      <h3 className="mb-4 text-2xl font-black text-heading">
                        {section.heading}
                      </h3>
                    )}
                    {renderSectionContent(section)}
                  </section>
                ))}
              </div>
            )}
        </article>
      </div>
    </main>
  );
};

export default ProjectDetail;
