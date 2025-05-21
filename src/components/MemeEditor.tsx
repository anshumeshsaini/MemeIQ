
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { 
  Upload, 
  Plus, 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Palette,
  Trash,
  Text
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
}

interface MemeEditorProps {
  imageUrl: string | null;
  texts: TextElement[];
  onImageUpload: (url: string) => void;
  onAddText: () => void;
  onTextChange: (id: string, changes: Partial<TextElement>) => void;
  onRemoveText: (id: string) => void;
  active: boolean;
}

const MemeEditor = ({
  imageUrl,
  texts,
  onImageUpload,
  onAddText,
  onTextChange,
  onRemoveText,
  active
}: MemeEditorProps) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG or GIF)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onImageUpload(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setSelectedText(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!selectedText) return;

    const bbox = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bbox.left) / bbox.width) * 100;
    const y = ((e.clientY - bbox.top) / bbox.height) * 100;

    onTextChange(selectedText, { x, y });
    setSelectedText(null);
  };

  const fontOptions = [
    "Arial",
    "Comic Sans MS",
    "Impact",
    "Verdana",
    "Times New Roman",
    "Courier New",
  ];

  return (
    <div className={`w-full h-full ${active ? 'ring-2 ring-meme-purple' : ''}`}>
      <div 
        className="relative bg-secondary/20 rounded-lg w-full h-64 flex flex-col items-center justify-center overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imageUrl ? (
          <>
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={imageUrl} 
                alt="Meme template" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Text elements */}
            {texts.map((textElement) => (
              <div
                key={textElement.id}
                className={`absolute cursor-move p-1 ${selectedText === textElement.id ? 'ring-2 ring-meme-blue' : ''}`}
                style={{
                  left: `${textElement.x}%`,
                  top: `${textElement.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, textElement.id)}
                onClick={() => setSelectedText(textElement.id)}
              >
                <div
                  style={{
                    fontSize: `${textElement.fontSize}px`,
                    fontFamily: textElement.fontFamily,
                    color: textElement.color,
                    fontWeight: textElement.bold ? 'bold' : 'normal',
                    fontStyle: textElement.italic ? 'italic' : 'normal',
                    textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
                    textAlign: 'center',
                  }}
                >
                  {textElement.text}
                </div>
                {selectedText === textElement.id && (
                  <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-md shadow-md p-2 w-64 z-20">
                    <Textarea
                      value={textElement.text}
                      onChange={(e) => onTextChange(textElement.id, { text: e.target.value })}
                      className="mb-2"
                      rows={2}
                    />
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <Button
                        size="sm"
                        variant={textElement.bold ? "default" : "outline"}
                        onClick={() => onTextChange(textElement.id, { bold: !textElement.bold })}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={textElement.italic ? "default" : "outline"}
                        onClick={() => onTextChange(textElement.id, { italic: !textElement.italic })}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Text className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Font</label>
                            <select
                              className="w-full border border-input p-2 rounded-md"
                              value={textElement.fontFamily}
                              onChange={(e) => onTextChange(textElement.id, { fontFamily: e.target.value })}
                            >
                              {fontOptions.map((font) => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                  {font}
                                </option>
                              ))}
                            </select>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm" variant="outline" style={{ backgroundColor: textElement.color }}>
                            <Palette className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Color</label>
                            <Input
                              type="color"
                              value={textElement.color}
                              onChange={(e) => onTextChange(textElement.id, { color: e.target.value })}
                              className="h-8"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2 mb-2">
                      <label className="text-sm font-medium">Font Size: {textElement.fontSize}px</label>
                      <Slider
                        value={[textElement.fontSize]}
                        min={12}
                        max={72}
                        step={1}
                        onValueChange={(value) => onTextChange(textElement.id, { fontSize: value[0] })}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => onRemoveText(textElement.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Remove Text
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <Button size="sm" onClick={onAddText} className="bg-background/80 hover:bg-background">
                <Plus className="h-4 w-4 mr-1" /> Text
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <Upload className="h-10 w-10 text-meme-purple mx-auto mb-2" />
            <p className="text-foreground/70 mb-3">Upload an image or GIF</p>
            <Button onClick={handleImageUploadClick} className="meme-btn">
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeEditor;
