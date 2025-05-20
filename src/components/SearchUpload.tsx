
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle, Image, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const SearchUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload images smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview and process the image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setUploadedImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    if (!uploadedImage) return;
    
    setIsLoading(true);
    
    // Navigate to results page with the image URL
    navigate('/results', { state: { imageUrl: uploadedImage } });
  };

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div 
        className={`glass-card p-8 ${isDragging ? 'ring-2 ring-meme-purple' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Upload Your Meme</h2>
          <p className="text-foreground/70">
            Drag and drop your image or click to browse
          </p>
        </div>

        {!uploadedImage ? (
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <Upload className="h-8 w-8 text-meme-purple" />
            </div>
            <p className="mb-4 text-foreground/70">
              PNG, JPG or GIF files up to 5MB
            </p>
            <div>
              <Label htmlFor="meme-upload" className="meme-btn cursor-pointer inline-block">
                Choose File
              </Label>
              <input 
                id="meme-upload" 
                type="file" 
                accept="image/*" 
                className="sr-only" 
                onChange={handleFileInputChange}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="max-h-80 overflow-hidden rounded-lg">
              <img 
                src={uploadedImage}
                alt="Uploaded meme"
                className="w-full object-contain"
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={clearImage}
                className="border-meme-purple/20 text-foreground/70"
              >
                <FileImage className="mr-2 h-4 w-4" />
                Choose Different Image
              </Button>
              <Button
                onClick={startAnalysis}
                className="meme-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Image className="mr-2 h-4 w-4" />
                    Analyze Meme
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-secondary/20 border border-border rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="text-meme-blue mr-3 mt-0.5 h-5 w-5" />
          <div>
            <h3 className="font-medium mb-1">About Our AI Analysis</h3>
            <p className="text-sm text-foreground/70">
              Our neural network analyzes your meme by comparing it to millions of cataloged images. We detect text, recognize objects, and identify the original template to provide comprehensive results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUpload;
