import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'
import { Check, Code2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCopy } from '@/hooks/use-copy';

const Quickstart = () => {

    const { copied, copyToClipboard } = useCopy();

  return (
    <section id="QuickStart" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Quick Start <span className="text-gradient-orange">InitraJS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by developers, for developers. Experience the future of fullstack development.
          </p>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl">Quick Start Guide</CardTitle>
            <CardDescription>
              Get started with InitraJS in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-black/90 rounded-lg p-4 border border-primary/20 relative group">
                <div className="space-y-2">
                  <div className="text-sm text-white/70 mb-2">1. Install InitraJS globally:</div>
                  <code className="text-sm text-white/90 font-mono block">npm install -g initrajs</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8 hover:bg-white/10"
                    onClick={() => copyToClipboard("npm install -g initrajs")}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/90 rounded-lg p-4 border border-primary/20 relative group">
                <div className="space-y-2">
                  <div className="text-sm text-white/70 mb-2">2. Initialize a new project:</div>
                  <code className="text-sm text-white/90 font-mono block">npx initrajs init</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8 hover:bg-white/10"
                    onClick={() => copyToClipboard("npx initrajs init")}
                  >
                    <Copy className="w-3 h-3 text-white" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/90 rounded-lg p-4 border border-primary/20 relative group">
                <div className="space-y-2">
                  <div className="text-sm text-white/70 mb-2">3. Generate your first component:</div>
                  <code className="text-sm text-white/90 font-mono block">initrajs c Button --ts --css --test</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8 hover:bg-white/10"
                    onClick={() => copyToClipboard("initrajs c Button --ts --css --test")}
                  >
                    <Copy className="w-3 h-3 text-white" />
                  </Button>
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
      </div>
    </section>
  )
}

export default Quickstart