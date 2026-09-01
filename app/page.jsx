import About from "@/components/main_page_comps/About";
import Contact from "@/components/main_page_comps/ContactMe";
import Experience from "@/components/main_page_comps/Experience";
import Hero from "@/components/main_page_comps/Hero";
import Toolbox from "@/components/main_page_comps/Toolbox";
import Work from "@/components/main_page_comps/Work";
import { readSiteSettings } from "@/lib/contentStore";
import { readProjects } from "@/lib/workStore";

const Main = async () => {
  const siteSettings = await readSiteSettings();
  const projects = await readProjects();
  const githubUrl =
    siteSettings.socialLinks?.find((link) => link.label === "GitHub")?.url ||
    "";

  return (
    <main>
      <Hero />
      <About />
      <Toolbox />
      <Experience />
      <Work initialData={projects} githubUrl={githubUrl} />
      <Contact siteSettings={siteSettings} />
    </main>
  );
};

export default Main;
