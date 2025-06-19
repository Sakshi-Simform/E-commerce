import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/utils/auth";
import { checkAuth } from "@/utils/authValidation";
import { useSession } from "@/Hooks/useSession";
import type {
  SignupSignupResponse,
  SignupSignupResponseError,
} from "@/types/auth.type";

export const useSigninUser = () => {
  const navigate = useNavigate();
  const { setSession } = useSession();

  return useMutation({
    mutationFn: signInUser,
    onSuccess: async (data: SignupSignupResponse) => {
      if (data.status === "success") {
        const session = await checkAuth();
        setSession(session);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error: SignupSignupResponseError) => {
      console.error(error);
    },
  });
};