const stats = [
  { value: "2021", label: "Writing code since" },
  { value: "1+ yr", label: "Internship & freelance experience" },
  { value: "Web + Mobile", label: "Full-stack MERN focus" },
];

const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-[#EDEAE1] border-t-2 border-dashed border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <p className="font-secondary text-secondary text-xl mb-3">
          a bit about me
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 leading-tight">
          Full-stack by trade, curious by nature.
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          <div className="md:col-span-2 space-y-5 text-gray-700 text-lg leading-relaxed">
            <p>
              I&apos;m a full-stack developer finishing my Software Engineering
              degree at Iqra National University, Peshawar. I started writing
              code in 2021 and have been building with JavaScript, React and the
              MERN stack ever since.
            </p>
            <p>
              These days I focus on Next.js, React and Node.js — building clean,
              production-ready web and mobile products. I&apos;ve worked as a
              backend-focused engineer at a software house, taken on freelance
              full-stack and AI-integration projects, and led my own final year
              project: a multi-vendor fashion marketplace with real-time chat,
              AI recommendations and a React Native mobile app.
            </p>
            <p>
              Outside of coursework and client work, I like exploring new tools
              in the JS ecosystem, tightening up my Figma-to-code workflow, and
              shipping small side projects just to keep learning.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-4 rounded-lg border-2 border-gray-900 bg-primary px-5 py-4 shadow-[4px_4px_0_0_#111827]"
              >
                <span className="inline-block -rotate-2 rounded bg-secondary/30 px-2 py-0.5 text-2xl font-extrabold text-gray-900">
                  {stat.value}
                </span>
                <span className="font-secondary text-gray-600 text-right text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
