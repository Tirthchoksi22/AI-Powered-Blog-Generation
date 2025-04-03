
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Menu, Sparkles, User, History, LogOut, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const isAuthenticated = !!user;
  const isHomePage = location.pathname === "/";

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                <a
                  href="/"
                  className="text-lg font-semibold"
                >
                  BlogGenie
                </a>
                <div className="flex flex-col space-y-2">
                  <a
                    href="/about"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Info className="h-4 w-4" />
                    About Developer
                  </a>
                  {isAuthenticated ? (
                    <>
                      <a
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                      >
                        <Sparkles className="h-4 w-4" />
                        Generate Blog
                      </a>
                      <a
                        href="/history"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                      >
                        <History className="h-4 w-4" />
                        History
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <a
            href="/"
            className="hidden items-center gap-2 lg:flex"
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BlogGenie</span>
          </a>
        </div>
        <div className="hidden gap-6 md:flex">
          <a
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isHomePage ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Home
          </a>
          <a
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/about" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            About Developer
          </a>
          {isAuthenticated && (
            <>
              <a
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Generate Blog
              </a>
              <a
                href="/history"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/history" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                History
              </a>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/dashboard">Generate Blog</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/history">View History</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/about">About Developer</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <a href="/login">Login</a>
              </Button>
              <Button asChild>
                <a href="/signup">Sign Up</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
