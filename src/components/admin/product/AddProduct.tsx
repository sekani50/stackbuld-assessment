"use client";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  Input,
  Button,
  TextEditor,
} from "@/components/ui";
import { productSchema } from "@/validations/global";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { nanoid } from "nanoid";
import useCategoryStore from "@/store/globalCategoryStore";
import { LuImagePlus } from "react-icons/lu";
import { useEffect, useMemo, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { ReactSelect } from "@/components/ui/ReactSelect";
import useProductStore from "@/store/globalProductStore";
import toast from "react-hot-toast";

function ImagesUpload({
  form,
}: {
  form: UseFormReturn<z.infer<typeof productSchema>, any, any>;
}) {
  const [images, setImages] = useState<string[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setImages((prevImages) => [...prevImages, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (images && images.length > 0) {
      form.setValue("images", images);
    }
  }, [images]);

  return (
    <div className="w-full flex flex-wrap items-start gap-3">
      {images.map((image, index) => (
        <Image
          src={image}
          alt={`image${index}`}
          width={400}
          height={400}
          className="w-32 h-32 rounded-lg object-contain border"
        />
      ))}
      <div className="w-full sm:w-32 rounded-lg p-4 bg-basePrimary bg-opacity-80 h-32 flex items-center justify-center relative">
        <label
          htmlFor="productImageUpload"
          className="relative bg-white/50 flex z-20 items-center gap-x-2 w-full px-4  rounded-md outline-none border border-white h-12"
        >
          <div className="bg-basePrimary  rounded-full text-white flex items-center justify-center h-9 w-9">
            <div className="w-full h-full bg-white/40 absolute inset-0"></div>
            <LuImagePlus size={20} />
          </div>
          <span className="text-sm text-white">Upload Product Image</span>
          <input
            id="productImageUpload"
            type="file"
            onChange={(e) => handleChange(e)}
            accept="image/*"
            className="w-full h-full absolute inset-0 "
            hidden
          />
        </label>
      </div>
    </div>
  );
}
export function AddProduct({ close }: { close: () => void }) {
  const { categories, setCategories } = useCategoryStore(); // Use the global category store
  const { products, setProducts } = useProductStore(); // Use the global product store
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: nanoid(),
    },
  }); // Initialize the form

  async function onSubmit(values: z.infer<typeof productSchema>) {
    // Add your form submission logic here
    if (!values.images) {
      toast.error("Please upload at least one image");
      return;
    }

    const selectedCategory = categories?.find(
      (category) => category.id === values.category
    );
    // Add category to the global category store
    if (products !== null) {
      setProducts([
        ...products,
        {
          ...values,
          images: values.images as string[],
          price: Number(values.price),
          discount: Number(values.discount),
          category: selectedCategory!,
        },
      ]);
    } else {
      setProducts([
        {
          ...values,
          images: values.images as string[],
          price: Number(values.price),
          discount: Number(values.discount),
          category: selectedCategory!,
        },
      ]);
    }

    // Reset the form values
    form.reset();

    // Close the modal when done
    close();
  }

  // Dropdown for categories
  const categoriyList = useMemo(() => {
    if (categories) {
      return categories.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      });
    } else {
      return [];
    }
  }, [categories]);

  return (
    <div className="w-full fixed inset-0 bg-pink-100 z-50 overflow-y-auto">
      <Button className="w-fit absolute top-4 left-3 h-fit" onClick={close}>
        <IoReturnUpBack size={22} />
      </Button>
      <div className="w-[95%] max-w-2xl mx-auto h-fit grid grid-cols-1 gap-4 mt-10 bg-white rounded-lg px-4 py-6 absolute inset-x-0">
        <h2 className="font-semibold text-[15px] sm:text-lg">Add Product</h2>
        {/* Form inputs go here */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex gap-y-3 items-start flex-col justify-start"
          >
            <ImagesUpload form={form} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Name"
                      type="text"
                      className="w-full px-4 h-12 border-basePrimary bg-baseTertiary/10 rounded-md "
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
                    <ReactSelect
                      placeHolder="Select a Category"
                      options={categoriyList}
                      bgColor="#fdbada"
                      height="48px"
                      borderColor="#FF057C"
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
                      className="w-full px-4 h-12 border-basePrimary bg-baseTertiary/10 rounded-md "
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
                      className="w-full px-4 h-12 border-basePrimary bg-baseTertiary/10 rounded-md "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TextEditor
              onChange={(value) => form.setValue("description", value)}
            />

            <Button
              type="submit"
              className="mt-3 h-12 bg-basePrimary text-white "
            >
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
