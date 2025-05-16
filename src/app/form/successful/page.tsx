import { montserrat } from "@/lib/fonts";
import React from "react";

type Props = {};

const FormSuccessfulPage = (props: Props) => {
  return (
    <div
      className={`${montserrat.className} max-w-3xl nd:mx-16 px-4 py-10 text-neutral-800`}
    >
      <h1 className="text-5xl font-bold mb-6">
        Gracias por completar el formulario!{" "}
        <span className="text-4xl">😊</span>
      </h1>
      <p className="mb-4 text-xl">Ya creamos tu historia clínica.</p>
      <div className="bg-zinc-50 rounded-md p-6">
        <p className="mb-4 text-lg">
          🕐 Puntualidad: Llegar 5 min antes del turno
        </p>
        <p className="mb-4 text-lg">
          ✅ Asistir con DNI, te lo van a pedir al ingresar al edificio.
        </p>
        <p className="mb-4 text-lg">Te esperamos ❤️</p>
      </div>
    </div>
  );
};

export default FormSuccessfulPage;
