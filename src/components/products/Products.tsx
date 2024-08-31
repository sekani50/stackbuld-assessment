"use client";

import useCategoryStore from "@/store/globalCategoryStore";
import useProductStore from "@/store/globalProductStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { Button, Input } from "../ui";
import { CiFilter } from "react-icons/ci";

export default function Products() {
  const router = useRouter();
  const { categories } = useCategoryStore(); // Get the categories from the global store
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // State to store selected categories id
  const { products } = useProductStore(); // Get the products from the global store
  const params = useSearchParams();
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const query = params.get("q");
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

 // Filter products based on selected categories and price range
 const filteredProducts = useMemo(() => {
    if (Array.isArray(products) && products.length > 0) {
      return products.filter((product) => {
        const isCategorySelected =
          selectedCategories.length === 0 || selectedCategories.includes(product.category.id);
        const preferredPrice =  product.discount > 0 ? product?.discount : product?.price
        const isWithinPriceRange =
          (!lowPrice || preferredPrice>= lowPrice) &&
          (!highPrice || preferredPrice <= highPrice);

        return isCategorySelected && isWithinPriceRange;
      });
    } else {
      return products;
    }
  }, [selectedCategories, products, lowPrice, highPrice]);

  function toggleShowMobileCategory() {
    setIsMobileCategoryOpen((p) =>!p);
  }
  return (
    <div className="w-full mt-8 sm:mt-12">
      
        <div className="border-b px-4 sm:px-8 pb-2 sm:pb-3  w-full flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="w-full  font-bold text-2xl sm:text-5xl">
        {query ?? "All Products"}
      </h1>
      <div className="flex  items-center gap-x-2">
        <p className="font-semibold">From:</p>
        <Input 
        value={highPrice ??""}
       onChange={(e) => setHighPrice(e.target.valueAsNumber)} 
        placeholder="price" type="number" className="w-[100px] h-12"/>
        <p className="font-semibold">To:</p>
        <Input
        value={lowPrice ?? ""}
         onChange={(e) => setLowPrice(e.target.valueAsNumber)} 
        placeholder="price" type="number" className="w-[100px] h-12"/>

        <div className="relative md:hidden block">
        <Button 
        onClick={toggleShowMobileCategory}
        className="md:hidden text-white px-0 h-12 w-12 bg-basePrimary">
            <CiFilter size={22}/>
        </Button>
       {isMobileCategoryOpen && <div className="absolute right-[0.3rem] top-[3.2rem]">
        <div
            onClick={() => setIsMobileCategoryOpen(false)}
            className="fixed inset-0 w-full h-full bg-none z-[48]"></div>
            <div 
            onClick={(e) => e.stopPropagation()}
            className="w-[160px] h-fit z-50 max-h-[12rem] shadow overflow-y-auto flex flex-col items-start justify-start gap-y-3 relative bg-white rounded-lg py-4 px-2">
                     {/** product categories */}
          <p className="font-semibold mb-3 text-sm">Categories</p>

{Array.isArray(categories) &&
  categories.map((category) => (
    <label
      onClick={() => {
        setSelectedCategories(
          selectedCategories.includes(category.id)
            ? selectedCategories.filter((id) => id !== category.id)
            : [...selectedCategories, category.id]
        );
      }}
      key={category.id}
      htmlFor="category"
      className="w-full flex items-center gap-x-2"
    >
      <input
        type="checkbox"
        checked={selectedCategories.includes(category.id)}
        name="category"
        className="accent-basePrimary h-4 w-4 rounded-xl"
      />
      <span>{category.name}</span>
    </label>
  ))}
            </div>
        </div>}
        </div>
      </div>
        </div>
  
      <div className="w-full  grid grid-cols-1 md:grid-cols-9 ">
        <div className="px-4 w-full border-r py-4 sm:py-8 hidden md:block md:col-span-2">
          {/** product categories */}
          <p className="font-semibold mb-3 text-lg">Categories</p>

          {Array.isArray(categories) &&
            categories.map((category) => (
              <label
                onClick={() => {
                  setSelectedCategories(
                    selectedCategories.includes(category.id)
                      ? selectedCategories.filter((id) => id !== category.id)
                      : [...selectedCategories, category.id]
                  );
                }}
                key={category.id}
                htmlFor="category"
                className="w-full flex items-center gap-x-2"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  name="category"
                  className="accent-basePrimary h-4 w-4 rounded-xl"
                />
                <span>{category.name}</span>
              </label>
            ))}
        </div>
        <div className="w-full p-4 sm:p-6 md:col-span-7">
          {/** product list */}
          <div className="w-full grid grid-cols-2 gap-3 lg:gap-5 lg:grid-cols-3">
            {Array.isArray(filteredProducts) &&
              filteredProducts.map((product) => (
                <div
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
    </div>
  );
}
