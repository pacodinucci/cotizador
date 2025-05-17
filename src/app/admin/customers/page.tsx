import React from "react";
import { CustomersClient } from "./components/client";
import db from "@/lib/db";
import { inter, montserrat } from "@/lib/fonts";
import { CustomersColumn } from "./components/columns";
import { format } from "date-fns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const CustomersPage = async () => {
  const customers = await db.customer.findMany();

  const customersFormat: CustomersColumn[] = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    dni: customer.dni ?? "",
    createdAt: format(customer.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <main className="min-h-screen md:min-h-0 bg-white md:rounded-md md:shadow-md mb-10">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-6 py-4">
          <Heading
            title="Pacientes"
            description="Listado de pacientes registrados"
          />
        </div>
        <Separator />
      </div>
      <CustomersClient data={customersFormat} />
    </main>
  );
};

export default CustomersPage;
