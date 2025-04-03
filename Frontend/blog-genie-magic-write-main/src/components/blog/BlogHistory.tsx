import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { History, Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogEntry {
  id: number;
  title: string;
  tone: string;
  length: number;
  keywords: string;
  content: string;
  date: string;
}

const BlogHistory = () => {
  const [blogHistory, setBlogHistory] = useState<BlogEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<BlogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("blogHistory") || "[]");
    setBlogHistory(history);
    setFilteredHistory(history);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogHistory.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.keywords.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(blogHistory);
    }
  }, [searchTerm, blogHistory]);

  const handleDeleteBlog = (id: number) => {
    const updatedHistory = blogHistory.filter((blog) => blog.id !== id);
    setBlogHistory(updatedHistory);
    setFilteredHistory(updatedHistory);
    localStorage.setItem("blogHistory", JSON.stringify(updatedHistory));
    toast({
      title: "Blog deleted",
      description: "Blog post has been deleted from your history",
    });
  };

  const handleClearHistory = () => {
    setBlogHistory([]);
    setFilteredHistory([]);
    localStorage.setItem("blogHistory", JSON.stringify([]));
    toast({
      title: "History cleared",
      description: "All blog posts have been cleared from your history",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <History className="h-6 w-6 text-primary" /> Blog History
          </h2>
          <p className="text-muted-foreground">
            View and manage your previously generated blog posts
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
                <span className="sr-only">Clear history</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete all blog posts from your history.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearHistory}>
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <History className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-xl font-medium">No blog posts found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No blog posts match your search criteria."
                  : "You haven't generated any blog posts yet."}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
              {!searchTerm && (
                <Button
                  onClick={() => window.location.href = "/dashboard"}
                  className="mt-4"
                >
                  Generate Your First Blog
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredHistory.map((blog) => (
            <Tabs key={blog.id} defaultValue="preview" className="w-full">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription>
                        Created on {formatDate(blog.date)}
                      </CardDescription>
                    </div>
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="preview" className="mt-0">
                    <div 
                      className="prose prose-sm max-w-none dark:prose-invert text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.content) }}
                    />
                  </TabsContent>
                  <TabsContent value="details" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Tone</Label>
                        <div className="rounded-md border p-2 mt-1 capitalize">
                          {blog.tone}
                        </div>
                      </div>
                      <div>
                        <Label>Length</Label>
                        <div className="rounded-md border p-2 mt-1">
                          {blog.length} words
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Keywords</Label>
                        <div className="rounded-md border p-2 mt-1">
                          {blog.keywords || "None"}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(blog.content);
                      toast({
                        title: "Copied",
                        description: "Blog content copied to clipboard",
                      });
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will delete this blog post from your history.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBlog(blog.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </Tabs>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogHistory;
