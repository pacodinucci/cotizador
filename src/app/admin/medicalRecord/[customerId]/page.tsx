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

  return <MedicalRecordComponent record={medicalRecord} />;
};

export default MedicalRecordPage;
