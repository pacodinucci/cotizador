import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="relative bg-navbarImage bg-contain w-full h-[15vh] flex justify-center items-center shadow-md shadow-[#bcbcbc]">
      <Image
        src="/logow.png"
        alt="logo clinica w"
        width={1000}
        height={0}
        className="w-[1000px] md:w-[600px]"
      />
    </div>
  );
};

export default Navbar;
