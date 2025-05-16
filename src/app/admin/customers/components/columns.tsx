"use client";

import { ColumnDef } from "@tanstack/react-table";
// import {CellAction} from "./cell-action"

export type CustomersColumn = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  createdAt: string;
};

export const columns: ColumnDef<CustomersColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "dni",
    header: "DNI",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de ingreso",
  },
];
