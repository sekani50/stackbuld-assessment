"use client";

import { Button, Input } from "@/components/ui";
import { cn } from "@/lib";
import { LuPackagePlus } from "react-icons/lu";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import useCategoryStore from "@/store/globalCategoryStore";

export function TopNav() {
  const pathname = usePathname();
 const {categories} = useCategoryStore()
  const router = useRouter();
  const [isMobileSideBar, setMobileSideBar] = useState(false);


  function onClose() {
    setMobileSideBar((prev) => !prev);
  }

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Special Deals",
      link: "/products?q=Special Deals",
    },
   
  ];
 
  return (
    <>
      <header className="w-full flex py-3 px-3  z-[100] border-b bg-white  sticky top-0  inset-x-0 sm:px-6 xl:px-8 items-center justify-between ">
        <Link href="/">
          <p className="font-medium bg-basePrimary gradient-text">
            Stack Shop
          </p>
        </Link>

        <Input
          className="w-[60%] sm:w-96 h-11  rounded-lg placeholder:text-gray-500 bg-[#FF057C]/10"
          placeholder="Search for Products"
        />

        <div className="hidden sm:flex items-center gap-x-8">
          {links.map(({ name, link }, index) => (
            <div key={index}>
              <Link
                className={cn("", pathname === link && "font-semibold")}
                href={link}
              >
                {name}
              </Link>
            </div>
          ))}
        </div>

        <Button 
        onClick={() => router.push("/admin/dashboard")}
        className="font-medium hidden sm:flex gap-x-2 text-white bg-basePrimary">
          <LuPackagePlus size={22}/>
          <p>Admin Products</p>
        </Button>

        <Button
          onClick={onClose}
          className="block sm:hidden w-fit h-fit text-basePrimary px-0"
        >
          <CgMenuRight className="text-2xl" />
        </Button>
      </header>
      <div className="w-full bg-black  text-white inset-x-0 sticky z-[100] top-[3.8rem]  px-3 sm:px-6 xl:px-8  py-3">
       <div className="w-full overflow-x-auto flex items-center justify-start gap-x-12 no-scrollbar">
        <Link href="/" className="text-white hover:border-b border-white py-1">Shop</Link>
       {Array.isArray(categories) && categories.map(({ name,image, id}) => (
          <Link
            key={name}
            className={cn(
              "min-w-max text-white p-1 hover:border-b   border-white transition-all duration-300 transform",
              pathname.includes(`/category/${id}`) && "font-medium border-b"
            )}
            href={`/category/${id}?category=${name}`}
          >
            {name}
          </Link>
        ))}
       </div>
      
      </div>
      {isMobileSideBar && (
        <MobileSideNav
          links={links}
          pathname={pathname}
          close={onClose}
    
        />
      )}
    </>
  );
}

function MobileSideNav({
  links,
  close,
  pathname,
  id,
}: {
  links: { name: string; link: string }[];
  pathname: string;
  close: () => void;
  id?: number;
}) {
  const router = useRouter();

  return (
    <div
      role="button"
      onClick={close}
      className="w-full block sm:hidden h-full fixed inset-0   z-[300]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute modal swipeIn top-0 right-0 w-[200px] h-full gap-y-4 bg-white px-4 py-6 flex flex-col items-start justify-start "
      >
        {links.map(({ name, link }) => (
          <div className="w-full">
            <Link
              onClick={close}
              className={cn(
                "w-fit px-3 text-basePrimary py-2",
                pathname === link && "font-semibold"
              )}
              href={link}
            >
              {name}
            </Link>
          </div>
        ))}


<Button 
        onClick={() => router.push("/admin/dashboard")}
        className="font-medium sm:hidden flex gap-x-2 text-white bg-basePrimary">
          <LuPackagePlus size={22}/>
          <p>Admin Products</p>
        </Button>
      
      </div>
    </div>
  );
}
