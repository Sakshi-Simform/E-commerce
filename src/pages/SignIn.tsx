import { SignInForm } from "@/Auth/SignInForm";

export const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 h-[100vh]">
      <div className="flex items-center gap-3">

        <span className="text-5xl font-medium bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
          SmartBasket
        </span>
      </div>
      <div>
        <SignInForm />
      </div>
    </div>
  );
};