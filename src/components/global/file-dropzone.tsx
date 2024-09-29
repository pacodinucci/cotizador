import { montserrat } from "@/lib/fonts";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

type FileDropzoneProps = {
  onFileProcessed: (data: any[]) => void;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileProcessed }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convertir a JSON

        onFileProcessed(jsonData); // Enviar los datos procesados al padre
      };
      reader.readAsArrayBuffer(file);
    },
    [onFileProcessed]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ], // MIME type para archivos .xlsx
      "text/csv": [".csv"], // MIME type para archivos .csv
    },
  });

  return (
    <div
      {...getRootProps()}
      //   style={{
      //     border: "2px dashed #0070f3",
      //     padding: "20px",
      //     textAlign: "center",
      //   }}
      className="border-2 border-dashed rounded-lg border-neutral-500 px-2 md:px-24 py-4 md:py-16"
    >
      <input {...getInputProps()} />
      <p
        className={`${montserrat.className} text-lg text-center text-neutral-700`}
      >
        Click o arrastrar archivo (.csv o .xsls)
      </p>
    </div>
  );
};

export default FileDropzone;
