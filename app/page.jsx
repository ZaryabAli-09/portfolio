import About from "@/components/main_page_comps/About";
import Contact from "@/components/main_page_comps/ContactMe";
import Hero from "@/components/main_page_comps/Hero";
import Work from "@/components/main_page_comps/Work";

const Main = () => {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Contact />
    </main>
  );
};

export default Main;
