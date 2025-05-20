
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from "@/components/ui/progress";
import { Loader2, AlertCircle, CheckCircle2, FileQuestion } from 'lucide-react';

interface AnalysisResult {
  origin?: string;
  template?: string;
  popularity?: number;
  firstSeen?: string;
  tags?: string[];
  similarMemes?: {
    url: string;
    similarity: number;
  }[];
}

const API_URL = 'https://api.memealyzer.com/analyze'; // This is a fictional API endpoint

const ResultsPage = () => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get image from state passed by SearchUpload component
    if (location.state?.imageUrl) {
      setImageUrl(location.state.imageUrl);
      analyzeImage(location.state.imageUrl);
    }
  }, [location.state]);

  const analyzeImage = async (url: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);
    
    // Define progressInterval outside the try block so it's accessible in the catch block
    let progressInterval: NodeJS.Timeout;
    
    try {
      // Start progress animation
      progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress; // Only go up to 90% with animation
        });
      }, 700);

      // In a real app, we'd send the image to an API
      // For this demo, we'll simulate an API call but structure it like a real one
      
      // Simulate API call with fetch
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: url }),
      }).catch(err => {
        // Simulate API error - in real app, this would be caught differently
        console.error("API call failed:", err);
        throw new Error("API request failed");
      });
      
      // Since we're simulating, we'll create a timeout to mimic API response time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Clear interval before setting 100% progress
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // In real implementation, we would parse the API response
      // For this demo, we'll use our template data but pretend it came from API
      
      // Get meme details - this would normally come from API response.json()
      const memeDatabase = getMemeDatabase();
      const analyzedMeme = memeDatabase.find(meme => 
        meme.template === "Distracted Boyfriend" || Math.random() > 0.7
      ) || memeDatabase[0];
      
      setResult(analyzedMeme);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "We've found information about your meme!",
        duration: 3000,
      });
    } catch (err) {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // This function simulates a database of known memes
  const getMemeDatabase = (): AnalysisResult[] => {
    return [
      {
        origin: "4chan /b/ board, circa 2019",
        template: "Distracted Boyfriend",
        popularity: 85,
        firstSeen: "June 15, 2019",
        tags: ["reaction", "relationship", "jealousy", "humor"],
        similarMemes: [
          {
            url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
            similarity: 92
          },
          {
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            similarity: 84
          },
          {
            url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
            similarity: 78
          }
        ]
      },
      {
        origin: "Reddit r/memes, August 2021",
        template: "Drake Hotline Bling",
        popularity: 92,
        firstSeen: "August 3, 2021",
        tags: ["reaction", "comparison", "preference", "viral"],
        similarMemes: [
          {
            url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
            similarity: 88
          },
          {
            url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
            similarity: 81
          }
        ]
      },
      {
        origin: "Twitter, December 2020",
        template: "Woman Yelling at Cat",
        popularity: 89,
        firstSeen: "December 19, 2020",
        tags: ["argument", "funny", "animals", "conflict"],
        similarMemes: [
          {
            url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            similarity: 95
          },
          {
            url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
            similarity: 79
          }
        ]
      },
      {
        origin: "Instagram, March 2022",
        template: "Two Buttons",
        popularity: 77,
        firstSeen: "March 5, 2022",
        tags: ["decision", "dilemma", "choice", "sweat"],
        similarMemes: [
          {
            url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
            similarity: 86
          },
          {
            url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
            similarity: 75
          }
        ]
      }
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Meme Analysis</span> Results
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our AI has analyzed your meme and found the following information.
          </p>
        </div>

        {isAnalyzing ? (
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="text-center space-y-6">
              <Loader2 className="h-12 w-12 animate-spin text-meme-purple mx-auto" />
              <h2 className="text-xl font-semibold">Analyzing your meme...</h2>
              <div className="space-y-2">
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-sm text-foreground/70">
                  {analysisProgress < 30 && "Identifying meme template..."}
                  {analysisProgress >= 30 && analysisProgress < 60 && "Searching for origin..."}
                  {analysisProgress >= 60 && analysisProgress < 90 && "Analyzing virality and spread..."}
                  {analysisProgress >= 90 && "Finalizing results..."}
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="glass-card p-8 max-w-3xl mx-auto text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Analysis Failed</h2>
            <p className="text-foreground/70 mb-4">
              {error}
            </p>
            <button 
              className="meme-btn" 
              onClick={() => imageUrl && analyzeImage(imageUrl)}
            >
              Try Again
            </button>
          </div>
        ) : result ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                {imageUrl && (
                  <div className="glass-card p-4">
                    <img 
                      src={imageUrl} 
                      alt="Analyzed meme" 
                      className="w-full rounded-lg object-contain"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FileQuestion className="mr-2 h-5 w-5 text-meme-blue" />
                    Meme Origin
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Template:</span>
                      <span className="font-medium">{result.template}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">First Seen:</span>
                      <span className="font-medium">{result.firstSeen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Origin:</span>
                      <span className="font-medium">{result.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Popularity Score:</span>
                      <span className="font-medium">{result.popularity}/100</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-meme-blue" />
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {result.tags?.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-secondary/40 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {result.similarMemes && result.similarMemes.length > 0 && (
              <div className="glass-card p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Similar Memes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {result.similarMemes.map((meme, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-secondary/30 border border-white/10">
                      <img 
                        src={meme.url} 
                        alt={`Similar meme ${index + 1}`} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <div className="text-sm text-foreground/70">
                          Similarity: {meme.similarity}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card p-8 max-w-3xl mx-auto text-center">
            <AlertCircle className="h-12 w-12 text-meme-purple mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Image Found</h2>
            <p className="text-foreground/70">
              Please upload a meme image to analyze using the search page.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;
