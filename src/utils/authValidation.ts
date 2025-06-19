import type { AuthTokens } from "@/types/auth.type";
import {
  clearTokens,
  getStoredTokens,
  storeTokens,
} from "@/utils/localStorageService";

const parseJwt = (token: string): { exp: number } | null => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

const isAccessTokenValid = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return false;

  const expiry = payload.exp * 1000;
  return Date.now() < expiry;
};

const refreshAccessToken = async (
  refreshToken: string
): Promise<AuthTokens | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API}/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.status === "success") {
      return {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};

export const checkAuth = async (): Promise<string | null> => {
  const tokens = getStoredTokens();

  if (!tokens) return null;

  if (isAccessTokenValid(tokens.accessToken)) {
    return tokens.accessToken;
  }

  const newTokens = await refreshAccessToken(tokens.refreshToken);

  if (!newTokens) {
    clearTokens();
    return null;
  }

  storeTokens(newTokens);
  return newTokens.accessToken;
};