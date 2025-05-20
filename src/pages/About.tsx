
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Zap, Shield, Server, Code, ArrowUpRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">
            About <span className="gradient-text">MemeIQ</span>
          </h1>
          
          <p className="text-xl text-foreground/70 mb-6">
            MemeIQ is an AI-powered meme intelligence platform that helps users understand the origin, context, and virality of internet memes through advanced machine learning and pattern recognition.
          </p>
          
          <p className="text-foreground/70 mb-6">
            Our platform is built by a team of AI researchers, data scientists, and internet culture enthusiasts who believe in the importance of understanding how content spreads online. We track millions of images across social media platforms to build the most comprehensive meme database in existence.
          </p>
          
          <div className="glass-card p-6 mb-12">
            <div className="flex items-start">
              <div className="bg-meme-purple/20 p-3 rounded-lg mr-4">
                <BrainCircuit className="h-6 w-6 text-meme-purple" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Mission</h3>
                <p className="text-foreground/70">
                  To decode internet culture through AI and help everyone understand the context, meaning, and impact of visual communication in our digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Technology</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card">
              <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center">
                <BrainCircuit className="h-6 w-6 text-meme-pink" />
              </div>
              <h3 className="font-bold text-lg mb-2">Neural Image Processing</h3>
              <p className="text-foreground/70">
                We use advanced neural networks including CLIP, ResNet, and custom computer vision models to analyze and recognize meme formats, even when heavily modified.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-meme-purple" />
              </div>
              <h3 className="font-bold text-lg mb-2">Real-time Monitoring</h3>
              <p className="text-foreground/70">
                Our systems continuously track social media platforms and forums to detect emerging meme trends and track their spread across the internet.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-lg flex items-center justify-center">
                <Server className="h-6 w-6 text-meme-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2">Massive Database</h3>
              <p className="text-foreground/70">
                We've indexed millions of memes, their variations, and tracked their evolution to create the world's most comprehensive meme knowledge database.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Developer API</h2>
                <p className="text-foreground/70 mb-6">
                  Access our meme intelligence platform programmatically through our comprehensive API. Build applications that can identify memes, track trends, and analyze visual content.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="meme-btn">
                    <Code className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                  <Button variant="outline" className="border-meme-purple/30">
                    Get API Key
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg">
                <pre className="text-sm text-foreground/80 font-mono overflow-x-auto">
                  <code>{`curl -X POST https://api.memeiq.ai/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "image=@meme.jpg"`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Contact Us</h2>
          
          <div className="glass-card p-6 max-w-lg mx-auto">
            <p className="text-center mb-6 text-foreground/70">
              Interested in enterprise solutions or have questions about our platform?
            </p>
            
            <div className="flex justify-center">
              <Button className="meme-btn">
                Get in Touch
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
