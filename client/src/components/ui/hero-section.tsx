import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Github, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@/hooks/use-gsap";

export default function HeroSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({ delay: 0.5 });
      
      // Animate logo
      tl.fromTo(logoRef.current, 
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      )
      // Animate title
      .fromTo(titleRef.current?.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      )
      // Animate subtitle
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      // Animate buttons
      .fromTo(buttonsRef.current?.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      )
      // Animate terminal
      .fromTo(terminalRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

      // Floating animations for background elements
      window.gsap.to(".floating-element", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });
    }
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Command copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the command manually",
        variant: "destructive",
      });
    }
  };

  const handleGetStarted = () => {
    const element = document.querySelector("#playground");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-16">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full floating-element opacity-40"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full floating-element opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary rounded-full floating-element opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-white rounded-full floating-element opacity-15"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full floating-element opacity-35"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full floating-element opacity-25"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Logo */}
        <div ref={logoRef} className="w-32 h-32 mx-auto mb-12 relative">
          <img 
            src="/attached_assets/Untitled design_1754249144069.png" 
            alt="InitraJS Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Headline */}
        <div ref={titleRef} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight">
            <span className="block text-white">InitraJS</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-gradient-orange mb-2">
            Fullstack Scaffolding CLI
          </h2>
        </div>

        {/* Subheading */}
        <div ref={subtitleRef} className="mb-12 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-white/80 mb-4 font-light leading-relaxed">
            Zero Configuration. Maximum Productivity.
          </p>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Build React, Next.js, and Node.js applications in{" "}
            <span className="text-primary font-semibold bg-primary/10 px-2 py-1 rounded">minutes</span>, not hours.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 orange-glow-hover"
            onClick={handleGetStarted}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-4 glass-effect hover:bg-white/10 border-border hover:border-primary transition-all duration-300"
            asChild
          >
            <a href="https://github.com/initrajs/initrajs" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Installation Banner */}
        <div ref={terminalRef} className="terminal-effect rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors h-8 w-8"
              onClick={() => copyToClipboard("npm install -g initrajs")}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <div className="font-mono text-left">
            <div className="text-primary flex items-center">
              <span className="mr-2">$</span>
              <span className="text-foreground">npm install -g initrajs</span>
            </div>
            <div className="text-primary flex items-center mt-2">
              <span className="mr-2">$</span>
              <span className="text-foreground">npx initrajs init</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
