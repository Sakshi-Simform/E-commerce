import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/utils/auth";
import type {
  SignupSignupResponse,
  SignupSignupResponseError,
} from "@/types/auth.type";
import { useNavigate } from "react-router";

export const useSignupUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: SignupSignupResponse) => {
      if (data.status === "success") {
        alert("Account created successfully");
        navigate("/sign-in");
      } else {
        alert(
          data.message || "An error occurred during signup. Please try again"
        );
      }
    },
    onError: (error: SignupSignupResponseError) => {
      console.error(error.message);
    },
  });
};