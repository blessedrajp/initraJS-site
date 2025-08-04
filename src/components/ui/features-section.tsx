import { useRef } from "react";
import { Zap, Layers, Box, Code, Palette, Shield } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";

const features = [
  {
    icon: Zap,
    title: "Intelligent Code Generation",
    description: "Smart scaffolding that understands your project structure and generates optimized code."
  },
  {
    icon: Layers,
    title: "Ready-to-use Templates",
    description: "Pre-configured React, Next.js, and Node.js templates with best practices baked in."
  },
  {
    icon: Box,
    title: "Auto-generated Components",
    description: "Generate pages, APIs, and components with a single command."
  },
  {
    icon: Code,
    title: "TypeScript-first",
    description: "Full TypeScript support with intelligent type generation and validation."
  },
  {
    icon: Palette,
    title: "MUI Integrated",
    description: "Beautiful Material-UI components ready to use out of the box."
  },
  {
    icon: Shield,
    title: "Auth-ready",
    description: "JWT authentication and authorization patterns built-in."
  }
];

export default function FeaturesSection() {
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
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
    <section id="features" ref={sectionRef} className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient-orange">InitraJS</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by developers, for developers. Experience the future of fullstack development.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
