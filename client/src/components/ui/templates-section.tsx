import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@/hooks/use-gsap";

const templates = [
  {
    name: "React Template",
    description: "Vite + MUI + Redux Toolkit + TypeScript",
    features: [
      "Hot Module Replacement",
      "Component Library Ready", 
      "State Management",
      "Testing Setup"
    ],
    iconBg: "bg-primary/20",
    iconText: "React",
    accent: "border-primary/30"
  },
  {
    name: "Next.js Template",
    description: "App Router + AuthContext + API Routes",
    features: [
      "Server-Side Rendering",
      "Authentication Ready",
      "API Integration", 
      "SEO Optimized"
    ],
    iconBg: "bg-white/10",
    iconText: "Next",
    accent: "border-white/20"
  },
  {
    name: "Node.js Backend",
    description: "Express MVC + JWT + TypeScript + DTOs",
    features: [
      "MVC Architecture",
      "JWT Authentication",
      "Database Ready",
      "API Documentation"
    ],
    iconBg: "bg-primary/20",
    iconText: "Node",
    accent: "border-primary/30"
  }
];

export default function TemplatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      window.gsap.fromTo(cardsRef.current?.children, 
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section id="templates" ref={sectionRef} className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Production-Ready <span className="text-gradient-orange">Templates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with battle-tested templates optimized for modern development
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div key={index} className={`glass-effect p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105 border ${template.accent}`}>
              <div className={`w-16 h-16 ${template.iconBg} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <span className="text-foreground font-bold text-sm">{template.iconText}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{template.name}</h3>
              <p className="text-muted-foreground mb-6">{template.description}</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                {template.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
              <Button 
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                variant="outline"
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
