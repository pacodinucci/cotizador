import React from "react";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CustomerComponent from "@/components/global/customer-component";

interface CustomerIdPageProps {
  params: {
    customerId: string;
  };
}

const CustomerIdPage = async ({ params }: CustomerIdPageProps) => {
  const customer = await db.customer.findUnique({
    where: {
      id: params.customerId,
    },
  });

  if (!customer) {
    return notFound();
  }

  //   console.log(customer);

  return <CustomerComponent customer={customer} />;
};

export default CustomerIdPage;
