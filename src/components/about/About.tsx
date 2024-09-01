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
        <strong className="text-base sm:text-xl">Stack Shop</strong> lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.


      </div>

      
    </div>
  );
}
