import * as Yup from "yup";

const AddUserSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
    .min(2, "First Name must be at least 2 characters")
    .max(15, "First Name must be at most 15 characters"),

  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
    .min(2, "Last Name must be at least 2 characters")
    .max(15, "Last Name must be at most 15 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1")
    .max(100, "Age must be lest then 100")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian contact number"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long and contain both letters and numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export { AddUserSchema };