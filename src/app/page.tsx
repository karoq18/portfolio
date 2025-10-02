import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Footer from "@/components/sections/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WaveSeparator from "@/components/layout/WaveSeparator";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <div id="about" className="section-anchor" />
      <AboutSection />

      <section className="relative">
        
         <div id="skills" className="section-anchor" />
        <div className="xl:sticky xl:top-[var(--header-h)] xl:section-screen xl:z-20">
          <SkillsSection />
        </div>

        <div id="projects" className="section-anchor" />
        <div className="xl:sticky xl:top-[var(--header-h)] min-h-[calc(100svh-var(--header-h))] xl:z-30">
          <ProjectsSection />
        </div>
        
      </section>
      
      <WaveSeparator color="var(--color-section)" className="relative z-40" />
      <ContactSection />    
      <Footer />       
      <MobileNav />
    </main>
  );
}
