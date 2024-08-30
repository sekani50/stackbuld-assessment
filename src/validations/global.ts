import * as z from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(3, {message: "Name is required"}),
  image: z.any()
  
})

//description: z.string().min(1).max(255),