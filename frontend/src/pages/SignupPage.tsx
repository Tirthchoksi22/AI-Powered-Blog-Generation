
import AuthLayout from "@/components/layout/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthLayout>
      <div className="container flex h-[80vh] items-center justify-center">
        <SignupForm />
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
