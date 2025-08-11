import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section";
import { CliOptionsSection } from "@/components/ui/cli-options-section";
import { TutorialSection } from "@/components/ui/tutorial-section";
import TemplatesSection from "@/components/ui/templates-section";
// import RoadmapSection from "@/components/ui/roadmap-section";
import CommunitySection from "@/components/ui/community-section";
import Footer from "@/components/ui/footer";
import ThreeBackground from "@/components/ui/three-background";
import FloatingCubes from "@/animinations/threejs/floatingcube";
// import InteractiveWaves from "@/animinations/threejs/interactivewaves";
import CodeRain from "@/animinations/threejs/code-rain";
import Quickstart from "@/components/ui/quickstart";
// import GeometricShapes from "@/animinations/threejs/geometric-shapes";
// import ParticleField from "@/animinations/threejs/particle-field";

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after all sections are loaded
    const { gsap } = window as any;
    if (gsap && gsap.ScrollTrigger) {
      const timer = setTimeout(() => {
        gsap.ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThreeBackground />
      <Navigation />
      <HeroSection />
      
      {/* Floating Cubes Animation */}
      <div className="relative">
        <FloatingCubes />
      </div>
      
      <FeaturesSection />

      <Quickstart />
      
      
      <TutorialSection />
      
      {/* Code Rain Animation */}
      <div className="relative">
        <CodeRain />
      </div>
      
      <CliOptionsSection />
      
            {/* Code Rain Animation */}
      <div className="relative">
        <CodeRain />
      </div>
      <TemplatesSection />
      
      
      {/* <RoadmapSection /> */}
      <CommunitySection />
      <Footer />
    </div>
  );
}
