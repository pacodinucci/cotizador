"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="relative h-[18vh] bg-navbarImage bg-contain w-full flex justify-center items-center shadow-lg shadow-[#bcbcbc]">
      <Image
        src="/logow2.png"
        alt="logo clinica w"
        width={250}
        height={0}
        className="md:w-[320px]"
      />
      <div className="absolute top-2 right-2"></div>
    </div>
  );
};

export default Navbar;
