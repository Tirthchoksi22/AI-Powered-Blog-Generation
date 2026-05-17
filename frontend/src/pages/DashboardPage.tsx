
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import BlogForm from "@/components/blog/BlogForm";
import { Sparkles } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AuthLayout requireAuth>
      <div className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold inline-flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" /> Blog Generator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill in the details below to generate your perfect blog post
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <BlogForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default DashboardPage;
