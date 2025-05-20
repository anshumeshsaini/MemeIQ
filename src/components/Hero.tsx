
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Zap, BarChart2, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-meme-purple opacity-30 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-meme-blue opacity-20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-foreground/80 text-sm font-medium">
            <span className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-meme-pink" /> 
              Powered by AI & Neural Search
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Find the <span className="gradient-text">Origin</span> and <span className="gradient-text">Story</span> Behind Any Meme
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-10">
            Upload any meme and our AI will find its origin, track its spread, and predict its future.
            The ultimate platform for meme researchers, creators, and enthusiasts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button className="meme-btn text-lg py-6 px-8 flex items-center gap-2">
              <Search className="w-5 h-5 mr-1" />
              Start Searching
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="outline" className="text-lg py-6 px-8 border-meme-purple/30 hover:border-meme-purple/50 transition-colors">
              <BrainCircuit className="w-5 h-5 mr-2 text-meme-purple" />
              How It Works
            </Button>
          </div>

          {/* Illustrated meme search concept */}
          <div className="relative mx-auto max-w-2xl">
            <div className="glass-card rounded-xl overflow-hidden shadow-2xl border border-meme-purple/20">
              <div className="border-b border-white/10 p-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-meme-pink"></div>
                <div className="w-3 h-3 rounded-full bg-meme-purple"></div>
                <div className="w-3 h-3 rounded-full bg-meme-blue"></div>
                <div className="flex-1 text-sm text-left ml-2 font-mono text-foreground/70">MemeIQ - Advanced Analysis</div>
              </div>
              <div className="p-6">
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="flex-1 bg-black/20 rounded-lg h-56 flex items-center justify-center border border-white/5">
                    <div className="text-center">
                      <Search className="w-8 h-8 mx-auto mb-2 text-meme-blue" />
                      <p className="text-foreground/50 text-sm">Drop meme image here</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="glass-card p-3 animate-pulse-glow">
                      <h3 className="text-sm font-medium text-meme-purple">Origin Detected</h3>
                      <p className="text-xs text-foreground/70">Reddit r/dankmemes • 2 days ago</p>
                    </div>
                    <div className="glass-card p-3">
                      <h3 className="text-sm font-medium text-meme-blue">DNA Analysis</h3>
                      <p className="text-xs text-foreground/70">Format: "Distracted Boyfriend" + "Stonks"</p>
                    </div>
                    <div className="glass-card p-3">
                      <h3 className="text-sm font-medium text-meme-pink">Virality Score</h3>
                      <p className="text-xs text-foreground/70">83/100 - Trending on 3 platforms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-meme-purple rounded-full opacity-20 animate-float delay-100"></div>
            <div className="absolute -bottom-4 -left-6 w-8 h-8 bg-meme-pink rounded-full opacity-20 animate-float delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
