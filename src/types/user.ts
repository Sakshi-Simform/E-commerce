interface User {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: Gender;
    contactNumber: string;
    password: string;
    confirmPassword: string;
  }
  
  type Gender = "male" | "female" | "other";
  
  export type { User, Gender };