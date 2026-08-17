import About from "@/components/main_page_comps/About";
import Contact from "@/components/main_page_comps/ContactMe";
import Experience from "@/components/main_page_comps/Experience";
import Hero from "@/components/main_page_comps/Hero";
import Toolbox from "@/components/main_page_comps/Toolbox";
import Work from "@/components/main_page_comps/Work";

const Main = () => {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Toolbox />
      <Work />
      <Contact />
    </main>
  );
};

export default Main;
