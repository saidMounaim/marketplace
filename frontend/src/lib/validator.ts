import * as z from "zod";

enum Category {
  CLOTHES = "CLOTHES",
  ELECTRONICS = "ELECTRONICS",
  FURNITURE = "FURNITURE",
  TOYS = "TOYS",
  BOOKS = "BOOKS",
}

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const addAdSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number.",
  }),
  contact: z.string().refine(
    (val) => {
      const isEmail = z.string().email().safeParse(val).success;
      const isPhone = phoneRegex.test(val);
      return isEmail || isPhone;
    },
    {
      message: "Please enter a valid email address or phone number.",
    }
  ),
  category: z.nativeEnum(Category),
  images: z.array(z.instanceof(File)).min(1, {
    message: "Please upload at least one image.",
  }),
});

export type addAdValues = z.infer<typeof addAdSchema>;

export const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type SignInValues = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof SignUpSchema>;
