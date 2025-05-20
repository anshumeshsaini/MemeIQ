
import { Search, Database, BrainCircuit, BarChart2, History, ArrowUpRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-meme-purple" />,
      title: "AI-Powered Reverse Search",
      description: "Combines Google Vision AI & CLIP to find the exact origin of any meme, even heavily edited versions.",
      color: "from-meme-purple/20 to-transparent"
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-meme-pink" />,
      title: "Meme DNA Analysis",
      description: "Extracts text, identifies objects, recognizes faces, and catalogs the fundamental elements of each meme.",
      color: "from-meme-pink/20 to-transparent"
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-meme-blue" />,
      title: "Viral Trend Prediction",
      description: "Tracks spread across platforms and uses advanced ML to predict which memes will go viral next.",
      color: "from-meme-blue/20 to-transparent"
    },
    {
      icon: <History className="w-8 h-8 text-meme-cyan" />,
      title: "Automated Meme Backstory",
      description: "Generates comprehensive summaries explaining origin, meaning, cultural impact, and historical context.",
      color: "from-meme-teal/20 to-transparent"
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by <span className="gradient-text">Advanced AI</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our platform combines multiple AI technologies to create the most comprehensive meme intelligence system ever built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="feature-card relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20`}></div>
              <div className="relative z-10">
                <div className="mb-4 bg-secondary/50 w-16 h-16 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/search" className="inline-flex items-center text-meme-purple hover:text-meme-pink transition-colors font-medium">
            Learn more about our technology
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
