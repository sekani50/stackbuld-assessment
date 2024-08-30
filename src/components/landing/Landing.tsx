
import Link from "next/link";
import {

  Hero,
 
} from "./_components";
import Image from "next/image";

export default function Landing() {
  return (
    <div>
      {/* <TopNav /> */}
      <Hero />
     <div className="w-full px-4 sm:px-6 my-8 sm:my-12">
     <div className="w-full mb-8 sm:mb-12 grid grid-cols-1 gap-y-4 sm:gap-y-6">
      <div className="w-full flex items-center justify-between">
      <h2 className="font-semibold text-base sm:text-xl">New Deals</h2>
      <Link className="text-xs sm:text-sm text-basePrimary font-medium" href={"/"}>See All</Link>
      </div>

        {/* Product Cards */}
      </div>
     <div className="w-full mb-8 sm:mb-12 grid grid-cols-1 gap-y-4 sm:gap-y-6">
     <div className="w-full flex items-center justify-between">
      <h2 className="font-semibold text-base sm:text-xl">Top Selling</h2>
      <Link className="text-xs sm:text-sm text-basePrimary font-medium" href={"/"}>See All</Link>
      </div>

        {/* Product Cards */}
      </div>
      <Link href="/">
      <Image src="/images/christmas.jpg" alt="christmas" width={2500} height={600} className="w-full h-[12rem] object-cover sm:h-[18rem]"/>
      </Link>

      
      <div className="w-full mb-6 grid grid-cols-1 gap-y-4 mt-8 sm:mt-12 sm:gap-y-6">
      <div className="w-full flex items-center justify-between">
      <h2 className="font-semibold text-base sm:text-xl">Flash Sales</h2>
      <Link className="text-xs sm:text-sm text-basePrimary font-medium" href={"/"}>See All</Link>
      </div>

        {/* Product Cards */}
      </div>
     </div>
    </div>
  );
}
