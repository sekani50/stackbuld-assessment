"use client"

import { TProduct } from "@/types"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib"

export function ProductWidget({product}:{product: TProduct}) {
    const router = useRouter()
    return (
        <div
        role="button"
        onClick={() => router.push(`/admin/product/${product.id}`)}
        className="w-[200px] sm:w-[280px] group flex flex-col shadow items-start justify-start"
      >
        <div className="w-full rounded-t-lg h-[12rem] sm:h-[15rem] relative">
        <Image
          src={product.images[0]}
          alt=""
          width={700}
          height={600}
          className="w-full h-[12rem] rounded-t-lg sm:h-[15rem]"
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
                Number(product.discount) > 0 && "line-through text-gray-500 "
              )}
            >
              N{Number(product.price).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    )
}