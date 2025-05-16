import Image from "next/image";
import React from "react";

const FormNavbar = () => {
  return (
    <div className="relative h-[10vh] md:h-[18vh] w-full flex justify-center items-center shadow-md shadow-[#d0d0d0] bg-[radial-gradient(ellipse_at_center,_white,_#DAE2D4)]">
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

export default FormNavbar;
