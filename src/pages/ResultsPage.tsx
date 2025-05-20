
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

const ResultsPage = () => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
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
    
    try {
      // Simulate progressive loading for better UX
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 700);

      // In a real app, this would be an API call to an image analysis service
      // For demo purposes, we'll simulate an API response
      setTimeout(() => {
        clearInterval(progressInterval);
        setAnalysisProgress(100);
        
        // Mock result data
        const mockResult: AnalysisResult = {
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
        };
        
        setResult(mockResult);
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis Complete",
          description: "We've found information about your meme!",
          duration: 3000,
        });
      }, 3500);
    } catch (error) {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
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
