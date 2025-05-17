"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Customer } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface CustomerComponentProps {
  customer: Customer;
}

const CustomerComponent: React.FC<CustomerComponentProps> = ({ customer }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleMedicalClick = () => {
    setIsLoading(true);
    router.push(`/admin/medicalRecord/${customer.id}`);
  };

  return (
    <main className="w-[80%] mx-6 p-6 space-y-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {customer.name}
          </h1>
          <p className="text-gray-500">{customer.nickname || "Sin alias"}</p>
        </div>
        <div className="flex flex-col gap-y-2 w-[15vw]">
          <Button variant={"outline"} onClick={handleMedicalClick}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Antecedentes Médicos"
            )}
          </Button>
          <Button variant={"outline"}>Historia Clínica</Button>
        </div>
      </div>

      {/* Información personal */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Información personal
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{customer.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p>{customer.phone || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nacionalidad</p>
            <p>{customer.nationality || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Género</p>
            <p>{customer.gender || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de nacimiento</p>
            <p>
              {customer.birthDate
                ? format(new Date(customer.birthDate), "dd/MM/yyyy")
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Dirección */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Dirección</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Dirección</p>
            <p>{customer.address || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ciudad</p>
            <p>{customer.city || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Provincia</p>
            <p>{customer.province || "-"}</p>
          </div>
          {/* <div>
                <p className="text-sm text-gray-500">Código Postal</p>
                <p>{customer.postalCode || "-"}</p>
              </div> */}
        </div>
      </div>
    </main>
  );
};

export default CustomerComponent;
