"use  client";

import { Button } from "@/components/ui/Button";
import useProductStore from "@/store/globalProductStore";
import { useState } from "react";
import { RiApps2AddLine } from "react-icons/ri";
import { AddProduct } from "./AddProduct";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib";
export default function AdminProducts() {
  const router = useRouter();
  const { products } = useProductStore(); // Get prodiucts from global store
  const [isOpen, setOpen] = useState(false); // Add product modal state

  function handleOpenModal() {
    setOpen((p) => !p); // Toggle modal state
  }
  return (
    <div className="w-full">
      {/* Handle Empty Product */}
      {Array.isArray(products) && products.length > 0 && (
        <div className="w-full flex items-center justify-between mb-6 sm:mb-12">
          <h1 className="text-base sm:text-2xl font-semibold">
            Admin Categories
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
      {Array.isArray(products) && products.length === 0 && (
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
        <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <div
              role="button"
              onClick={() => router.push(`/admin/product/${product.id}`)}
              className="w-full flex flex-col shadow items-start justify-start"
            >
              <Image
                src={product.images[0]}
                alt=""
                className="w-full h-[12rem] rounded-t-lg sm:h-[16rem]"
              />
              <div className="w-full border-x border-b rounded-b-lg ">
                <p className="font-medium  my-2 text-sm sm:text-base">
                  {product.name}
                </p>
                <p className="flex items-center gap-x-2 font-medium">
                  {" "}
                  {Number(product.discount) > 0 && (
                    <span className="text-gray-500 ">
                      N{Number(product.discount).toLocaleString()}
                    </span>
                  )}
                  <span
                    className={cn(
                      "",
                      Number(product.discount) > 0 && "line-through"
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
