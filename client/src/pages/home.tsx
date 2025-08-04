import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section";
import { CliOptionsSection } from "@/components/ui/cli-options-section";
import TemplatesSection from "@/components/ui/templates-section";
import RoadmapSection from "@/components/ui/roadmap-section";
import CommunitySection from "@/components/ui/community-section";
import Footer from "@/components/ui/footer";
import ThreeBackground from "@/components/ui/three-background";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThreeBackground />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <CliOptionsSection />
      <TemplatesSection />
      <RoadmapSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
