import type { AuthTokens } from "@/types/auth.type";

const AUTH_TOKEN_KEY = "e-commerce-auth-tokens";

const storeTokens = (token: AuthTokens) => {
  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
};

const getStoredTokens = (): AuthTokens | null => {
  const data = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!data) return null;

  try {
    const tokens: AuthTokens = JSON.parse(data);
    if (tokens.accessToken && tokens.refreshToken) {
      return tokens;
    }
    return null;
  } catch {
    return null;
  }
};

const clearTokens = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export { storeTokens, getStoredTokens, clearTokens };