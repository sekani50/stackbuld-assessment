import { ScrollableCards } from "@/components/ui/ScollableCardWrapper";
import { cn } from "@/lib";
import Image from "next/image";
import { useState } from "react";

export function ProductImages({images}:{images:string[]}) {
  const [currentImage, setCurrentImage] = useState(0);
  
  return (
    <div className="w-full flex flex-col items-start justify-start gap-y-4">
      <Image
        className="w-full rounded-lg h-[20rem] sm:h-[35rem]"
        src={images[currentImage]}
        alt="product"
        width={900}
        height={800}
      />
      <ScrollableCards>
      {images.map((image, index) => (
              <button
                onClick={() => setCurrentImage(index)}
                key={index}
                className=
                  "flex relative items-center gap-x-2"
              >
                <Image
                  className="w-[8rem] rounded-lg h-[8rem]"
                  src={image}
                  alt="product"
                  width={200}
                  height={200}
                />
               {index !== currentImage && <div className="absolute bg-white/50 inset-0 w-full h-full"></div>}
              </button>
            ))}
      </ScrollableCards>
    </div>
  );
}
