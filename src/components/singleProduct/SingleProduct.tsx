"use client";

import useProductStore from "@/store/globalProductStore";
import { cn } from "@/lib";
import { Button } from "@/components/ui";
import { FaOpencart } from "react-icons/fa6";

import { ProductImages } from "../admin/_components/ProductImage";
export default function SingleProduct({ id }: { id: string }) {

  const { products } = useProductStore();

  if (!products) return;
  const product = products.find((p) => p.id === id);


  return (
    <div className="w-full p-4 sm:p-6 mx-auto">
     
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-7">
        <div className="w-full md:col-span-4">
          {product?.images &&  <ProductImages images={product?.images}/>}
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-y-4 sm:gap-y-6 md:col-span-2">
          <p className="font-semibold text-base sm:text-xl">
            {product?.name ?? ""}
          </p>
          <p className="flex items-center gap-x-2 font-semibold text-desktop sm:text-lg ">
            {" "}
            {Number(product?.discount) > 0 && (
              <span className="">
                N{Number(product?.discount || 0).toLocaleString()}
              </span>
            )}
            <span
              className={cn(
                "",
                Number(product?.discount || 0) > 0 &&
                  "line-through text-gray-500 "
              )}
            >
              N{Number(product?.price || 0).toLocaleString()}
            </span>
          </p>
          
          <div className="flex items-center gap-x-2 text-sm sm:text-lg">
            <p>Category:</p>
            <p className="capitalize">{product?.category?.name ?? ""}</p>
  
        </div>

        <Button className="h-12 bg-basePrimary w-full gap-x-2 text-white font-medium">
            <FaOpencart size={22}/>
            <p>Buy Now</p></Button>
        
        </div>
      </div>

      <div className="w-full grid grid-cols-1 mt-6 sm:mt-12 gap-y-4 sm:gap-y-8">
        <h2 className="font-semibold text-base sm:text-xl">Description</h2>

        <p
          className="description-innerhtml"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        />
      </div>

      
    </div>

    
  );
}
