import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "glass-effect backdrop-blur-md" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {/* InitraJS Logo */}
            <img 
              src="/attached_assets/Untitled design_1754249144069.png" 
              alt="InitraJS Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-foreground">InitraJS</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleLinkClick("#features")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleLinkClick("#playground")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Playground
            </button>
            <button 
              onClick={() => handleLinkClick("#templates")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Templates
            </button>
            <button 
              onClick={() => handleLinkClick("#roadmap")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Roadmap
            </button>
            <a 
              href="https://github.com/initrajs/initrajs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-effect rounded-lg mt-2">
              <button 
                onClick={() => handleLinkClick("#features")}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
              >
                Features
              </button>
              <button 
                onClick={() => handleLinkClick("#playground")}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
              >
                Playground
              </button>
              <button 
                onClick={() => handleLinkClick("#templates")}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
              >
                Templates
              </button>
              <button 
                onClick={() => handleLinkClick("#roadmap")}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
              >
                Roadmap
              </button>
              <a 
                href="https://github.com/initrajs/initrajs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
