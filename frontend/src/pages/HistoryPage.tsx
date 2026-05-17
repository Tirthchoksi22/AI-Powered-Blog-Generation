
import AuthLayout from "@/components/layout/AuthLayout";
import BlogHistory from "@/components/blog/BlogHistory";

const HistoryPage = () => {
  return (
    <AuthLayout requireAuth>
      <div className="container py-12">
        <BlogHistory />
      </div>
    </AuthLayout>
  );
};

export default HistoryPage;
