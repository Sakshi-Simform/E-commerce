import { useState } from "react";
import { Link } from "react-router";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/user";
import { supabase } from "@/supabase-client";
import { useFormik } from "formik";

export const SignInForm = () => {
  const [authError, setAuthError] = useState<string | null>(null);

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
    onSubmit: async (values) => {
      setAuthError(null);
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setAuthError("Invalid email or password");
          } else if (error.message.includes("Email not confirmed")) {
            setAuthError("Please verify your email first");
          } else {
            setAuthError("An error occurred during login");
          }
          return;
        }
      } catch (error) {
        setAuthError("An unexpected error occurred");
        console.error(error);
      }
    },
  });

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
        className="mt-8 w-full bg-gradient-to-r from-green-400 to-teal-600 hover:from-blue-500 hover:to-indigo-500 text-white text-lg py-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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