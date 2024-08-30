import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .min(1, { message: "Password is required" }),
});

