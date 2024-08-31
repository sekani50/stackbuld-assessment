"use client"

import Link from "next/link";
import { FaSquareXTwitter, FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import useCategoryStore from "@/store/globalCategoryStore";
export function Footer() {
  const {categories} = useCategoryStore();
  const socialLinks = [
    { link: "https://www.instagram.com", Icon: RiInstagramFill },
    { link: "https://web.facebook.com", Icon: FaFacebook },
    { link: "https://twitter.com", Icon: FaSquareXTwitter },
  ];

  const otherLink = [
    { name: "Computers", link: "/" },
    { name: "SmartPhones", link: "/" },
    { name: "Electronics", link: "/" },

  ];
  return (
    <footer id="contact-us" className="w-full  bg-black text-gray-300 ">
      <div className="w-full py-8 sm:py-12  grid grid-cols-2 md:grid-cols-4 gap-y-8 px-4 md:px-8 lg:px-10">
        <div className="w-full col-span-full md:col-span-1">
          <Link href="/">
            <p className="bg-basePrimary gradient-text text-xl font-bold sm:text-3xl">
              Stack Shop
            </p>
          </Link>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-y-3">
          <p className="font-semibold text-base sm:text-xl mb-2">
            Categories
          </p>
          <ul className="list-disc pl-6 grid grid-cols-1 gap-y-5">
          <li>
              <Link href={"/shop"}>Shop</Link>
            </li>
            {Array.isArray(categories)  && categories.map(({ name,image,id  }, index) => (
              <li key={index}>
                <Link href={`/category/${id}?category=${name}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-3">
          <p className="font-semibold text-base sm:text-xl mb-2">Explore</p>
          <ul className="list-disc pl-6 grid grid-cols-1 gap-y-5">
            <li>
              <Link href={"/"}>Shop</Link>
            </li>
           
            <li>
              <Link href={"/products?q=Special Deals"}>Special Deals</Link>
            </li>

            <li>
              <Link href={"/about-us"}>About Us</Link>
            </li>
          </ul>
        </div>

        <div className="w-full flex col-span-2 md:col-span-1 flex-col items-start justify-start gap-y-2">
          <p className="font-semibold text-base sm:text-xl mb-2">Contact</p>
          <div className="w-full flex flex-col gap-y-2">
            <p className="font-medium ">Subscribe to NewsLetter</p>
            <div className="w-full flex ">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 w-[70%] rounded-r-none rounded-l-md"
              />
              <Button className="w-[30%] bg-basePrimary px-4 h-12 rounded-r-md rounded-l-none">
                <p className="font-medium">Subscribe</p>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            {socialLinks.map(({ link, Icon }, index) => (
              <Link key={index} href={link}>
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full   text-cakkie border-t  border-gray-500 flex items-center justify-center gap-x-2 py-4 px-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-x-2">
          Copyright{" "}
          <span className="font-semibold">{new Date().getFullYear()}.</span>
        </div>
        <p className="font-medium">All rights reserved</p>
      </div>
    </footer>
  );
}

