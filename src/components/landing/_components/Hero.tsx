"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function Hero() {
  const router = useRouter();

 
  return (
    <>
      <div className="carousel-container h-[400px] sm:h-[450px] 2xl:h-[560px] relative">
        <Carousel
          autoPlay={true}
          interval={6000}
          showIndicators={false}
          showThumbs={false}
          infiniteLoop={true}
          className="carousel"
        >
          <div className="w-full h-[400px] sm:h-[450px] 2xl:h-[560px]">
            <Image
              className="h-[400px] sm:h-[450px] 2xl:h-[560px] object-cover"
              src="/images/super.jpg"
              alt="image2"
              width={2000}
              height={700}
            />
          </div>
          <div className="w-full h-[400px] sm:h-[450px] 2xl:h-[560px]">
            <Image
              className="h-[400px] sm:h-[450px] 2xl:h-[560px] object-cover"
              src="/images/weekend.jpg"
              alt="image2"
              width={2000}
              height={700}
            />
          </div>

          <div className="w-full h-[400px] sm:h-[450px] 2xl:h-[560px]">
            <Image
              className="h-[400px] sm:h-[450px] 2xl:h-[560px] object-cover"
              src="/images/flash.jpg"
              alt="image2"
              width={2000}
              height={700}
            />
          </div>
          <div className="w-full h-[400px] sm:h-[450px] 2xl:h-[560px]">
            <Image
              className="h-[400px] sm:h-[450px] 2xl:h-[560px] object-cover"
              src="/images/christmas.jpg"
              alt="image1"
              width={2000}
              height={700}
            />
          </div>
        </Carousel>
        <div className="w-full absolute inset-0  sm:mt-0 my-0 sm:my-auto mx-auto sm:mx-0 sm:ml-20  sm:w-[80vw] h-full items-start justify-center px-4 sm:px-8 text-gray-100  flex flex-col ">
          <div className="w-full flex flex-col items-start justify-start">
            <h1 className="font-bold  text-2xl sm:text-4xl mb-5">
              Stack Shop
            </h1>
          </div>
          <h3 className="font-semibold text-sm sm:text-xl mb-2">
            Electronics Appliances and Computers.
          </h3>

          <div className="flex items-center mt-3 gap-x-2">
            <Button
              // onClick={() => router.push("/sign-up")}
              className="font-medium h-11 sm:h-14 px-8 bg-basePrimary rounded-lg text-[#FFF5DC]"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
