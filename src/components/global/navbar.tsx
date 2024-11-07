"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="relative h-[18vh] bg-navbarImage bg-contain w-full flex justify-center items-center shadow-lg shadow-[#bcbcbc]">
      <Image
        src="/logow2.png"
        alt="logo clinica w"
        width={250}
        height={0}
        className="md:w-[320px]"
      />
      <div className="absolute top-2 right-2">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button
            onClick={() => router.push("/sign-in")}
            className="bg-transparent"
          >
            Ingresar
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
