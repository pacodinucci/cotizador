"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/global/file-dropzone";
import { useRouter } from "next/navigation";
import { createPrices } from "../../../actions/create-prices";

const CreatePricesComponent = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleFileProcessed = async (data: any[]) => {
    const [headers, ...rows] = data;

    const prices = rows.map((row) => ({
      title: row[0],
      zone: row[1],
      price: row[2],
    }));

    const success = await createPrices(prices);
    if (success) {
      setUploadStatus("Success! Prices have been uploaded.");
      //   router.push("/prices");
    } else {
      setUploadStatus("Failed to upload prices.");
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-3xl">Actualizar Precios</h1>
      <FileDropzone onFileProcessed={handleFileProcessed} />
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default CreatePricesComponent;
