"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { cn } from "@/lib";
import { GrStorage } from "react-icons/gr";

import { Button } from "@/components/ui";
import { CgMenuLeft } from "react-icons/cg";

import { navLinks } from "@/constants/constants";



export const Container = ({ children }: { children: React.ReactNode }) => {
  const [isNav, setNav] = useState(false);

  
  function onClose() {
    setNav((nav) => !nav);
  }

  return (
    <>
      <div
        className={`w-full  right-0 sm:right-[16px] z-40 fixed bg-white border-b border-gray-200  flex justify-between items-center `}
      >
        <div className="px-6 h-[3.5rem] sm:h-[4.5rem] justify-between   w-full flex items-center">
          <div className="flex items-center  bg-basePrimary gradient-text text-lg font-semibold sm:text-2xl gap-x-2">
            Stack Shop Admin
          </div>
          <div className="flex items-center gap-x-2">
           <p className="w-1 h-1"></p>
            <Button
              type="button"
              onClick={onClose}
              className="block xl:hidden  h-10   rounded-md bg-none"
            >
              <CgMenuLeft className="text-xl  sm:text-[22px] text-zinc-600" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "xl:w-[calc(100%-250px)]  min-[1280px]:float-right px-2 sm:px-6 pt-[5rem] pb-14 sm:pt-24 "
        )}
      >
        {children}
      </div>
      <SideNavs isNav={isNav} close={onClose} />
    </>
  );
};

function SideNavs({ close, isNav }: { close: () => void; isNav: boolean }) {
  const pathname = usePathname();



  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
      className={cn(
        `fixed z-[45] bottom-0 top-0  sm:top-[4.6rem] bg-white left-0 h-full sm:h-[92vh] modal swipeInLeft`,
        isNav
          ? "w-full bg-white/50  min-[1280px]:w-[250px]"
          : "max-[1280px]:hidden w-[250px] "
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="  flex flex-col border-r bg-basePrimary relative overflow-y-auto items-center h-full w-[200px] sm:w-[250px] cursor-pointer   text-mobile"
      >
        <div className=" p-3 h-fit mt-2 w-full">
          <div className="flex   flex-col mb-10 items-center w-full justify-center">
            <ul className="flex flex-col gap-y-2 items-start justify-start w-full">
              {navLinks.map(({ link, name, icon: Icon }, index) => {
                return (
                  <li key={index} className="w-full">
                    <Link
                      onClick={close}
                      href={link}
                      className={cn(
                        "px-3 py-2 flex text-white rounded-md gap-x-2 items-center  w-full",
                        pathname === String(link) &&
                          "font-medium  text-baseColor bg-white"
                      )}
                    >
                      <Icon size={22} />
                      <span>{name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
       
      <div className="px-3 absolute inset-x-0 bottom-20 w-full">
      <Button
      onClick={() => {
        localStorage.clear()
        window.open('/', '_self')
      }}
      className="text-baseSecondary h-10 gap-x-2 items-center justify-start font-medium bg-white w-full ">
        <GrStorage size={22}/>
        Clear Storage</Button>
      </div>
      </div>
    </div>
  );
}

