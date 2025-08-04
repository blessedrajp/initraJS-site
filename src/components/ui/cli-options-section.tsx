import { useRef } from "react";
import { useGSAP } from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Code, Zap, Settings, Target, Wrench } from "lucide-react";

const cliOptions = [
  { option: "--ts", description: "Generate TypeScript files", usage: "initrajs c Button --ts" },
  { option: "--js", description: "Generate JavaScript files", usage: "initrajs c Button --js" },
  { option: "--css", description: "Include CSS/SCSS files", usage: "initrajs c Button --css" },
  { option: "--test", description: "Generate test files", usage: "initrajs c Button --test" },
  { option: "--story", description: "Generate Storybook stories", usage: "initrajs c Button --story" },
  { option: "--path", description: "Custom file path", usage: 'initrajs c Button --path "src/ui"' },
  { option: "--props", description: "Component props", usage: 'initrajs c Button --props "text,onClick"' },
  { option: "--server", description: "Server-side component", usage: "initrajs c Button --server" },
  { option: "--client", description: "Client-side component", usage: "initrajs c Button --client" },
  { option: "--layout", description: "Layout component", usage: "initrajs c Header --layout" },
  { option: "--next", description: "Next.js page structure", usage: "initrajs page Home --next" },
  { option: "--react", description: "Standard React page", usage: "initrajs page Home --react" },
];

const smartDefaults = [
  { title: "TypeScript First", description: "Defaults to .tsx unless --js specified", icon: "🎯" },
  { title: "Modern Patterns", description: "Uses latest React patterns and hooks", icon: "⚛️" },
  { title: "Best Practices", description: "Follows industry standards for file organization", icon: "📁" },
  { title: "Performance", description: "Optimized bundle splitting and lazy loading", icon: "⚡" },
  { title: "Accessibility", description: "WCAG compliant components", icon: "♿" },
];

const customizationExamples = [
  {
    title: "Custom Component with All Options",
    command: `initrajs c DataTable \\
  --ts \\
  --css \\
  --test \\
  --story \\
  --props "data,columns,onSort,loading" \\
  --path "src/components/tables"`,
    description: "Generate a complete component with TypeScript, styles, tests, and Storybook integration"
  },
  {
    title: "Next.js Page with Custom Route",
    command: `initrajs page UserDashboard \\
  --next \\
  --css \\
  --test \\
  --path "app/(dashboard)/users"`,
    description: "Create a Next.js page with App Router structure and custom routing"
  }
];

export function CliOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !tabsRef.current) return;
    
    // Import GSAP globally 
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
    .from(tabsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  return (
    <section ref={sectionRef} id="cli-options" className="py-20 bg-gradient-to-b from-background to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Terminal className="w-4 h-4 mr-2" />
            Try InitraJS Live
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Comprehensive CLI Options
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the full power of InitraJS with extensive customization options, smart defaults, and flexible configurations
          </p>
        </div>

        <div ref={tabsRef}>
          <Tabs defaultValue="options" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="options" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                CLI Options
              </TabsTrigger>
              <TabsTrigger value="defaults" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Smart Defaults
              </TabsTrigger>
              <TabsTrigger value="customization" className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Customization
              </TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Code className="w-6 h-6 text-primary" />
                    CLI Options Reference
                  </CardTitle>
                  <CardDescription>
                    Complete list of available command-line options for maximum flexibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 font-semibold text-primary">Option</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">Description</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">Usage Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cliOptions.map((option, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4">
                              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                                {option.option}
                              </code>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {option.description}
                            </td>
                            <td className="py-3 px-4">
                              <code className="bg-white/5 text-white/80 px-2 py-1 rounded text-sm font-mono">
                                {option.usage}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="defaults" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {smartDefaults.map((item, index) => (
                  <Card key={index} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <span className="text-2xl">{item.icon}</span>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="customization" className="space-y-8">
              {customizationExamples.map((example, index) => (
                <Card key={index} className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Zap className="w-5 h-5 text-primary" />
                      {example.title}
                    </CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <pre className="text-sm text-white/90 font-mono overflow-x-auto">
                        <code>{example.command}</code>
                      </pre>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Try This Command
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white"
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Ready to Get Started?</CardTitle>
                  <CardDescription>
                    Install InitraJS globally and start building with these powerful options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/30 rounded-lg p-4 border border-primary/20 mb-4">
                    <pre className="text-sm text-white/90 font-mono">
                      <code>npm install -g initrajs</code>
                    </pre>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Install InitraJS
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}