"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/global/file-dropzone";
import { useRouter } from "next/navigation";
import { createPrices } from "../../../actions/create-prices";
import { oswald } from "@/lib/fonts";
import { Separator } from "../ui/separator";

const CreatePricesComponent = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleFileProcessed = async (data: any[]) => {
    const [headers, ...rows] = data;

    const prices = rows.map((row) => ({
      code: row[0],
      title: row[1],
      zone: row[2],
      price: row[3],
      smallZone: row[4],
    }));

    const success = await createPrices(prices);
    if (success) {
      setUploadStatus("Precios actualizados!");
      //   router.push("/prices");
    } else {
      setUploadStatus("Failed to upload prices.");
    }
  };

  return (
    <div className="flex flex-col gap-y-8 w-full px-48">
      <h1
        className={`${oswald.className} uppercase text-3xl px-6 text-neutral-700`}
      >
        Actualizar Precios
      </h1>
      <Separator />
      <div className="px-6">
        <FileDropzone onFileProcessed={handleFileProcessed} />
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default CreatePricesComponent;
