"use client"

import Link from "next/link";
import { Hero } from "./_components";
import Image from "next/image";
import { ScrollableCards } from "../ui/ScollableCardWrapper";
import useProductStore from "@/store/globalProductStore";
import { ProductWidget } from "../widgets/ProductWidet";

import { useGetRequest } from "@/hooks/request";

export default function Landing() {
  useGetRequest();
  const { products } = useProductStore();
  return (
    <div>
      {/* <TopNav /> */}
      <Hero />
      <div className="w-full px-4 sm:px-6 my-8 sm:my-12">
        {Array.isArray(products) && products.length > 0 && (
          <div className="w-full mb-8 sm:mb-12 grid grid-cols-1 gap-y-4 sm:gap-y-6">
            <div className="w-full px-0 sm:px-4 flex items-center justify-between">
              <h2 className="font-semibold text-base sm:text-xl">New Deals</h2>
              <Link
                className="text-xs sm:text-sm text-basePrimary font-medium"
                href={"/products?q=New Deals"}
              >
                See All
              </Link>
            </div>

            {/* Product Cards */}
            <ScrollableCards>
              {products?.map((product) => (
                <ProductWidget key={product.id} product={product} />
              ))}
            </ScrollableCards>
          </div>
        )}
    
        {Array.isArray(products) && products.length > 0 && (
        <div className="w-full mb-8 sm:mb-12 grid grid-cols-1 gap-y-4 sm:gap-y-6">
            <div className="w-full px-0 sm:px-4 flex items-center justify-between">
            <h2 className="font-semibold text-base sm:text-xl">Top Selling</h2>
              <Link
                className="text-xs sm:text-sm text-basePrimary font-medium"
                href={"/products?q=Top Selling"}
              >
                See All
              </Link>
            </div>

            {/* Product Cards */}
            <ScrollableCards>
              {products?.map((product) => (
                <ProductWidget key={product.id} product={product} />
              ))}
            </ScrollableCards>
          </div>
        )}
        <Link href="/">
          <Image
            src="/images/christmas.jpg"
            alt="christmas"
            width={2500}
            height={600}
            className="w-full h-[12rem] object-cover sm:h-[18rem]"
          />
        </Link>
        {Array.isArray(products) && products.length > 0 && (
        <div className="w-full mb-6 grid grid-cols-1 gap-y-4 mt-8 sm:mt-12 sm:gap-y-6">
            <div className="w-full px-0 sm:px-4 flex items-center justify-between">
            <h2 className="font-semibold text-base sm:text-xl">Flash Sales</h2>
              <Link
                className="text-xs sm:text-sm text-basePrimary font-medium"
                href={"/products?q=Flash Sales"}
              >
                See All
              </Link>
            </div>

            {/* Product Cards */}
            <ScrollableCards>
              {products?.map((product) => (
                <ProductWidget key={product.id} product={product} />
              ))}
            </ScrollableCards>
          </div>
        )}
    
      </div>
    </div>
  );
}
