interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER" | string;
  contactNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profileCompleted: boolean;
  teacher?: null | unknown;
  student?: null | unknown;
}
interface SignupSigninResponseSuccess {
  status: "success";
  message: string;
  data: {
    user: UserData;
    accessToken: string;
    refreshToken: string;
  };
}

interface SignupSignupResponseError {
  status: "error";
  message: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

type SignupSignupResponse =
  | SignupSigninResponseSuccess
  | SignupSignupResponseError;

export type {
  SignupData,
  UserData,
  SignupSigninResponseSuccess,
  SignupSignupResponseError,
  SignupSignupResponse,
  AuthTokens,
};