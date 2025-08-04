import { useRef } from "react";
import { useGSAP } from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Zap, Code2, Server, Database, Copy } from "lucide-react";

const frontendExamples = {
  init: {
    title: "Initialize Project",
    commands: ["npx initrajs init"]
  },
  components: {
    title: "Generate Components",
    commands: [
      "initrajs c Header",
      'initrajs c Button --props "text,onClick,variant" --css --test',
      "initrajs c Layout --layout --ts",
      "initrajs c ProductCard --server --css",
      'initrajs c UserModal --client --props "isOpen,onClose" --js --test'
    ]
  },
  pages: {
    title: "Generate Pages",
    commands: [
      "initrajs page Home --react --css --test",
      "initrajs page Dashboard --next --ts --css",
      'initrajs page Profile --next --path "app/user" --test',
      "initrajs page About --react --js --css --test"
    ]
  }
};

const backendExamples = {
  api: {
    title: "Generate Full API (Controller, Service, Model, DTO, Routes)",
    commands: [
      "initrajs api User",
      "initrajs api Product --ts"
    ]
  },
  routes: {
    title: "Generate Routes",
    commands: [
      "initrajs route User",
      "initrajs route ProductRoutes --ts"
    ]
  },
  controllers: {
    title: "Generate Controller",
    commands: [
      "initrajs ctrl User",
      "initrajs controller Product --ts"
    ]
  },
  services: {
    title: "Generate Service",
    commands: [
      "initrajs svc User",
      "initrajs service ProductService --ts"
    ]
  },
  models: {
    title: "Generate Model",
    commands: [
      "initrajs m User",
      "initrajs model ProductModel --ts"
    ]
  },
  middleware: {
    title: "Generate Middleware",
    commands: [
      "initrajs mw AuthMiddleware",
      "initrajs middleware JwtAuth --ts --jwt"
    ]
  }
};

const additionalOptions = [
  { option: "--css", description: "Generate CSS/SCSS file" },
  { option: "--test", description: "Generate test file" },
  { option: "--story", description: "Generate Storybook story (components only)" },
  { option: "--path", description: "Specify custom path" },
  { option: "--ts", description: "Generate TypeScript files" },
  { option: "--js", description: "Generate JavaScript files" }
];

export function TutorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;
    
    const { gsap } = window as any;
    if (!gsap) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(contentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const CommandCard = ({ title, commands }: { title: string; commands: string[] }) => (
    <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {commands.map((command, index) => (
          <div key={index} className="relative group">
            <div className="bg-black/30 rounded-lg p-3 border border-white/10 pr-12">
              <code className="text-sm text-white/90 font-mono break-all">
                {command}
              </code>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
              onClick={() => copyToClipboard(command)}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <section ref={sectionRef} id="tutorial" className="py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Tutorial & Examples
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            InitraJS CLI Usage Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to use InitraJS CLI with practical examples for both frontend and backend development
          </p>
        </div>

        <div ref={contentRef}>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="frontend" className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                Backend
              </TabsTrigger>
              <TabsTrigger value="options" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-primary">Frontend (React Components & Pages)</h3>
                <p className="text-muted-foreground">Generate components, pages, and layouts for React and Next.js applications</p>
              </div>
              
              <div className="grid gap-6">
                <CommandCard title={frontendExamples.init.title} commands={frontendExamples.init.commands} />
                <CommandCard title={frontendExamples.components.title} commands={frontendExamples.components.commands} />
                <CommandCard title={frontendExamples.pages.title} commands={frontendExamples.pages.commands} />
              </div>
            </TabsContent>

            <TabsContent value="backend" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-primary">Backend (API, Models, Controllers, Services, Routes, Middleware)</h3>
                <p className="text-muted-foreground">Create complete backend architectures with controllers, services, models, and middleware</p>
              </div>
              
              <div className="grid gap-6">
                <CommandCard title={backendExamples.api.title} commands={backendExamples.api.commands} />
                <div className="grid md:grid-cols-2 gap-6">
                  <CommandCard title={backendExamples.routes.title} commands={backendExamples.routes.commands} />
                  <CommandCard title={backendExamples.controllers.title} commands={backendExamples.controllers.commands} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <CommandCard title={backendExamples.services.title} commands={backendExamples.services.commands} />
                  <CommandCard title={backendExamples.models.title} commands={backendExamples.models.commands} />
                </div>
                <CommandCard title={backendExamples.middleware.title} commands={backendExamples.middleware.commands} />
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-primary">📝 Additional Options</h3>
                <p className="text-muted-foreground">Common flags and options to customize your generated files</p>
              </div>
              
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Database className="w-6 h-6 text-primary" />
                    Available Options
                  </CardTitle>
                  <CardDescription>
                    Use these options with any InitraJS command to customize the generated output
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {additionalOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-black/20 border border-white/10">
                        <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                          {option.option}
                        </code>
                        <span className="text-muted-foreground text-sm">{option.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Start Guide</CardTitle>
                  <CardDescription>
                    Get started with InitraJS in just a few steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-black/30 rounded-lg p-4 border border-primary/20">
                      <div className="space-y-2">
                        <div className="text-sm text-white/70 mb-2">1. Install InitraJS globally:</div>
                        <code className="text-sm text-white/90 font-mono block">npm install -g initrajs</code>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 border border-primary/20">
                      <div className="space-y-2">
                        <div className="text-sm text-white/70 mb-2">2. Initialize a new project:</div>
                        <code className="text-sm text-white/90 font-mono block">npx initrajs init</code>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 border border-primary/20">
                      <div className="space-y-2">
                        <div className="text-sm text-white/70 mb-2">3. Generate your first component:</div>
                        <code className="text-sm text-white/90 font-mono block">initrajs c Button --ts --css --test</code>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Start Building Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}