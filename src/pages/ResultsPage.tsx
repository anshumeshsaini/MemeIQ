import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from "@/components/ui/progress";
import { Loader2, AlertCircle, CheckCircle2, FileQuestion } from 'lucide-react';

interface AnalysisResult {
  predictions?: {
    className: string;
    probability: number;
  }[];
  similarMemes?: {
    url: string;
    similarity: number;
  }[];
}

const MEME_TAGS = [
  "funny", "meme", "humor", "viral", "reaction", "dank", "wholesome",
  "sarcastic", "satire", "edgy", "template", "caption", "image macro"
];

const SIMILAR_MEMES = [
  "https://i.imgflip.com/1bij.jpg", // One Does Not Simply
  "https://i.imgflip.com/1bgw.jpg", // Distracted Boyfriend
  "https://i.imgflip.com/1bh8.jpg", // Drake Hotline Bling
  "https://i.imgflip.com/1bhf.jpg", // Two Buttons
  "https://i.imgflip.com/1bh3.jpg", // Bateman
  "https://i.imgflip.com/1bip.jpg", // X All The Y
  "https://i.imgflip.com/1bhw.jpg", // Futurama Fry
  "https://i.imgflip.com/1b42.jpg", // Y U No
  "https://i.imgflip.com/9vct.jpg"  // Woman Yelling at Cat
];

const ResultsPage = () => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<mobilenet.MobileNet | null>(null);
  const { toast } = useToast();

  // Load TensorFlow model on component mount
  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        await tf.ready();
        modelRef.current = await mobilenet.load();
        setIsModelLoading(false);
      } catch (err) {
        console.error("Failed to load model:", err);
        setIsModelLoading(false);
        setError("Failed to load AI model");
      }
    };

    loadModel();

    return () => {
      // Cleanup TensorFlow memory
      if (modelRef.current) {
        tf.disposeVariables();
      }
    };
  }, []);

  useEffect(() => {
    if (location.state?.imageUrl && modelRef.current && !isModelLoading) {
      setImageUrl(location.state.imageUrl);
      analyzeImage(location.state.imageUrl);
    }
  }, [location.state, isModelLoading]);

  const analyzeImage = async (url: string) => {
    if (!modelRef.current) {
      setError("AI model not loaded");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);
    
    let progressInterval: NodeJS.Timeout;
    
    try {
      // Start progress animation
      progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 700);

      // Load the image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      // Classify the image using MobileNet
      setAnalysisProgress(30);
      const predictions = await modelRef.current.classify(img);
      setAnalysisProgress(70);

      // Generate similar memes (mock implementation)
      const similarMemes = SIMILAR_MEMES
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(url => ({
          url,
          similarity: Math.floor(70 + Math.random() * 30)
        }));

      // Generate tags based on predictions
      const relevantTags = predictions
        .filter(p => p.probability > 0.1)
        .flatMap(p => {
          const words = p.className.toLowerCase().split(/[, ]+/);
          return words.filter(word => 
            word.length > 3 && MEME_TAGS.includes(word)
          );
        })
        .filter((tag, index, self) => self.indexOf(tag) === index)
        .slice(0, 5);

      // If no relevant tags found, use default tags
      const tags = relevantTags.length > 0 ? relevantTags : 
        ["meme", "humor", ...MEME_TAGS.sort(() => 0.5 - Math.random()).slice(0, 2)];

      // Clear interval before setting 100% progress
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      // Prepare the result
      const analyzedMeme: AnalysisResult = {
        predictions: predictions.slice(0, 3), // Top 3 predictions
        similarMemes,
        tags
      };
      
      setResult(analyzedMeme);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your meme!",
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

        {isModelLoading ? (
          <div className="glass-card p-8 max-w-3xl mx-auto text-center">
            <Loader2 className="h-12 w-12 animate-spin text-meme-purple mx-auto" />
            <h2 className="text-xl font-semibold mt-4">Loading AI Model...</h2>
            <p className="text-foreground/70 mt-2">
              This may take a moment. Please wait while we load the image recognition model.
            </p>
          </div>
        ) : isAnalyzing ? (
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="text-center space-y-6">
              <Loader2 className="h-12 w-12 animate-spin text-meme-purple mx-auto" />
              <h2 className="text-xl font-semibold">Analyzing your meme...</h2>
              <div className="space-y-2">
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-sm text-foreground/70">
                  {analysisProgress < 30 && "Loading image..."}
                  {analysisProgress >= 30 && analysisProgress < 70 && "Identifying meme content..."}
                  {analysisProgress >= 70 && "Finalizing results..."}
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
                    AI Predictions
                  </h2>
                  <div className="space-y-3">
                    {result.predictions?.map((pred, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-foreground/70">
                          {pred.className.replace(/,/g, ", ")}:
                        </span>
                        <span className="font-medium">
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {result.tags && (
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-meme-blue" />
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-secondary/40 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://i.imgflip.com/1bij.jpg"; // Fallback image
                        }}
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