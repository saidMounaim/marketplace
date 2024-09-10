import * as z from "zod";

enum Category {
  CLOTHES = "Clothes",
  ELECTRONICS = "Electronics",
  FURNITURE = "Furniture",
  TOYS = "Toys",
  BOOKS = "Books",
}

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
  contact: z.string().email({
    message: "Please enter a valid email address.",
  }),
  category: z.nativeEnum(Category),
  images: z.array(z.instanceof(File)).min(1, {
    message: "Please upload at least one image.",
  }),
});

export type addAdValues = z.infer<typeof addAdSchema>;
