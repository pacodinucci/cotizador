"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
  Files,
  UsersRound,
  FileClock,
  ShieldUser,
  Cross,
  BotMessageSquare,
  ClipboardPlus,
  ClipboardMinus,
  BanknoteArrowDown,
} from "lucide-react";
import Image from "next/image";
import UserComponent from "./user-component";
import { useEffect } from "react";

const itemsProfesionales = [
  {
    title: "Calendario",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Pacientes",
    url: "/admin/customers",
    icon: UsersRound,
  },
  {
    title: "Historias Clínicas",
    url: "#",
    icon: FileClock,
  },
  {
    title: "Documentación",
    url: "#",
    icon: Files,
  },
];

const itemsConfiguracion = [
  {
    title: "Profesionales",
    url: "#",
    icon: ShieldUser,
  },
  {
    title: "Tratamientos",
    url: "#",
    icon: Cross,
  },
  {
    title: "Agente IA",
    url: "#",
    icon: BotMessageSquare,
  },
];

const itemsAdministracion = [
  {
    title: "Ventas",
    url: "#",
    icon: ClipboardPlus,
  },
  {
    title: "Compras",
    url: "#",
    icon: ClipboardMinus,
  },
  {
    title: "Pagos",
    url: "#",
    icon: BanknoteArrowDown,
  },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  useEffect(() => {
    if (open) {
      document.body.classList.add("sidebar-open");
      document.body.classList.remove("sidebar-closed");
    } else {
      document.body.classList.add("sidebar-closed");
      document.body.classList.remove("sidebar-open");
    }
  }, [open]);

  return (
    <Sidebar
      className="z-50 border border-r-neutral-200 dark:border-r-slate-800"
      variant="inset"
    >
      <SidebarHeader>
        <Image src={"/logow.png"} alt="logo clinica w" width={900} height={0} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Profesionales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsProfesionales.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Opciones de Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsConfiguracion.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Reportes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsAdministracion.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserComponent />
      </SidebarFooter>
    </Sidebar>
  );
}
