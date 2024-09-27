"use client";

import React, { useEffect, useState } from "react";
import { montserrat } from "@/lib/fonts";
import { Dot } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPrices } from "../../../actions/get-prices";
import { usePriceStore } from "@/lib/store";
import { Separator } from "../ui/separator";

const CotizadorSteps = () => {
  const { prices, setPrices } = usePriceStore();
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [descuento, setDescuento] = useState<number>(0);
  const [descuentoGrupal, setDescuentoGrupal] = useState<number>(0);
  const [oneSessionPrice, setOneSessionPrice] = useState<number | null>(null);
  const [sixSessionsPrice, setSixSessionsPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  useEffect(() => {
    // Actualiza el descuento cuando cambia el número de zonas seleccionadas
    if (selectedTreatments.length === 2) {
      setDescuento(10);
    } else if (selectedTreatments.length === 3) {
      setDescuento(20);
    } else if (selectedTreatments.length === 4) {
      setDescuento(25);
    } else if (selectedTreatments.length >= 5) {
      setDescuento(30);
    } else {
      setDescuento(0); // Sin descuento si es menos de 2 zonas
    }
  }, [selectedTreatments]);

  const handleSelectTreatment = (treatment: string) => {
    setSelectedTreatments((prevSelected) => {
      if (prevSelected.includes(treatment)) {
        return prevSelected.filter((item) => item !== treatment);
      } else {
        return [...prevSelected, treatment];
      }
    });
  };

  const isSelected = (treatment: string) =>
    selectedTreatments.includes(treatment);

  return (
    <div className="bg-gray-100 min-h-screen px-4 flex flex-col gap-y-4 pt-8">
      <div
        className={`${montserrat.className} bg-white w-full min-h-[140px] px-4 py-1 flex flex-col gap-y-4`}
      >
        <div className="flex flex-col">
          <h3 className="font-light flex items-center">
            1er paso <Dot className="text-[#EAC45E] -mx-2" size={40} />
            <span className="font-medium">Selecciona las zonas</span>
          </h3>
          <p className="text-neutral-500 text-sm -mt-3">
            Cuantas más zonas mayor es el descuento!
          </p>
        </div>
        <div>
          <Select>
            <SelectTrigger className="rounded-none outline-none focus:outline-none focus-visible:outline-none active:outline-none">
              <SelectValue
                placeholder={
                  selectedTreatments.length > 0
                    ? selectedTreatments[selectedTreatments.length - 1]
                    : "Selecciona una o más zonas"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {/* Sección Alta */}
              <div className="px-8 py-2 font-bold text-gray-600">Zona Alta</div>
              <Separator className="mb-1" />
              {prices
                .filter((price) => price.zone === "Alta")
                .map((price, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectTreatment(price.title)}
                    className={`cursor-pointer px-8 py-2 ${
                      isSelected(price.title) ? "bg-[#EAC45E] text-white" : ""
                    }`}
                  >
                    {price.title}
                  </div>
                ))}

              {/* Sección Media */}
              <div className="px-8 py-2 font-bold text-gray-600">
                Zona Media
              </div>
              <Separator className="mb-1" />
              {prices
                .filter((price) => price.zone === "Media")
                .map((price, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectTreatment(price.title)}
                    className={`cursor-pointer px-8 py-2 ${
                      isSelected(price.title) ? "bg-[#EAC45E] text-white" : ""
                    }`}
                  >
                    {price.title}
                  </div>
                ))}

              {/* Sección Baja */}
              <div className="px-8 py-2 font-bold text-gray-600">Zona Baja</div>
              <Separator className="mb-1" />
              {prices
                .filter((price) => price.zone === "Baja")
                .map((price, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectTreatment(price.title)}
                    className={`cursor-pointer px-8 py-2 ${
                      isSelected(price.title) ? "bg-[#EAC45E] text-white" : ""
                    }`}
                  >
                    {price.title}
                  </div>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mostrar tratamientos seleccionados con viñeta */}
        {selectedTreatments.length > 0 && (
          <div className="mt-4">
            <ul className="list-none mt-2 space-y-1">
              {selectedTreatments.map((treatment, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Dot className="text-[#EAC45E]" size={40} />
                  <span className="text-gray-800 font-medium">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className={`${montserrat.className} bg-white w-full min-h-[140px] px-4 py-1 flex flex-col gap-y-4`}
      >
        <div className="flex flex-col">
          <h3 className="font-light flex items-center">
            2do paso <Dot className="text-[#EAC45E] -mx-2" size={40} />
            <span className="font-medium">Descuento grupal</span>
          </h3>
          <p className="text-neutral-500 text-sm -mt-3">
            ¿Vendrías sola/o o con alguien mas?
          </p>
        </div>
        <div>
          <Select onValueChange={(value) => setDescuentoGrupal(Number(value))}>
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="Elegí una opción" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="0" className="text-base">
                Sola/o (0%)
              </SelectItem>
              <SelectItem value="5" className="text-base">
                2 personas (5% off c/u)
              </SelectItem>
              <SelectItem value="10" className="text-base">
                3 personas o mas (10% off c/u)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className={`${montserrat.className} bg-white w-full min-h-[140px] px-4 py-1 flex flex-col gap-y-4`}
      >
        <div className="flex flex-col">
          <h3 className="font-light flex items-center">
            3er paso <Dot className="text-[#EAC45E] -mx-2" size={40} />
            <span className="font-medium">Verifica tu presupuesto</span>
          </h3>
          <p className="text-neutral-500 text-sm -mt-3">
            Podés armar cuantas opciones de presupuestos necesites, solo cambia
            las zonas y listo!
          </p>
        </div>
        <div className="py-2">
          {/* Div superior con 3 columnas */}
          <div className="grid grid-cols-3 gap-4 mb-3 border border-neutral-500">
            <div className="h-10 font-medium flex justify-center items-center pl-8">
              Descuentos
            </div>
            <div className="h-10 flex justify-end items-center text-sm text-right">
              Aplicados
            </div>
            <div className="h-10 flex items-center justify-end pr-1 text-sm text-right">
              % Descuento
            </div>
          </div>

          {/* Div inferior con un grid de 3 columnas, donde la primera ocupa el 40% y las otras dos el 30% */}
          <div className="grid grid-cols-[45%_25%_30%] grid-rows-2">
            {/* Ajusta el gap si necesitas más espacio entre celdas */}
            {/* Primera fila con borde inferior */}
            <div className="h-12 col-span-1 border-b border-neutral-500 flex items-center whitespace-nowrap text-xs font-medium">
              <Dot className="text-[#EAC45E] -mx-2 shrink-0" size={40} />
              Descuento Multizona
            </div>
            <div className="h-12 col-span-1 border-b border-neutral-500 flex justify-center items-center">
              {selectedTreatments.length <= 1
                ? "No aplica"
                : `${selectedTreatments.length} zonas`}
            </div>
            <div className="h-12 col-span-1 border-b border-l border-neutral-500 flex justify-center items-center font-semibold text-[#EAC45E]">
              {descuento}%
            </div>

            {/* Segunda fila */}
            <div className="h-12 col-span-1 flex items-center whitespace-nowrap text-xs font-medium">
              <Dot className="text-[#EAC45E] -mx-2" size={40} />
              Descuento grupal
            </div>
            <div className="h-12 col-span-1 flex justify-center items-center">
              Celda 5
            </div>
            <div className="h-12 col-span-1 border-l border-neutral-500 flex justify-center items-center font-semibold text-[#EAC45E]">
              {descuentoGrupal}%
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex relative h-[100px]">
              <span className="absolute left-8 bottom-0 text-8xl font-bold text-black pr-2">
                1
              </span>
              <div
                className={`${montserrat.className} w-full h-1/2 self-end text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-white py-2 px-4`}
              >
                SESIÓN INDIVIDUAL
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CotizadorSteps;
