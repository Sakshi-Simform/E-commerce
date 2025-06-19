import { useState } from "react";
import { Link } from "react-router";
import { CalendarIcon } from "lucide-react";
import { useFormik } from "formik";
import { format } from "date-fns";
import type { Gender, User } from "@/types/user";
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
import { useSignupUser } from "@/Hooks/useSignupUser";

export const SignUpForm = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { mutate: signUpUser, isPending } = useSignupUser();

  const formik = useFormik<Omit<User, "age" | "gender">>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: AddUserSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const newUser = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        contactNumber: String(values.contactNumber),
        password: values.password,
      };

      signUpUser(newUser);
    },
  });

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
        <p className="text-xl text-gray-600 mt-4 font-medium">
          Creating account for you...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we are creating account for you...
        </p>
      </div>
    );
  }

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

      {/* First-name & Last-name */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="firstName" className="block mb-1 text-gray-700 font-medium">
            First Name <span className="text-red-700">*</span>
          </Label>
          <Input
            name="firstName"
            placeholder="Enter your First Name"
            id="firstName"
            className="h-11 w-full"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.firstName}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="lastName" className="block mb-1 text-gray-700 font-medium">
            Last Name <span className="text-red-700">*</span>
          </Label>
          <Input
            name="lastName"
            placeholder="Enter your Last Name"
            id="lastName"
            className="h-11 w-full"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.lastName}</p>
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
            placeholder="Enter your Email"
            id="email"
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
          <Input placeholder="Enter your City" id="city" className="h-11 w-full" />
        </div>
      </div>

      {/* State & Address */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="state" className="block mb-1 text-gray-700 font-medium">
            State
          </Label>
          <Input
            placeholder="Enter your State"
            id="state"
            className="h-11 w-full"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="address" className="block mb-1 text-gray-700 font-medium">
            Address
          </Label>
          <Input
            placeholder="Enter your Address"
            id="address"
            className="h-11 w-full"
          />
        </div>
      </div>

      {/* Age & Gender */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="age" className="block mb-1 text-gray-700 font-medium">
            Age
          </Label>
          <Input
            name="age"
            placeholder="Enter your Age"
            id="age"
            className="h-11 w-full"
            type="number"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="gender" className="block mb-1 text-gray-700 font-medium">
            Gender
          </Label>
          <Select
            name="gender"
            onValueChange={(value) =>
              formik.setFieldValue("gender", value as Gender)
            }
          >
            <SelectTrigger id="gender" className="w-full py-[18.5px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md z-50">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contact Number & Profile Image */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <Label htmlFor="contactNumber" className="block mb-1 text-gray-700 font-medium">
            Contact Number <span className="text-red-700">*</span>
          </Label>
          <Input
            name="contactNumber"
            placeholder="Enter your Contact Number"
            id="contactNumber"
            className="h-11 w-full"
            type="number"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.contactNumber}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="picture" className="block mb-1 text-gray-700 font-medium">
            Profile Picture
          </Label>
          <Input
            id="picture"
            type="file"
            className="h-10 text-gray-700 cursor-pointer"
          />
        </div>
      </div>

      {/* BirthDate & Password */}
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
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select Your Birth Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-md z-50" align="start">
              <Calendar
                mode="single"
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
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
              Password <span className="text-red-700">*</span>
            </Label>
            <Input
              name="password"
              placeholder="Enter Password"
              id="password"
              type="password"
              className="h-11 w-full text-gray-700 cursor-pointer"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>
        </div>
      </div>

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

      <div>
        <Button
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-green-400 to-teal-600 hover:bg-blue-900 disabled:bg-blue-400 cursor-pointer"
          type="submit"
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