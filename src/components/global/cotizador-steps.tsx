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
import { formatNumber } from "@/lib/utils";
import Image from "next/image";

const CotizadorSteps = () => {
  const { prices, setPrices } = usePriceStore();
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [descuento, setDescuento] = useState<number>(0);
  const [descuentoGrupal, setDescuentoGrupal] = useState<number>(0);
  const [oneSessionCashPrice, setOneSessionCashPrice] = useState<number | null>(
    null
  );
  const [oneSessionCardPrice, setOneSessionCardPrice] = useState<number | null>(
    null
  );
  const [sixSessionsCashPrice, setSixSessionsCashPrice] = useState<
    number | null
  >(null);
  const [sixSessionsCardPrice, setSixSessionsCardPrice] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  useEffect(() => {
    if (selectedTreatments.length === 2) {
      setDescuento(10);
    } else if (selectedTreatments.length === 3) {
      setDescuento(20);
    } else if (selectedTreatments.length === 4) {
      setDescuento(25);
    } else if (selectedTreatments.length >= 5) {
      setDescuento(30);
    } else {
    }
  }, [selectedTreatments]);

  useEffect(() => {
    // Calcula el precio con tarjeta basado en los tratamientos seleccionados y el descuento
    let totalCardPrice = 0;

    selectedTreatments.forEach((treatment) => {
      const priceObj = prices.find((price) => price.title === treatment);
      if (priceObj) {
        totalCardPrice += priceObj.price;
      }
    });

    // Calcula el descuento total (multizona + grupal)
    const descuentoTotal = descuento + descuentoGrupal;
    const finalCardPrice =
      totalCardPrice - totalCardPrice * (descuentoTotal / 100);

    // Establece el precio con tarjeta
    setOneSessionCardPrice(finalCardPrice);

    // Establece el precio en efectivo con un 20% de descuento adicional
    const finalCashPrice = finalCardPrice - finalCardPrice * 0.2;
    setOneSessionCashPrice(finalCashPrice);
  }, [selectedTreatments, descuento, descuentoGrupal, prices]);

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
    <div className="bg-gray-100 min-h-screen px-4 flex flex-col gap-y-4 py-8">
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
        className={`${montserrat.className} bg-white w-full min-h-[140px] px-4 pt-1 pb-4 flex flex-col gap-y-4`}
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
              Multizona
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
              Grupal
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
            <div className="flex flex-col relative h-[100px]">
              <span className="absolute left-8 bottom-0 text-8xl font-bold text-black pr-2 z-10">
                1
              </span>
              <div
                className={`${montserrat.className} w-full h-1/2 absolute bottom-0 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-white py-2 px-4`}
              >
                SESIÓN INDIVIDUAL
              </div>
            </div>
            <div>
              <div>
                <div className="text-center font-medium h-12 flex items-end justify-center">
                  {oneSessionCashPrice && formatNumber(oneSessionCashPrice)}
                </div>
                <div className="bg-gray-200 p-2 text-center">
                  Precio en efectivo 😊
                </div>
              </div>
              <div>
                <div className="text-center font-medium h-12 flex items-end justify-center">
                  {oneSessionCardPrice && formatNumber(oneSessionCardPrice)}
                </div>
                <div className="bg-gray-200 p-2 text-center">
                  Débito o crédito hasta en 6 cuotas sin interés
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col relative h-[100px]">
              <span className="absolute left-8 bottom-0 text-8xl font-bold text-black pr-2 z-10">
                6
              </span>
              <div
                className={`${montserrat.className} w-full h-1/2 absolute bottom-0 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-white py-2 px-4 pl-10`}
              >
                PACK DE SESIONES
              </div>
            </div>
            <div>
              <div>
                <div className="text-center font-medium h-12 flex items-end justify-center">
                  {oneSessionCashPrice && formatNumber(oneSessionCashPrice * 6)}
                </div>
                <div className="bg-gray-200 p-2 text-center">
                  Precio en efectivo 😊
                </div>
              </div>
              <div>
                <div className="text-center font-medium h-12 flex items-end justify-center">
                  {oneSessionCardPrice && formatNumber(oneSessionCardPrice * 6)}
                </div>
                <div className="bg-gray-200 p-2 text-center">
                  Débito o crédito hasta en 6 cuotas sin interés
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-2 items-center">
                  <Dot className="text-[#EAC45E] shrink-0" size={40} />
                  <p className="">Presupuesto válido por 10 días.</p>
                </div>
                <div className="flex gap-2">
                  <Dot className="text-[#EAC45E] shrink-0" size={40} />
                  <p className="pt-2">
                    Para confirmar los turnos es necesaria una seña del 30%
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dot className="text-[#EAC45E] shrink-0" size={40} />
                  <p className="pt-2">
                    Para descuento grupal los integrantes deberáan contratar en
                    forma simultánea.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${montserrat.className} bg-white w-full min-h-[140px] px-4 py-1 flex flex-col gap-y-4`}
      >
        <div className="flex flex-col">
          <h3 className="font-light flex items-center">
            4to paso <Dot className="text-[#EAC45E] -mx-2" size={40} />
            <span className="font-medium">Consultar por este presupuesto</span>
          </h3>
          <p className="text-neutral-500 text-sm">
            Selecciona el link a continuacion para enviarnos el presupuesto por
            el cual queres consultar o tomar un turno
          </p>
          <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-white text-center font-semibold shadow-md rounded-full w-1/2 mx-auto my-4 py-4 flex items-center gap-2 justify-center text-xl">
            Enviar
            <Image
              src="/whatsapp.svg"
              alt="clinica w whatsapp"
              width={30}
              height={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizadorSteps;
