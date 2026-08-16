const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-[#EDEAE1] border-t-2 border-dashed border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <p className="font-secondary text-center text-highlight text-xl mb-3">
          a bit about me
        </p>
        <h2 className="text-4xl md:text-5xl text-center font-extrabold text-gray-900 mb-10 leading-tight">
          Got something worth building?
        </h2>
        <p className="text-center">
          I'm always up for an interesting problem. The fastest way to reach me
          is email — or find me on any of the usual places.
        </p>
      </div>
    </section>
  );
};

export default About;
