
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, CornerRightDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample trending data
const trendingData = [
  {
    id: 1,
    name: "Distracted Boyfriend",
    image: "https://i.imgur.com/QFbmwPO.jpg", 
    viralityScore: 94,
    trend: [
      { day: 'Mon', value: 30 },
      { day: 'Tue', value: 35 },
      { day: 'Wed', value: 55 },
      { day: 'Thu', value: 85 },
      { day: 'Fri', value: 78 },
      { day: 'Sat', value: 110 },
      { day: 'Sun', value: 130 }
    ],
    origin: "Reddit",
    platforms: ["Reddit", "Twitter", "Instagram", "TikTok"]
  },
  {
    id: 2,
    name: "Trade Offer",
    image: "https://i.imgur.com/ll7K7q2.jpg", 
    viralityScore: 87,
    trend: [
      { day: 'Mon', value: 40 },
      { day: 'Tue', value: 60 },
      { day: 'Wed', value: 45 },
      { day: 'Thu', value: 70 },
      { day: 'Fri', value: 90 },
      { day: 'Sat', value: 85 },
      { day: 'Sun', value: 100 }
    ],
    origin: "TikTok",
    platforms: ["TikTok", "Twitter", "Instagram"]
  },
  {
    id: 3,
    name: "Woman Yelling at Cat",
    image: "https://i.imgur.com/mLCLhQd.jpg", 
    viralityScore: 82,
    trend: [
      { day: 'Mon', value: 55 },
      { day: 'Tue', value: 45 },
      { day: 'Wed', value: 65 },
      { day: 'Thu', value: 60 },
      { day: 'Fri', value: 75 },
      { day: 'Sat', value: 85 },
      { day: 'Sun', value: 90 }
    ],
    origin: "Facebook",
    platforms: ["Facebook", "Instagram", "Twitter"]
  },
  {
    id: 4,
    name: "Stonks",
    image: "https://i.imgur.com/fZoLdSZ.jpg", 
    viralityScore: 78,
    trend: [
      { day: 'Mon', value: 20 },
      { day: 'Tue', value: 30 },
      { day: 'Wed', value: 50 },
      { day: 'Thu', value: 65 },
      { day: 'Fri', value: 55 },
      { day: 'Sat', value: 75 },
      { day: 'Sun', value: 85 }
    ],
    origin: "4chan",
    platforms: ["4chan", "Reddit", "Twitter"]
  },
];

const TrendingMemes = () => {
  const [activeMeme, setActiveMeme] = useState(trendingData[0]);

  return (
    <section className="py-16 md:py-24 bg-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-foreground/80 text-sm font-medium">
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-meme-blue" /> 
              Real-Time Analytics
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending <span className="gradient-text">Memes</span> This Week
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our AI monitors millions of posts across social platforms to identify and predict viral meme trends.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-secondary/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-medium mb-4">Top Trending Memes</h3>
              <div className="space-y-4">
                {trendingData.map((meme) => (
                  <div 
                    key={meme.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      activeMeme.id === meme.id 
                        ? 'bg-meme-purple/20 border border-meme-purple/30' 
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveMeme(meme)}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <img src={meme.image} alt={meme.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{meme.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-foreground/60">Origin: {meme.origin}</div>
                        {meme.viralityScore > 90 && (
                          <span className="bg-meme-purple/20 text-meme-purple text-xs px-1.5 py-0.5 rounded">Hot!</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-meme-blue font-semibold">{meme.viralityScore}</div>
                      <div className="text-xs text-foreground/60">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">{activeMeme.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="flex items-center">
                      <CornerRightDown className="w-3.5 h-3.5 mr-1" /> 
                      Origin: {activeMeme.origin}
                    </span>
                    <span className="flex items-center ml-3">
                      <TrendingUp className="w-3.5 h-3.5 mr-1 text-meme-purple" /> 
                      Score: {activeMeme.viralityScore}/100
                    </span>
                  </div>
                </div>
                
                <Button size="sm" className="text-xs flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" /> 
                  View Analysis
                </Button>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">7-Day Trend</div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={activeMeme.trend}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="trendColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111', 
                          border: '1px solid #333',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        fillOpacity={1} 
                        fill="url(#trendColor)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Platform Distribution</div>
                <div className="flex flex-wrap gap-2">
                  {activeMeme.platforms.map((platform, idx) => (
                    <div 
                      key={idx} 
                      className="px-3 py-1 rounded-full text-sm bg-secondary text-foreground/80"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="default" className="meme-btn">
            View All Trending Memes
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingMemes;
