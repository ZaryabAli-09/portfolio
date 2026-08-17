import { TOOLBOX } from "@/lib/constants";

// Alternate a tiny rotation on cards for the hand-drawn, "pinned to a board"
// feel used across the rest of the site (see Hero/About).
const ROTATIONS = [
  "-rotate-[0.6deg]",
  "rotate-[0.6deg]",
  "-rotate-[0.4deg]",
  "rotate-[0.4deg]",
  "-rotate-[0.6deg]",
  "rotate-[0.6deg]",
];

const ToolboxCard = ({ category, rotation }) => (
  <div
    className={`bg-primary border-2 border-heading rounded-2xl p-6 shadow-[6px_6px_0_0_#111827] ${rotation}`}
  >
    <div className="flex items-center gap-3 mb-5">
      <span className={`w-2.5 h-2.5 rounded-full ${category.dot}`} />
      <h3 className="font-secondary text-2xl text-heading">{category.title}</h3>
    </div>

    <div className="flex flex-wrap gap-2">
      {category.items.map((item) => (
        <span
          key={item}
          className="font-mono text-sm text-heading border-2 border-heading rounded-full px-3 py-1 bg-primary"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Toolbox = () => {
  return (
    <section
      id="toolbox"
      className="w-full bg-primary bg-dotted border-b-2 border-dashed border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <p className="font-secondary text-highlight text-xl mb-2">
          the toolbox
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-12 leading-tight">
          What I work with
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLBOX.map((category, i) => (
            <ToolboxCard
              key={category.title}
              category={category}
              rotation={ROTATIONS[i % ROTATIONS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolbox;
