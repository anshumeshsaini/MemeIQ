
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share, TrendingUp, Download, CheckCircle, AlertCircle, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ViralityPredictorProps {
  viralityScore: number;
  viralityData: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestedHashtags: string[];
    similarMemes: string[];
    templateInfo?: {
      name: string;
      firstSeen: string;
      origin: string;
      popularityScore: string;
    };
  };
  onBackToEditor: () => void;
}

const ViralityPredictor = ({
  viralityScore,
  viralityData,
  onBackToEditor
}: ViralityPredictorProps) => {
  const { toast } = useToast();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent viral potential!';
    if (score >= 60) return 'Good viral potential';
    if (score >= 40) return 'Average viral potential';
    return 'Low viral potential';
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy a link
    navigator.clipboard.writeText(`Check out my meme with a virality score of ${viralityScore}/100 on MemeIQ!`)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "Share link copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Share Failed",
          description: "Could not copy share link",
          variant: "destructive",
        });
      });
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Analysis Downloaded",
      description: "Virality analysis report has been downloaded",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-meme opacity-20 blur-3xl rounded-full z-0"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-meme-blue opacity-20 blur-3xl rounded-full z-0"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-meme-purple" />
              Virality Prediction
            </h2>
            <Button variant="outline" onClick={onBackToEditor} className="hover:border-meme-purple">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Editor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-secondary/30 backdrop-blur-md rounded-lg p-6 text-center border border-white/10 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-6xl font-bold mb-2 bg-gradient-meme text-transparent bg-clip-text">
                  {viralityScore}<span className="text-3xl">/100</span>
                </div>
                <div className={`text-xl font-medium ${getScoreColor(viralityScore)}`}>
                  {getScoreLabel(viralityScore)}
                </div>
                <p className="mt-4 text-foreground/70">
                  This score predicts how likely your meme is to go viral based on current trends and meme patterns.
                </p>
                <div className="mt-6 flex justify-center space-x-3">
                  <Button variant="outline" className="flex-1 hover:border-meme-pink" onClick={handleShare}>
                    <Share className="h-4 w-4 mr-2" /> Share
                  </Button>
                  <Button variant="gradient" className="flex-1" glow="subtle" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              {viralityData.templateInfo && (
                <div className="bg-secondary/20 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-md hover:shadow-lg transition-all">
                  <h3 className="text-lg font-medium mb-3 text-gradient-text">Meme Origin</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-foreground/70">Template:</div>
                    <div className="font-medium">{viralityData.templateInfo.name}</div>
                    <div className="text-foreground/70">First Seen:</div>
                    <div>{viralityData.templateInfo.firstSeen}</div>
                    <div className="text-foreground/70">Origin:</div>
                    <div>{viralityData.templateInfo.origin}</div>
                    <div className="text-foreground/70">Popularity Score:</div>
                    <div>{viralityData.templateInfo.popularityScore}</div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <div className="flex-1 bg-secondary/20 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-md hover:shadow-lg transition-all">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Strengths
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {viralityData.strengths.map((strength, index) => (
                      <li key={index} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 bg-secondary/20 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-md hover:shadow-lg transition-all">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                    Areas to Improve
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {viralityData.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm">{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-secondary/20 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Hash className="mr-2 h-4 w-4 text-meme-blue" />
                  Suggested Hashtags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {viralityData.suggestedHashtags.map((hashtag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-meme-purple/20 text-meme-purple rounded-full text-sm hover:bg-meme-purple/30 cursor-pointer transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(hashtag);
                        toast({
                          title: "Copied!",
                          description: `${hashtag} copied to clipboard`,
                        });
                      }}
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viralityData.similarMemes.length > 0 && (
        <div className="glass-card p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-meme-cyan opacity-20 blur-3xl rounded-full z-0"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-4 text-gradient-text">Similar Viral Memes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {viralityData.similarMemes.map((meme, index) => (
                <div key={index} className="bg-secondary/30 rounded-lg overflow-hidden border border-white/10 shadow-md hover:shadow-xl hover:scale-105 transition-all">
                  <img 
                    src={meme} 
                    alt={`Similar meme ${index + 1}`} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://i.imgflip.com/1bij.jpg"; // Fallback image
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViralityPredictor;
