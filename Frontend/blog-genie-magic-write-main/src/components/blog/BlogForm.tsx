import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Copy, Check } from "lucide-react";
import { blogAPI } from "@/lib/api";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [tone, setTone] = useState("informative");
  const [length, setLength] = useState(500);
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateBlog = async () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your blog post",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedBlog("");

    try {
      const response = await blogAPI.generateBlog(title, tone, length, keywords);
      setGeneratedBlog(response.content);

      // Save to history
      const history = JSON.parse(localStorage.getItem("blogHistory") || "[]");
      const newBlog = {
        id: Date.now(),
        title,
        tone,
        length,
        keywords: keywords || "None",
        content: response.content,
        date: new Date().toISOString(),
      };
      localStorage.setItem("blogHistory", JSON.stringify([newBlog, ...history]));

      toast({
        title: "Blog generated",
        description: "Your blog post has been generated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBlog);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Blog content has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to convert markdown-style bold text to HTML
  const formatBlogContent = (content: string) => {
    // Replace markdown-style bold (**text**) with HTML bold
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace markdown-style headings with HTML headings
    formattedContent = formattedContent.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    formattedContent = formattedContent.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    formattedContent = formattedContent.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Replace line breaks with <br> tags
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    
    return formattedContent;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Blog Post</CardTitle>
        <CardDescription>
          Fill in the details below to generate your perfect blog post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tone">Writing Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Blog Length (words)</Label>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={100}
            max={2000}
            step={100}
          />
          <p className="text-sm text-muted-foreground">{length} words</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (optional)</Label>
          <Input
            id="keywords"
            placeholder="Enter keywords separated by commas"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <Button
          onClick={generateBlog}
          className="w-full"
          disabled={isGenerating}
        >
          {isGenerating ? (
            "Generating..."
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Blog
            </>
          )}
        </Button>
      </CardContent>
      {generatedBlog && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated Blog</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div 
              className="prose prose-sm max-w-none dark:prose-invert p-4 border rounded-md min-h-[200px] overflow-auto"
              dangerouslySetInnerHTML={{ __html: formatBlogContent(generatedBlog) }}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BlogForm;
