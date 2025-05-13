"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/global/navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/admin");

  if (hideNavbar) return null;

  return <Navbar />;
};

export default NavbarWrapper;
