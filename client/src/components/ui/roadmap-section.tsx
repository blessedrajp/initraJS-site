import { useRef } from "react";
import { Clock, Lightbulb } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";

const inProgressItems = [
  {
    title: "Prisma/MongoDB Integration",
    description: "Advanced database scaffolding with ORM support",
    progress: 75
  },
  {
    title: "Docker Templates",
    description: "Containerization support for all templates",
    progress: 60
  }
];

const plannedItems = [
  {
    title: "GraphQL API",
    description: "Auto-generate GraphQL schemas and resolvers"
  },
  {
    title: "PWA Support",
    description: "Progressive Web App templates and tooling"
  },
  {
    title: "CLI Plugins",
    description: "Extensible plugin system for custom generators"
  },
  {
    title: "Monorepo Setup",
    description: "Multi-package repository scaffolding"
  }
];

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      // Title animation
      window.gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      window.gsap.fromTo(contentRef.current?.children, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Progress bar animations
      window.gsap.fromTo(".progress-bar", 
        { width: "0%" },
        {
          width: (index: number, target: Element) => target.getAttribute("data-progress") + "%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".progress-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-orange">Roadmap</span> & Future
          </h2>
          <p className="text-xl text-muted-foreground">
            See what's coming next in InitraJS development
          </p>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* In Progress */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              In Progress
            </h3>
            <div className="grid md:grid-cols-2 gap-6 progress-container">
              {inProgressItems.map((item, index) => (
                <div key={index} className="glass-effect p-6 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="progress-bar bg-primary h-2 rounded-full transition-all duration-1000"
                      data-progress={item.progress}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 inline-block">{item.progress}% complete</span>
                </div>
              ))}
            </div>
          </div>

          {/* Planned */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 mr-3" />
              Planned Features
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {plannedItems.map((item, index) => (
                <div key={index} className="glass-effect p-6 rounded-lg opacity-75 hover:opacity-100 transition-opacity">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
