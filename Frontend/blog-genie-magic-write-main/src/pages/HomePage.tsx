
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layout/AuthLayout";
import { ChevronRight, Sparkles, FileText, Clock, Zap } from "lucide-react";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <AuthLayout>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-fade-in">
              <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm backdrop-blur-xl">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse-slow" />
                  <span>AI-Powered Blog Writing</span>
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create Amazing Blog Content in Seconds
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                BlogGenie turns your ideas into fully-formed blog posts with a click.
                Save hours of writing time and generate engaging content for any topic.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90 hover:scale-105 transition-transform">
                  <a href={isLoggedIn ? "/dashboard" : "/signup"}>
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white/10 hover:scale-105 transition-transform">
                  <a href="#features">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[400px] items-center justify-center lg:max-w-none">
              <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-sm animate-scale-in">
                <div className="space-y-2 rounded-lg bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">Blog Generator</div>
                    <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Blog Title</div>
                      <div className="h-4 w-full rounded bg-gray-100" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Tone</div>
                      <div className="h-4 w-1/3 rounded bg-gray-100" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Length</div>
                      <div className="h-2 w-3/4 rounded bg-gray-100" />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-1/2 rounded-full bg-primary py-1.5 text-center text-sm text-white hover:shadow-lg hover:scale-105 transition-all">
                        Generate
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-lg bg-white p-4">
                  <div className="space-y-3">
                    <div className="h-2 w-full rounded bg-gray-100" />
                    <div className="h-2 w-5/6 rounded bg-gray-100" />
                    <div className="h-2 w-4/6 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Why Choose BlogGenie?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our AI-powered platform offers everything you need to create high-quality blog content quickly and easily.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 transform transition-transform duration-300" style={{ transitionDelay: "0ms" }}>
              <div className="rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Fast Generation</h3>
              <p className="text-center text-muted-foreground">
                Generate complete blog posts in seconds, not hours. Save time and boost your productivity.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 transform transition-transform duration-300" style={{ transitionDelay: "150ms" }}>
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Customizable Output</h3>
              <p className="text-center text-muted-foreground">
                Control the tone, length, and style of your blog posts to match your brand voice.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 transform transition-transform duration-300" style={{ transitionDelay: "300ms" }}>
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">History Tracking</h3>
              <p className="text-center text-muted-foreground">
                Access your previously generated blog posts anytime. Never lose your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary animate-pulse-slow">
              Get Started Today
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of content creators who save time and effort with BlogGenie.
            </p>
            <Button asChild size="lg" className="mt-4 animate-bounce hover:animate-none">
              <a href={isLoggedIn ? "/dashboard" : "/signup"}>
                {isLoggedIn ? "Go to Dashboard" : "Sign Up for Free"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default HomePage;
