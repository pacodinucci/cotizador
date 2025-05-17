"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

const UserComponent = () => {
  const { data: session } = useSession();
  if (!session?.user) return null;

  const { name, image, role } = session.user as {
    name: string;
    image?: string;
    role?: string;
  };

  return (
    <div className="px-4 py-2 mb-2 border border-neutral-200 rounded-xl shadow-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar>
              <AvatarImage src={image || ""} alt={name} />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {role || "usuario"}
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
          >
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserComponent;
