import type { SignupSignupResponse, AuthTokens } from "@/types/auth.type";
import type { User } from "@/types/user";
import { storeTokens } from "@/utils/localStorageService";

export async function signUpUser(
  newUser: Omit<User, "age" | "gender" | "confirmPassword">
): Promise<SignupSignupResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API}/admin/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }
    );

    const data: SignupSignupResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Signup failed:", error);
    return { status: "error", message: "Network or server error" };
  }
}

export async function signInUser(
  credentials: Pick<User, "email" | "password">
): Promise<SignupSignupResponse> {
  try {
    const response = await fetch(`${import.meta.env.VITE_AUTH_API}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data: SignupSignupResponse = await response.json();

    if (response.ok && data.status === "success") {
      const tokens: AuthTokens = {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };
      storeTokens(tokens);
    } else {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    } else {
      return { status: "error", message: "Network or Server error" };
    }
  }
}