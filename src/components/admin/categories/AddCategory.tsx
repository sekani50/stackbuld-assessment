"use client"

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  Input,
  Button,
} from "@/components/ui";
import { categorySchema } from "@/validations/global";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { nanoid } from "nanoid";
import useCategoryStore from "@/store/globalCategoryStore";
import { LuImagePlus } from "react-icons/lu";
import { useEffect, useMemo } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { TCategory } from "@/types";
import useProductStore from "@/store/globalProductStore";
export function AddCategory({ close, category }: {category?: TCategory, close: () => void }) {
  const { categories, setCategories } = useCategoryStore(); // Use the global category store
  const {products, setProducts} = useProductStore()
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: nanoid(),
    },
  }); // Initialize the form

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    // Add your form submission logic here
    if (!values.image) {
        toast.error("Please select an image for the category.");
        return ;
    }
    const image = await new Promise((resolve) => {
      if (typeof values.image === "string") {
        resolve(values.image);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(values.image[0]);
      }
    });

    // Add category to the global category store
    if (categories !== null) {
     if (category && category.id) {
      // update category
      setCategories(categories.map((cat) => {
        if (cat.id === category.id) {
          return {
            name: values.name,
            image: image as string,
            id: cat.id
          }
        }
        return cat
      }))

      // update product category details
     if (Array.isArray(products)) {
      setProducts(products.map((product) => {
        if (product.category.id === category.id) {
          return {
           ...product,
            category: {
              name: values.name,
              image: image as string,
              id:category.id
            }
          }
        }
        return product
      }))
     }
     }
     else {
      setCategories([...categories, { ...values, image: image as string }]);
     }
    } else {
      setCategories([{ ...values, image: image as string }]);
    }

    // Reset the form values
    form.reset();

    // Close the modal when done
    close();
  }

  const addedImage = form.watch("image");

  // Generate the category image based on the uploaded image
  const categoryImage = useMemo(() => {
    if (typeof addedImage === "string") {
      return addedImage;
    } else if (addedImage && addedImage[0]) {
      return URL.createObjectURL(addedImage[0]);
    } else {
      return null;
    }
  }, [addedImage]);

  // Update the form values when a category is provided
  useEffect(() => {
if (category) {
  form.setValue("id", category.id);
  form.setValue("name", category.name);
  form.setValue("image", category.image);
}
  },[category])
  return (
    <div className="w-full fixed inset-0  bg-pink-100 z-50">
      <Button className="w-fit absolute top-4 left-3 h-fit" onClick={close}>
        <IoReturnUpBack size={22} />
      </Button>
      <div className="w-[95%] max-w-xl m-auto h-fit bg-white rounded-lg py-6 px-4 grid grid-cols-1 gap-4 absolute inset-0">
        <h2 className="font-semibold text-[15px] sm:text-lg">Add Category</h2>
        {/* Form inputs go here */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full gap-y-3 flex items-start flex-col justify-start"
          >
            <div className="w-full  rounded-lg p-4 bg-basePrimary bg-opacity-80 h-56 flex items-center justify-center relative">
              <div className="w-full h-full bg-white/40 absolute inset-0"></div>
              {categoryImage && (
                <Image
                  src={categoryImage}
                  width={500}
                  height={500}
                  className="w-full h-56 inset-0 z-10 rounded-lg absolute"
                  alt=""
                />
              )}
              <label
                htmlFor="categoryImageUpload"
                className="relative bg-white/50 flex z-20 items-center gap-x-2 w-full px-4  rounded-md outline-none border border-white h-12"
              >
                <div className="bg-basePrimary  rounded-full text-white flex items-center justify-center h-9 w-9">
                  <div className="w-full h-full bg-white/40 absolute inset-0"></div>
                  <LuImagePlus size={20} />
                </div>
                <span className="text-sm text-white">
                  Upload Category Image
                </span>
                <input
                  id="categoryImageUpload"
                  type="file"
                  {...form.register("image")}
                  accept="image/*"
                  className="w-full h-full absolute inset-0 "
                  hidden
                />
              </label>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Name"
                      type="text"
                      className="w-full px-4 h-12 bg-baseTertiary/10 border-basePrimary rounded-md "
                      {...form.register("name")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-3 font-medium w-full h-12 bg-basePrimary text-white ">
              Add Category
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
