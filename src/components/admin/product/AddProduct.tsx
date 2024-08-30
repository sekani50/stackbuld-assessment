import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  Input,
  Button,
} from "@/components/ui";
import { productSchema } from "@/validations/global";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { nanoid } from "nanoid";
import useCategoryStore from "@/store/globalCategoryStore";
import { LuImagePlus } from "react-icons/lu";
import { useMemo } from "react";
import { IoReturnUpBack } from "react-icons/io5";
export function AddProduct({ close }: { close: () => void }) {
  const { categories, setCategories } = useCategoryStore(); // Use the global category store
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: nanoid(),
    },
  }); // Initialize the form

  async function onSubmit(values: z.infer<typeof productSchema>) {
    // Add your form submission logic here

    const image = await new Promise((resolve) => {
      if (typeof values.image === "string") {
        resolve(values.image);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(values.image);
      }
    });

    // Add category to the global category store
    if (categories !== null) {
      setCategories([...categories, { ...values, image: image as string }]);
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
  return (
    <div className="w-full fixed inset-0 bg-baseTertiary/10 z-50 overflow-y-auto">
      <Button className="w-fit absolute top-4 left-3 h-fit" onClick={close}>
        <IoReturnUpBack size={22} />
      </Button>
      <div className="w-[95%] max-w-4xl mx-auto h-fit grid grid-cols-1 gap-4 absolute inset-x-0">
        <h2 className="font-semibold text-[15px] sm:text-lg">Add Product</h2>
        {/* Form inputs go here */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex items-start flex-col justify-start"
          >
            <div className="w-full rounded-lg p-4 bg-basePrimary bg-opacity-80 h-56 flex items-center justify-center relative">
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
                      className="w-full px-4 h-11 bg-baseTertiary/10 rounded-md "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      className="w-full px-4 h-11 bg-baseTertiary/10 rounded-md "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      className="w-full px-4 h-11 bg-baseTertiary/10 rounded-md "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                    defaultValue={0}
                      placeholder="0"
                      type="price"
                      className="w-full px-4 h-11 bg-baseTertiary/10 rounded-md "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <Button type="submit" className="mt-3 bg-basePrimary text-white ">
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
