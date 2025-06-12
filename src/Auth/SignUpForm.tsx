import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CalendarIcon } from "lucide-react";
import { useFormik } from "formik";
import { format } from "date-fns";
import type { Gender, User } from "@/types/user";
import { supabase } from "@/supabase-client";
import { AddUserSchema } from "@/utils/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const SignUpForm = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const formik = useFormik<User>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      gender: "male",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: AddUserSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const newUser: Omit<User, "confirmPassword"> = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        age: values.age,
        gender: values.gender,
        contactNumber: values.contactNumber,
        password: values.password,
      };

      try {
        const { error } = await supabase.auth.signUp(newUser);

        if (error) {
          alert("An error occurred during signup. Please try again.");
        } else {
          alert("Account created successfully!");
          await supabase.auth.signOut();
          navigate("/sign-in");
        }
      } catch (error) {
        alert("An error occurred during signup. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg"
      noValidate
    >
      <h2
        className="text-4xl font-semibold text-center mb-10"
        role="heading"
        aria-level={2}
      >
        Create an account in{" "}
        <span className="bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
          SmartBasket
        </span>
      </h2>

      {/* First Name & Last Name */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="firstName" className="block mb-1 text-gray-700 font-medium">
            First Name <span className="text-red-700">*</span>
          </Label>
          <Input
            name="firstName"
            id="firstName"
            placeholder="Enter your First Name"
            className="h-11 w-full"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="lastName" className="block mb-1 text-gray-700 font-medium">
            Last Name <span className="text-red-700">*</span>
          </Label>
          <Input
            name="lastName"
            id="lastName"
            placeholder="Enter your Last Name"
            className="h-11 w-full"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email & City */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
            Email <span className="text-red-700">*</span>
          </Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="h-11 w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="city" className="block mb-1 text-gray-700 font-medium">
            City
          </Label>
          <Input
            id="city"
            placeholder="Enter your City"
            className="h-11 w-full"
          />
        </div>
      </div>

      {/* State & Address */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="state" className="block mb-1 text-gray-700 font-medium">
            State
          </Label>
          <Input
            id="state"
            placeholder="Enter your State"
            className="h-11 w-full"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="address" className="block mb-1 text-gray-700 font-medium">
            Address
          </Label>
          <Input
            id="address"
            placeholder="Enter your Address"
            className="h-11 w-full"
          />
        </div>
      </div>

      {/* Age & Gender */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="age" className="block mb-1 text-gray-700 font-medium">
            Age <span className="text-red-700">*</span>
          </Label>
          <Input
            name="age"
            id="age"
            type="number"
            placeholder="Enter your Age"
            className="h-11 w-full"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.age}</p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="gender" className="block mb-1 text-gray-700 font-medium">
            Gender <span className="text-red-700">*</span>
          </Label>
          <Select
  name="gender"
  value={formik.values.gender}
  onValueChange={(value) => formik.setFieldValue("gender", value as Gender)}
>
  <SelectTrigger id="gender" className="w-full h-11">
    <SelectValue placeholder="Select Gender" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="male">Male</SelectItem>
    <SelectItem value="female">Female</SelectItem>
    <SelectItem value="other">Other</SelectItem>
  </SelectContent>
</Select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.gender}</p>
          )}
        </div>
      </div>

      {/* Contact Number & Profile Picture */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="contactNumber" className="block mb-1 text-gray-700 font-medium">
            Contact Number <span className="text-red-700">*</span>
          </Label>
          <Input
            name="contactNumber"
            id="contactNumber"
            type="tel"
            placeholder="Enter your Contact Number"
            className="h-11 w-full"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.contactNumber}</p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="picture" className="block mb-1 text-gray-700 font-medium">
            Profile Picture
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            className="h-11 w-full cursor-pointer text-gray-700"
          />
        </div>
      </div>

      {/* Birth Date & Password */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="birth-date" className="block mb-1 text-gray-700 font-medium">
            Birth Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                id="birth-date"
                variant="outline"
                className="w-full h-11 justify-start font-normal cursor-pointer"
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {date ? format(date, "PPP") : "Select Your Birth Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                initialFocus
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1">
          <Label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
            Password <span className="text-red-700">*</span>
          </Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Enter Password"
            className="h-11 w-full text-gray-700"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
          )}
        </div>
      </div>

     {/* Confirm Password */}
{/* Confirm Password */}
<div className="w-1/2 pr-2 space-y-3 mb-5">
            <Label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password <span className="text-red-700">*</span>
            </Label>
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              id="confirm-password"
              type="password"
              className="h-10 text-gray-700 cursor-pointer"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          

      {/* Submit Button */}
      <div className="mb-4">
        <Button
          type="submit"
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-green-400 to-teal-600 hover:bg-blue-900 disabled:bg-blue-400"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Create Account
        </Button>
      </div>

      {/* Login Link */}
      <p className="text-center text-gray-700">
        Already have an account?{" "}
        <Link to="/">
          <span className="text-blue-600 hover:underline cursor-pointer">Login</span>
        </Link>
      </p>
    </form>
  );
};