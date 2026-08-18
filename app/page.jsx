import About from "@/components/main_page_comps/About";
import Contact from "@/components/main_page_comps/ContactMe";
import Experience from "@/components/main_page_comps/Experience";
import Hero from "@/components/main_page_comps/Hero";
import Toolbox from "@/components/main_page_comps/Toolbox";
import Work from "@/components/main_page_comps/Work";
import { readSiteSettings } from "@/lib/contentStore";

const Main = async () => {
  const siteSettings = await readSiteSettings();

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Toolbox />
      <Work />
      <Contact siteSettings={siteSettings} />
    </main>
  );
};

export default Main;
