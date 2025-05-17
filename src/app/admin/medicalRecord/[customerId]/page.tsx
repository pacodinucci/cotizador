import MedicalRecordComponent from "@/components/global/medical-record-component";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface MedicalRecordPageProps {
  params: {
    customerId: string;
  };
}

const MedicalRecordPage = async ({ params }: MedicalRecordPageProps) => {
  const medicalRecord = await db.medicalRecord.findFirst({
    where: {
      customerId: params.customerId,
    },
  });

  if (!medicalRecord) {
    return notFound();
  }

  const customer = await db.customer.findUnique({
    where: {
      id: params.customerId,
    },
  });

  const customerName = customer?.name;

  return (
    <MedicalRecordComponent
      record={medicalRecord}
      customerName={customerName}
    />
  );
};

export default MedicalRecordPage;
