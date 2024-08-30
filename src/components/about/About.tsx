import Image from "next/image";

export default function About() {
  return (
    <div className="w-full">
      <div className="w-full relative h-[200px] sm:h-[250px]">
        <div className="w-full bg-basePrimary/40 h-full inset-0 flex items-center justify-center absolute m-auto">
          <p className="font-semibold text-white text-lg sm:text-2xl lg:text-3xl">
            About Us
          </p>
        </div>
        <Image
          className="w-full h-[200px] object-cover sm:h-[250px]"
          alt=""
          width={2000}
          height={500}
          src="/images/phone.jpg"
        />
      </div>
      <div className="w-full mx-auto my-8 sm:my-16 px-4 max-w-4xl leading-8">
        <strong>Stack Shop</strong> 
      </div>

      <div className="w-full mx-auto my-8 sm:my-16 px-4 max-w-4xl">
      
      </div>
    </div>
  );
}
