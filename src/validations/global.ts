import * as z from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(3, {message: "Name is required"}),
  image: z.any()
  
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string(),
  discount: z.string().min(1, { message: "Discount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  image: z.any(),
}).refine((data) => {
  const price = parseInt(data.price, 10);
  const discount = parseInt(data.discount, 10);
  return discount < price;
}, {
  message: "Discount price must be less than the actual price",
  path: ["discount"], // This will associate the error with the 'discount' field
});