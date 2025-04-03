import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutDeveloperPage = () => {
  return (
    <AuthLayout>
      <div className="container py-12">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight">About the Developer</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Meet the person behind BlogGenie
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1 hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 aspect-square w-32 overflow-hidden rounded-full hover:scale-105 transition-transform">
                <img
                  src="/Tirth.png"
                  alt="Developer"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardTitle>Tirth Choksi</CardTitle>
              <CardDescription>AI & Full Stack Developer</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-center">
              <p className="text-sm text-muted-foreground">
                Building the future of content creation with AI
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button size="icon" variant="outline" asChild className="hover:scale-110 transition-transform">
                  <a href="https://github.com/Tirthchoksi22" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild className="hover:scale-110 transition-transform">
                  <a href="https://www.linkedin.com/in/tirth-choksi-44667b1b8/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild className="hover:scale-110 transition-transform">
                  <a href="https://x.com/Tirth_dev22" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">X</span>
                  </a>
                </Button>
                
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline" asChild className="hover:bg-primary hover:text-white transition-colors">
                <a href="mailto:tirthchoksi2204@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Bio & Experience */}
          <Card className="md:col-span-2 animate-fade-in transition-all hover:shadow-lg duration-300" style={{ animationDelay: "150ms" }}>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Hello, I'm Tirth Choksi, a passionate developer with expertise in AI and full-stack development. 
                I created BlogGenie to help content creators leverage the power of artificial intelligence 
                to generate high-quality blog content quickly and efficiently.
              </p>
              <p>
                With over 2 years of experience in software development, I specialize in building 
                intuitive and powerful web applications that solve real-world problems. My background 
                in natural language processing and machine learning has been instrumental in developing 
                the AI algorithms that power BlogGenie.
              </p>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="mb-3 text-lg font-medium">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "AI/ML", "NLP", "Python", "AWS", "UI/UX Design", "Tailwind CSS"].map((skill, index) => (
                    <span 
                      key={skill} 
                      className="rounded-full bg-primary-foreground px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors hover:scale-105 transform" 
                      style={{ transition: "all 0.3s ease", transitionDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="mb-3 text-lg font-medium">My Mission</h3>
                <p>
                  I believe in democratizing content creation by providing powerful AI tools that allow 
                  anyone to create professional-quality content regardless of their writing experience. 
                  BlogGenie is built with this mission in mind - to empower creators and businesses to 
                  express their ideas effectively through technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AboutDeveloperPage;
