"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {};

const PDFUploader = (props: Props) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("✅ PDF cargado exitosamente en Pinecone.");
      } else {
        setMessage("❌ Error al cargar el PDF.");
      }
    } catch (error) {
      console.error("Error al subir el PDF:", error);
      setMessage("❌ Error de red al cargar el PDF.");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
  });

  return (
    <div className="flex flex-col items-center pt-12 min-h-screen bg-gray-100 p-4">
      <div
        {...getRootProps()}
        className={`w-96 p-8 border-2 border-dashed rounded-lg cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-600">
          {isDragActive
            ? "Suelta el archivo aquí..."
            : "Arrastra y suelta el PDF aquí o haz clic para seleccionar"}
        </p>
      </div>

      {uploading && <p className="mt-4 text-blue-500">Cargando PDF...</p>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default PDFUploader;
