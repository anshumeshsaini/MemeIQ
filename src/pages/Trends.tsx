
import Navbar from '@/components/Navbar';
import TrendingMemes from '@/components/TrendingMemes';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, BarChart2, Globe, Activity, Calendar } from 'lucide-react';

const Trends = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Meme Trend</span> Analysis
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Track meme popularity across platforms and predict upcoming viral content.
          </p>
        </div>
        
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Trending Now</span>
              <span className="sm:hidden">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="platforms" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">By Platform</span>
              <span className="sm:hidden">Platforms</span>
            </TabsTrigger>
            <TabsTrigger value="predict" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Predictions</span>
              <span className="sm:hidden">Predict</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Historical</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trending">
            <TrendingMemes />
          </TabsContent>
          <TabsContent value="platforms">
            <div className="glass-card p-6 text-center">
              <p className="text-xl text-foreground/70 mb-4">
                Platform-specific meme trend analysis is coming soon!
              </p>
              <p className="text-foreground/60">
                We're currently gathering data from Reddit, Twitter/X, TikTok, Instagram, and 4chan.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="predict">
            <div className="glass-card p-6 text-center">
              <p className="text-xl text-foreground/70 mb-4">
                AI-powered meme trend predictions are coming soon!
              </p>
              <p className="text-foreground/60">
                Our ML models are being trained to predict which memes will go viral in the next 24-72 hours.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="glass-card p-6 text-center">
              <p className="text-xl text-foreground/70 mb-4">
                Historical meme analysis is coming soon!
              </p>
              <p className="text-foreground/60">
                Explore the evolution of memes over time and track historical viral patterns.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Trends;
