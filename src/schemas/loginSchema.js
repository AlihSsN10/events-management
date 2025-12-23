import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z
    .string()
    .min(1, { message: "كلمة المرور مطلوبة" }),
});