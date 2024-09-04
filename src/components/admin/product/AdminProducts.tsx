"use client";

import { Button } from "@/components/ui/Button";
import useProductStore from "@/store/globalProductStore";
import { useState } from "react";
import { RiApps2AddLine } from "react-icons/ri";
import { AddProduct } from "./AddProduct";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib";
import { Deletes } from "../_components/actions/Deletes";
export default function AdminProducts() {
  const router = useRouter();
  const { products, setProducts } = useProductStore(); // Get prodiucts from global store
  const [isOpen, setOpen] = useState(false); // Add product modal state

  function handleOpenModal() {
    setOpen((p) => !p); // Toggle modal state
  }

  function deleteProduct(id:string) {
    // Delete product from store
   if (products) {
    setProducts(products?.filter((pr) => pr.id!== id));
   }
  }
  return (
    <div className="w-full">
      {/* Handle Empty Product */}
      {Array.isArray(products) && products.length > 0 && (
        <div className="w-full flex items-center justify-between mb-6 sm:mb-12">
          <h1 className="text-base sm:text-2xl font-semibold">
            Admin Products
          </h1>
          <Button
            onClick={handleOpenModal}
            className="w-fit bg-basePrimary text-white font-medium h-11 gap-x-2"
          >
            <RiApps2AddLine size={20} />
            <p>Add Product</p>
          </Button>
        </div>
      )}
      {/* Handle Empty Product */}
      { products === null || (Array.isArray(products) && products.length === 0 ) && (
        <div className="w-full flex flex-col gap-y-5 items-center justify-center h-[40rem]">
          <h2 className="font-semibold text-base sm:text-xl bg-basePrimary gradient-text">
            No product has been added yet
          </h2>
          <Button
            onClick={handleOpenModal}
            className="w-fit bg-basePrimary text-white font-medium h-11 sm:h-12 gap-x-2"
          >
            <RiApps2AddLine size={20} />
            <p>Add Product</p>
          </Button>
        </div>
      )}
      {/* Render Products */}
      {Array.isArray(products) && products.length > 0 && (
        <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              role="button"
              onClick={() => router.push(`/admin/product/${product.id}`)}
              className="w-full group flex flex-col shadow items-start justify-start"
            >
              <div className="w-full rounded-t-lg h-[12rem] sm:h-[16rem] relative">
              <Image
                src={product.images[0]}
                alt=""
                width={700}
                height={600}
                className="w-full h-[12rem] rounded-t-lg sm:h-[16rem]"
              />
               <div className="w-full absolute rounded-t-lg inset-0 bg-black/20 h-full">
               <div className="w-full absolute  inset-x-0 bottom-0 p-4 flex sm:hidden group-hover:flex items-end justify-end gap-x-2">
                  
                   <Deletes key={product.id} deleteFunction={() => deleteProduct(product.id)}/>
                </div>
                </div>
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
                      Number(product.discount) > 0 && "line-through text-gray-500 "
                    )}
                  >
                    N{Number(product.price).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 
      Add product modal here.
      */}
      {isOpen && <AddProduct close={handleOpenModal} />}
    </div>
  );
}
