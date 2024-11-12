"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    console.log("Estado de sesión:", { user, status });
    // if (pathname.includes("admin") && user?.role !== "ADMIN") {
    //   router.push("/");
    // }
  }, [user, status]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    signOut({ callbackUrl: "/" });
    setIsMenuOpen(false);
  };

  const handleSignIn = () => {
    router.push("/auth/login");
    setIsMenuOpen(false);
  };

  return (
    <div className="relative h-[18vh] bg-navbarImage bg-contain w-full flex justify-center items-center shadow-lg shadow-[#bcbcbc]">
      <Image
        src="/logow2.png"
        alt="logo clinica w"
        width={250}
        height={0}
        className="md:w-[320px]"
      />
      <div
        className="absolute top-4 right-4 cursor-pointer flex justify-center items-center"
        onClick={toggleMenu}
      >
        <MenuIcon className="text-neutral-800 h-6 w-6" />
      </div>
      {/* Menú desplegable */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-3/4 md:w-1/4 bg-white shadow-lg z-50 flex flex-col items-start p-5"
        >
          <button
            onClick={toggleMenu}
            className="self-end mb-4 text-lg font-bold"
          >
            <X />
          </button>
          <nav>
            {status === "loading" ? (
              <p>Cargando...</p> // Muestra "Cargando..." mientras se verifica el estado de sesión
            ) : user ? (
              <div className="flex flex-col space-y-6">
                <div>
                  <p>Hola, {user.name}</p>
                </div>
                {user.role === "ADMIN" ? (
                  <div className="flex flex-col space-y-4">
                    <a
                      onClick={() => router.push("/admin")}
                      className="text-neutral-800"
                    >
                      Panel Admin
                    </a>
                    <a onClick={handleSignOut} className="text-neutral-800">
                      Cerrar sesión
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <a
                      onClick={() => router.push("/reservar-turno")}
                      className="text-neutral-800"
                    >
                      Reservar turno
                    </a>
                    <a
                      onClick={() => router.push("/cuenta")}
                      className="text-neutral-800"
                    >
                      Cuenta
                    </a>
                    <a onClick={handleSignOut} className="text-neutral-800">
                      Cerrar sesión
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a onClick={handleSignIn} className="text-neutral-800">
                Iniciar sesión
              </a>
            )}
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
