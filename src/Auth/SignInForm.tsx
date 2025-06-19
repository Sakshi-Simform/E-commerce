import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSigninUser } from "@/Hooks/useSigninUser";

export const SignInForm = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const { mutate: signInUser, error, isError, isPending } = useSigninUser();

  const loginUser = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<Pick<User, "email" | "password">>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUser,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setAuthError(null);
      signInUser(values);
    },
  });

  useEffect(() => {
    if (isError && error) {
      setAuthError(error.message);
    }
  }, [isError, error]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center min-h-[80vh] justify-center">
        <div className="mb-8 relative">
          <div
            className="w-10 h-10 border-4 border-t-[#] border-r-[#0792dd]/30 border-b-[#0792dd]/10 border-l-[#0792dd]/70 rounded-full animate-spin relative z-10"
            role="status"
            aria-label="Loading"
          />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-4 bg-gradient-to-t from-transparent to-[rgba(219,68,68,0.1)] blur-sm"></div>
        </div>
        <p className="text-xl text-gray-600 mt-4 font-medium">Signin...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-md"
      noValidate
    >
      <h1 className="text-3xl font-semibold mb-6 text-center">Login to your account</h1>

      {authError && (
        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded-md text-center font-medium">
          {authError}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <Label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
            Email
          </Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
            Password
          </Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="current-password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
        className="mt-8 w-full bg-gradient-to-r from-green-400 to-teal-600 hover:from-green-500 hover:to-indigo-500 text-white text-lg py-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Login Now
      </Button>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-blue-600 hover:underline font-semibold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};