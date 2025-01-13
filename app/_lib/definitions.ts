import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.coerce
    .string()
    .email({ message: "Invalid email format. " })
    .min(5, { message: "Email must be at least 5 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
});

export const SigninFormSchema = z.object({
  email: z.coerce
    .string()
    .email({ message: "Invalid email format. " })
    .min(5, { message: "Email must be at least 5 characters long." }),
  password: z.string(),
  // .min(8, { message: "Password must be at least 8 characters long." })
  // .max(20, { message: "Password cannot exceed 20 characters." }),
});

//########################################################################
//NOTE:--> Don't think password validation necessary for the login, right??
//########################################################################
