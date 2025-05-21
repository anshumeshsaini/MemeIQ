
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MemeEditor from '@/components/MemeEditor';
import ViralityPredictor from '@/components/ViralityPredictor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MemeCreator = () => {
  const [memeImage, setMemeImage] = useState<string | null>(null);
  const [memeTexts, setMemeTexts] = useState<Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontFamily: string;
    color: string;
    bold: boolean;
    italic: boolean;
  }>>([]);
  const [activeTab, setActiveTab] = useState("editor");
  const [panelCount, setPanelCount] = useState(1);
  const [panels, setPanels] = useState<Array<{
    id: string;
    image: string | null;
    texts: Array<{
      id: string;
      text: string;
      x: number;
      y: number;
      fontSize: number;
      fontFamily: string;
      color: string;
      bold: boolean;
      italic: boolean;
    }>;
  }>>([{ id: '1', image: null, texts: [] }]);
  const [activePanel, setActivePanel] = useState('1');
  const [viralityScore, setViralityScore] = useState<number | null>(null);
  const [viralityData, setViralityData] = useState<any | null>(null);
  
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (imageUrl: string, panelId: string) => {
    setPanels(prev => 
      prev.map(panel => 
        panel.id === panelId 
          ? { ...panel, image: imageUrl } 
          : panel
      )
    );
  };

  const handleAddText = (panelId: string) => {
    const newText = {
      id: `text-${Date.now()}`,
      text: 'Add text here',
      x: 50,
      y: 50,
      fontSize: 24,
      fontFamily: 'Arial',
      color: '#ffffff',
      bold: false,
      italic: false,
    };
    
    setPanels(prev => 
      prev.map(panel => 
        panel.id === panelId 
          ? { ...panel, texts: [...panel.texts, newText] } 
          : panel
      )
    );
  };

  const handleTextChange = (textId: string, panelId: string, changes: any) => {
    setPanels(prev => 
      prev.map(panel => 
        panel.id === panelId 
          ? { 
              ...panel, 
              texts: panel.texts.map(text => 
                text.id === textId 
                  ? { ...text, ...changes } 
                  : text
              ) 
            } 
          : panel
      )
    );
  };

  const handleAddPanel = () => {
    if (panelCount >= 4) {
      toast({
        title: "Maximum Panels Reached",
        description: "You can only create up to 4 panels for your meme.",
        variant: "destructive",
      });
      return;
    }

    const newPanelId = `${panelCount + 1}`;
    setPanels([...panels, { id: newPanelId, image: null, texts: [] }]);
    setPanelCount(panelCount + 1);
    setActivePanel(newPanelId);
  };

  const handleRemovePanel = (panelId: string) => {
    if (panelCount <= 1) {
      toast({
        title: "Cannot Remove Panel",
        description: "You need at least one panel for your meme.",
        variant: "destructive",
      });
      return;
    }

    const newPanels = panels.filter(panel => panel.id !== panelId);
    setPanels(newPanels);
    setPanelCount(panelCount - 1);
    setActivePanel(newPanels[0].id);
  };

  const handlePredictVirality = () => {
    // Check if at least one panel has an image
    const hasImage = panels.some(panel => panel.image !== null);
    
    if (!hasImage) {
      toast({
        title: "No Image Found",
        description: "Please upload at least one image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setActiveTab("virality");
    
    // Mock prediction data
    const mockViralityScore = Math.floor(60 + Math.random() * 30);
    const mockViralityData = {
      score: mockViralityScore,
      strengths: [
        "Good use of popular template",
        "Text contrast is clear and readable",
        "Humor aligns with current trends"
      ],
      weaknesses: [
        "Could use more contrast in some text areas",
        "Consider more trending references"
      ],
      suggestedHashtags: [
        "#memeoftheday",
        "#viral",
        "#funnymemes",
        "#trending",
        "#relatable"
      ],
      similarMemes: [
        "https://i.imgflip.com/1bij.jpg",
        "https://i.imgflip.com/1bgw.jpg",
        "https://i.imgflip.com/1bh8.jpg"
      ],
      templateInfo: {
        name: "Distracted Boyfriend",
        firstSeen: "June 15, 2019",
        origin: "4chan /b/ board, circa 2019",
        popularityScore: "85/100"
      }
    };
    
    setViralityScore(mockViralityScore);
    setViralityData(mockViralityData);
  };

  const handleDownload = () => {
    if (!editorRef.current) return;
    
    // Using html2canvas to capture the meme
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(editorRef.current!, { allowTaint: true, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        toast({
          title: "Meme Downloaded",
          description: "Your meme has been downloaded successfully.",
        });
      });
    });
  };

  useEffect(() => {
    // Add the App.tsx route for this page
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Meme Creator</span> Studio
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Create, customize, and analyze the virality of your memes. Upload images, add text, and get AI-powered insights on your creation.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="editor">Meme Editor</TabsTrigger>
            <TabsTrigger value="virality">Virality Prediction</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-2">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Meme Editor</h2>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handleAddPanel}
                    disabled={panelCount >= 4}
                  >
                    Add Panel
                  </Button>
                  <Button 
                    className="meme-btn" 
                    onClick={handlePredictVirality}
                  >
                    Predict Virality <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-3">
                  <div ref={editorRef} className="flex flex-wrap gap-4">
                    {panels.map((panel) => (
                      <div 
                        key={panel.id} 
                        className={`relative border-2 ${panel.id === activePanel ? 'border-meme-purple' : 'border-border'} rounded-lg overflow-hidden transition-all`}
                        onClick={() => setActivePanel(panel.id)}
                      >
                        <MemeEditor 
                          imageUrl={panel.image}
                          texts={panel.texts}
                          onImageUpload={(url) => handleImageUpload(url, panel.id)}
                          onAddText={() => handleAddText(panel.id)}
                          onTextChange={(textId, changes) => handleTextChange(textId, panel.id, changes)}
                          onRemoveText={(textId) => {
                            setPanels(prev => 
                              prev.map(p => 
                                p.id === panel.id 
                                  ? { ...p, texts: p.texts.filter(t => t.id !== textId) } 
                                  : p
                              )
                            );
                          }}
                          active={panel.id === activePanel}
                        />
                        {panelCount > 1 && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePanel(panel.id);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={handleDownload} className="meme-btn">
                      Download Meme
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="virality" className="space-y-4 mt-2">
            {viralityScore !== null && viralityData !== null ? (
              <ViralityPredictor 
                viralityScore={viralityScore}
                viralityData={viralityData}
                onBackToEditor={() => setActiveTab("editor")}
              />
            ) : (
              <div className="glass-card p-8 text-center">
                <p>Create your meme first, then click "Predict Virality" to see an analysis.</p>
                <Button className="meme-btn mt-4" onClick={() => setActiveTab("editor")}>
                  Back to Editor
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default MemeCreator;
