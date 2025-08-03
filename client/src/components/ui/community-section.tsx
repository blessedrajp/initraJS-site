import { useRef } from "react";
import { Github, MessageCircle, Twitter, Heart } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";

const communityLinks = [
  {
    name: "GitHub Issues",
    description: "Report bugs and request features",
    icon: Github,
    href: "https://github.com/initrajs/initrajs/issues"
  },
  {
    name: "Discussions",
    description: "Share ideas and get help",
    icon: MessageCircle,
    href: "https://github.com/initrajs/initrajs/discussions"
  },
  {
    name: "Twitter",
    description: "Follow us for updates",
    icon: Twitter,
    href: "https://twitter.com/initrajs"
  },
  {
    name: "Sponsor",
    description: "Support the project",
    icon: Heart,
    href: "https://github.com/sponsors/initrajs"
  }
];

export default function CommunitySection() {
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
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="text-gradient-orange">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with other developers, contribute to the project, and help shape the future of InitraJS
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group text-center hover:scale-105"
            >
              <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <link.icon className="w-8 h-8 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{link.name}</h3>
              <p className="text-muted-foreground text-sm">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
