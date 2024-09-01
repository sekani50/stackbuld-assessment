"use client";

import useProductStore from "@/store/globalProductStore";
import { cn } from "@/lib";
import { Button } from "@/components/ui";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import { AddProduct } from "./AddProduct";
import { ProductImages } from "../_components/ProductImage";
export default function ProductDetail({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useProductStore();

  if (!products) return;
  const product = products.find((p) => p.id === id);

  function toggleModal() {
    setIsOpen((p) => !p);
  }
  return (
    <div className="w-full mx-auto ">
      <div className="w-full flex items-end justify-end mb-3 sm:mb-5">
        <Button 
        onClick={toggleModal}
        className="text-baseColor">
          <BiSolidEdit size={20} />
          <p>Edit Product</p>
        </Button>
      </div>
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-7">
        <div className="w-full md:col-span-4">
          {product?.images &&  <ProductImages images={product?.images}/>}
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-y-4 sm:gap-y-6 md:col-span-3">
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
        
        </div>
      </div>

      <div className="w-full grid grid-cols-1 mt-6 sm:mt-12 gap-y-4 sm:gap-y-8">
        <h2 className="font-semibold text-base sm:text-xl">Description</h2>

        <div
          className="description-innerhtml"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        />
      </div>

      {isOpen  && <AddProduct close={toggleModal} product={product}/>}
    </div>

    
  );
}
