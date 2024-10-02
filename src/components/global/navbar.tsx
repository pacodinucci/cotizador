import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="relative bg-navbarImage bg-contain w-full h-[18vh] flex justify-center items-center shadow-lg shadow-[#bcbcbc]">
      <Image
        src="/logow2.png"
        alt="logo clinica w"
        width={250}
        height={0}
        className="md:w-[320px]"
      />
    </div>
  );
};

export default Navbar;
