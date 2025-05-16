"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CustomersColumn, columns } from "./columns";

interface CustomersClientProps {
  data: CustomersColumn[];
}

export const CustomersClient: React.FC<CustomersClientProps> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <div className="px-4 overflow-auto">
        <div className="min-w-[800px]">
          <DataTable columns={columns} data={data} searchKey="name" />
        </div>
      </div>
    </div>
  );
};
