"use client";

import React, { useState } from "react";
import { montserrat } from "@/lib/fonts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePersonalData } from "../../../context/personal-data-context";
import { useRouter } from "next/navigation";

const FormPage = () => {
  const { setEmail } = usePersonalData();
  const [localEmail, setLocalEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (!localEmail.includes("@")) return alert("Ingresá un email válido");
    setEmail(localEmail);
    router.push("/form/personalData");
  };

  return (
    <div
      className={`${montserrat.className} max-w-3xl mx-16 px-4 py-10 text-neutral-800`}
    >
      <h1 className="text-5xl font-bold mb-4">
        Historia Médica Clínica W <span className="text-4xl">😊</span>
      </h1>

      <p className="mb-4 text-lg">
        En el siguiente cuestionario te solicitaremos información sobre tus
        datos personales y antecedentes médicos.
      </p>

      <p className="mb-4 text-lg">
        Agradeceremos tu tiempo y atención para completar cada pregunta
        detalladamente ya que toda la información que nos brindes nos permitirá
        brindarte el mejor de los cuidados, asegurándonos de realizar siempre un
        procedimiento seguro y adecuado a tus necesidades.
      </p>

      <p className="mb-4 text-sm text-neutral-600 italic">
        (Para tu tranquilidad, estos datos son de carácter privado y de uso
        médico exclusivo).
      </p>

      {/* 📩 Campo para ingresar email */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          type="email"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          placeholder="Ingresá tu email"
          className="w-full md:w-96"
        />
        <Button onClick={handleNext}>Siguiente</Button>
      </div>
    </div>
  );
};

export default FormPage;
