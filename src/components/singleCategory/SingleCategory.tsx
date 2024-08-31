"use client";

import useProductStore from "@/store/globalProductStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib";
import { Input } from "../ui";
import useCategoryStore from "@/store/globalCategoryStore";

export default function Singlecategory({ id }: { id: string }) {
    const params = useSearchParams()
    const category = params.get("category");
   const {categories} = useCategoryStore() // Access global category store
  const { products } = useProductStore(); // Access global product store
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const router = useRouter();

  const categoryData = useMemo(() => {
    return categories?.find((c) => c.id === id);
  },[categories])
  const categoryProducts = useMemo(() => {
    if (Array.isArray(products) && products.length > 0) {
      return products.filter((product) => product.category.id === id);
    } else {
      return [];
    }
  }, [id]);

  // Filter products based on selected categories and price range
  const filteredProducts = useMemo(() => {
    if (Array.isArray(categoryProducts) && categoryProducts.length > 0) {
      return categoryProducts.filter((product) => {
        const preferredPrice =
          product.discount > 0 ? product?.discount : product?.price;
        const isWithinPriceRange =
          (!lowPrice || preferredPrice >= lowPrice) &&
          (!highPrice || preferredPrice <= highPrice);

        return isWithinPriceRange;
      });
    } else {
      return categoryProducts;
    }
  }, [categoryProducts, lowPrice, highPrice]);

  return (
    <div className="w-full ">
      <div className="w-full relative h-[10rem] sm:h-[13rem]">
        <div className="w-full m-auto inset-0 h-full bg-black/30 absolute flex items-center justify-center">
          <h2 className="font-semibold text-lg sm:text-3xl text-white">
            {category ?? ""}
          </h2>
        </div>
        <Image
          src={categoryData?.image ?? ""}
          className="h-[10rem] sm:h-[13rem] w-full"
          alt="category"
          width={1800}
          height={400}
        />
      </div>

      <div className="w-full px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="flex items-start justify-start md:items-end md:justify-end mb-3 sm:mb-4">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold">From:</p>
            <Input
              value={highPrice ?? ""}
              onChange={(e) => setHighPrice(e.target.valueAsNumber)}
              placeholder="price"
              type="number"
              className="w-[100px] h-12"
            />
            <p className="font-semibold">To:</p>
            <Input
              value={lowPrice ?? ""}
              onChange={(e) => setLowPrice(e.target.valueAsNumber)}
              placeholder="price"
              type="number"
              className="w-[100px] h-12"
            />
          </div>
        </div>

        {Array.isArray(filteredProducts) && filteredProducts.length === 0 && (
          <div className="w-full flex items-center justify-center h-[20rem]">
            <h1 className="font-semibold text-xl sm:text-2xl">No Product</h1>
          </div>
        )}
        <div className="w-full grid grid-cols-2 pb-6 sm:pb-10 gap-3 md:col-span-3 lg:gap-5 lg:grid-cols-4">
          {Array.isArray(filteredProducts) &&
            filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <div
                key={product.id}
                role="button"
                onClick={() => router.push(`/admin/product/${product.id}`)}
                className="w-full group flex flex-col shadow items-start justify-start"
              >
                <div className="w-full rounded-t-lg h-[12rem] sm:h-[17rem] relative">
                  <Image
                    src={product.images[0]}
                    alt=""
                    width={700}
                    height={600}
                    className="w-full h-[12rem] rounded-t-lg sm:h-[17rem]"
                  />
                </div>
                <div className="w-full px-2 pb-2 border-x border-b rounded-b-lg ">
                  <p className="font-medium  my-2 text-sm sm:text-base">
                    {product.name}
                  </p>
                  <p className="flex items-center gap-x-2 font-medium">
                    {" "}
                    {Number(product.discount) > 0 && (
                      <span className="">
                        N{Number(product.discount).toLocaleString()}
                      </span>
                    )}
                    <span
                      className={cn(
                        "",
                        Number(product.discount) > 0 &&
                          "line-through text-gray-500 "
                      )}
                    >
                      N{Number(product.price).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
