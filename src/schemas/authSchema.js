import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "the name should be at least 3 characters" })
    .max(50),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: 
"The password must be at least 8 characters long." }),
  confirmPassword: z.string(),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, { message: "The phone number is incorrect (it must be Egyptian)"}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // مكان ظهور الخطأ
});