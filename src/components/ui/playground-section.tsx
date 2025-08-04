import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@/hooks/use-gsap";

const commands = [
  {
    command: "initrajs c UserProfile --type component",
    output: "✨ Generated UserProfile component",
    files: [
      "📁 src/components/UserProfile/",
      "├── index.tsx",
      "├── UserProfile.tsx",
      "├── UserProfile.test.tsx",
      "└── UserProfile.styles.ts"
    ]
  },
  {
    command: "initrajs page dashboard --auth",
    output: "✨ Generated protected dashboard page",
    files: [
      "📁 src/pages/dashboard/",
      "├── index.tsx (with auth guard)",
      "├── Dashboard.tsx",
      "└── dashboard.test.tsx"
    ]
  },
  {
    command: "initrajs api user --crud",
    output: "✨ Generated CRUD API endpoints",
    files: [
      "📁 backend/src/api/user/",
      "├── user.controller.ts",
      "├── user.service.ts",
      "├── user.model.ts",
      "└── user.routes.ts"
    ]
  }
];

const codeExample = `import React from 'react';
import { Avatar, Card, Typography } from '@mui/material';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Avatar src={user.avatar} />
      <Typography variant="h5">{user.name}</Typography>
      <Typography color="textSecondary">{user.email}</Typography>
    </Card>
  );
};`;

export default function PlaygroundSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(0);
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
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  // Auto-cycle through commands
  useGSAP(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setCurrentCommand((prev) => (prev + 1) % commands.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section id="playground" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try <span className="text-gradient-orange">InitraJS</span> Live
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the power of intelligent code generation
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Terminal Simulator */}
          <div className="terminal-effect rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-muted-foreground text-sm">~/my-project</span>
            </div>
            
            <div className="font-mono text-sm space-y-4">
              {commands.map((cmd, index) => (
                <div 
                  key={index} 
                  className={`transition-all duration-500 ${
                    index === currentCommand ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <span className="text-foreground">{cmd.command}</span>
                  </div>
                  <div className="text-green-400 pl-4 mt-1">
                    {cmd.output}
                  </div>
                  <div className="text-muted-foreground pl-4 text-xs mt-1">
                    {cmd.files.map((file, fileIndex) => (
                      <div key={fileIndex}>{file}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Command indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {commands.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentCommand ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentCommand(index)}
                />
              ))}
            </div>
          </div>

          {/* Generated Code Preview */}
          <div className="terminal-effect rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm">UserProfile.tsx</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary transition-colors h-8 w-8"
                onClick={() => copyToClipboard(codeExample)}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground whitespace-pre-wrap">
{`import React from 'react';
import { Avatar, Card, Typography } from '@mui/material';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Avatar src={user.avatar} />
      <Typography variant="h5">{user.name}</Typography>
      <Typography color="textSecondary">{user.email}</Typography>
    </Card>
  );
};`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
