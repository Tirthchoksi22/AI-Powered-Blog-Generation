
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="container flex h-[80vh] items-center justify-center">
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
