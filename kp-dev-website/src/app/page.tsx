import { ScrollCanvasRenderer } from "@/components/ScrollCanvasRenderer";
import { ClubHero } from "@/components/ClubHero";
import { StatsSection } from "@/components/StatsSection";
import { EventsSection } from "@/components/EventsSection";
import { ProjectsAccordion } from "@/components/ProjectsAccordion";
import { MarqueeSection } from "@/components/MarqueeSection";
import { MainFooter } from "@/components/MainFooter";

export const metadata = {
  title: "KAMAND PROMPT | IIT MANDI DEVCELL",
  description: "The Programming Club of IIT Mandi"
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white/20 relative">
      <ScrollCanvasRenderer />
      
      {/* Static Site Content Appended Below Scroll Sequence */}
      <div className="relative z-10 w-full bg-[#050505] mt-[-1px]">
          <ClubHero />
          <StatsSection />
          <EventsSection />
          <ProjectsAccordion />
          <MarqueeSection />
          <MainFooter />
      </div>
    </main>
  );
}
