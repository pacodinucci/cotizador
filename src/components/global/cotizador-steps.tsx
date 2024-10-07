"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
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
import { useSearchParams } from "next/navigation";

const CotizadorStepsWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CotizadorSteps />
    </Suspense>
  );
};

const CotizadorSteps = () => {
  const searchParams = useSearchParams();
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const acceptedWhatsappNumbers = ["5491140614528", "5491155151695"];
  let whnumber = searchParams.get("whnumber");

  if (!whnumber || !acceptedWhatsappNumbers.includes(whnumber)) {
    whnumber = acceptedWhatsappNumbers[1];
  }

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  useEffect(() => {
    if (selectedTreatments.length === 2) {
      setDescuento(5);
    } else if (selectedTreatments.length === 3) {
      setDescuento(10);
    } else if (selectedTreatments.length === 4) {
      setDescuento(15);
    } else if (selectedTreatments.length >= 5) {
      setDescuento(20);
    } else {
    }
  }, [selectedTreatments]);

  useEffect(() => {
    let totalCardPrice = 0;

    selectedTreatments.forEach((treatment) => {
      const priceObj = prices.find((price) => price.title === treatment);
      if (priceObj) {
        totalCardPrice += priceObj.price;
      }
    });

    const descuentoTotal = descuento + descuentoGrupal;
    const finalCardPrice =
      totalCardPrice - totalCardPrice * (descuentoTotal / 100);

    setOneSessionCardPrice(finalCardPrice);

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

  const handleWhatsAppSend = () => {
    if (selectedTreatments.length === 0) {
      alert(
        "Por favor, selecciona al menos una zona para enviar el presupuesto."
      );
      return;
    }

    const selectedZonesMessage = selectedTreatments
      .map((treatment) => `- ${treatment}`)
      .join("\n");

    const groupDiscountMessage =
      descuentoGrupal > 0
        ? `🎉 Descuento grupal aplicado: ${descuentoGrupal}%`
        : "Sin descuento grupal";

    const oneSessionCashMessage = oneSessionCashPrice
      ? `💵 Sesión en efectivo: ${formatNumber(oneSessionCashPrice)}`
      : "💵 Precio por una sesión en efectivo: $0";

    const oneSessionCardMessage = oneSessionCardPrice
      ? `💳 Sesión con tarjeta: ${formatNumber(oneSessionCardPrice)}`
      : "💳 Precio por una sesión con tarjeta: $0";

    const sixSessionsCashMessage = oneSessionCashPrice
      ? `💵 Seis sesiones en efectivo: ${formatNumber(oneSessionCashPrice * 6)}`
      : "💵 Precio por seis sesiones en efectivo: $0";

    const sixSessionsCardMessage = oneSessionCardPrice
      ? `💳 Seis sesiones con tarjeta: ${formatNumber(oneSessionCardPrice * 6)}`
      : "💳 Precio por seis sesiones con tarjeta: $0";

    const fullMessage = `
  Hola! 👋 Me gustaría consultar por el siguiente tratamiento 😊\n
  Zonas seleccionadas:

  ${selectedZonesMessage}
  
  ${groupDiscountMessage}
  
  💸 Presupuesto

  ${oneSessionCashMessage}
  ${oneSessionCardMessage}
  
  ${sixSessionsCashMessage}
  ${sixSessionsCardMessage}
    `;

    const encodedMessage = encodeURIComponent(fullMessage);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const phoneNumber = whnumber;
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleScrollBy = () => {
    if (window.innerWidth < 768) {
      window.scrollBy({
        top: window.innerHeight * 0.18,
        behavior: "smooth",
      });
    }
  };

  const handleSelectOpenChange = (open: boolean) => {
    setIsSelectOpen(open);
    if (open && !hasScrolled) {
      handleScrollBy();
      setHasScrolled(true);
    }
  };

  return (
    <div className="bg-gray-100 text-neutral-700 antialiased min-h-screen px-4 flex flex-col gap-y-4 py-8 no-select">
      <div
        className={`${montserrat.className} bg-white w-full min-h-[140px] px-4 py-1 flex flex-col gap-y-4`}
      >
        <div className="flex flex-col">
          <h3 className="font-light flex items-center">
            1er paso <Dot className="text-[#EAC45E] -mx-2" size={40} />
            <span className="font-semibold">Selecciona las zonas</span>
          </h3>
          <p className="text-neutral-500 text-sm -mt-1">
            Cuantas más zonas mayor es el descuento!
          </p>
        </div>
        <div>
          <Select open={isSelectOpen} onOpenChange={handleSelectOpenChange}>
            <SelectTrigger className="rounded-none outline-none focus:outline-none focus-visible:outline-none active:outline-none">
              <SelectValue
                placeholder={
                  selectedTreatments.length > 0
                    ? selectedTreatments[selectedTreatments.length - 1]
                    : "Selecciona una o más zonas"
                }
              />
            </SelectTrigger>
            <SelectContent className="relative">
              {/* Sección Alta */}
              <div className="px-8 py-2 font-bold text-gray-600 bg-neutral-200">
                Zonas Altas
              </div>
              <Separator className="mb-1" />
              {prices &&
                prices
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
              <div className="px-8 py-2 font-bold text-gray-600 bg-neutral-200">
                Zonas Medias
              </div>
              <Separator className="mb-1" />
              {prices &&
                prices
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
              <div className="px-8 py-2 font-bold text-gray-600 bg-neutral-200">
                Zonas Bajas
              </div>
              <Separator className="mb-1" />
              {prices &&
                prices
                  .filter((price) => price.zone === "Baja")
                  .map((price, index, array) => (
                    <div
                      key={index}
                      onClick={() => handleSelectTreatment(price.title)}
                      className={`cursor-pointer px-8 py-2 ${
                        isSelected(price.title) ? "bg-[#EAC45E] text-white" : ""
                      } ${index === array.length - 1 ? "mb-10" : ""}`}
                    >
                      {price.title}
                    </div>
                  ))}
              <div
                className="fixed bottom-0 left-0 bg-neutral-900 text-white text-center py-2 w-full uppercase cursor-pointer z-50"
                onClick={() => setIsSelectOpen(false)}
              >
                Listo!
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* Mostrar tratamientos seleccionados con viñeta */}
        {selectedTreatments.length > 0 && (
          <div className="mb-4">
            <ul className="list-none mt-2">
              {selectedTreatments.map((treatment, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Dot className="text-[#EAC45E]" size={40} />
                  <span className="text-gray-800 font-medium text-sm">
                    {treatment}
                  </span>
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
            <span className="font-semibold">Descuento grupal</span>
          </h3>
          <p className="text-neutral-500 text-sm -mt-1">
            ¿Vendrías sola/o o con alguien mas?
          </p>
        </div>
        <div>
          <Select onValueChange={(value) => setDescuentoGrupal(Number(value))}>
            <SelectTrigger className="rounded-none" defaultValue="0">
              <SelectValue placeholder="Individual ● 0%" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="0" className="text-base">
                Individual ● 0%
              </SelectItem>
              <SelectItem value="5" className="text-base">
                Somos 2 ● 5% off
              </SelectItem>
              <SelectItem value="10" className="text-base">
                Somos 3 o más ● 10% off
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
            <span className="font-semibold">Verifica tu presupuesto</span>
          </h3>
          <p className="text-neutral-500 text-sm -mt-1">
            Arma cuantos presupuestos necesites, solo cambia las zonas y listo!
          </p>
        </div>
        <div className="py-2">
          {/* Div superior con 3 columnas */}
          <div className="grid grid-cols-3 gap-4 mb-3 border border-neutral-500">
            <div className="h-10 font-medium flex justify-center items-center pl-8">
              Descuentos
            </div>
            <div className="h-10 flex justify-end items-center font-medium text-right">
              Aplicados
            </div>
            <div className="h-10 flex items-center justify-center pr-1 text-base font-medium">
              %
            </div>
          </div>

          {/* Div inferior con un grid de 3 columnas, donde la primera ocupa el 40% y las otras dos el 30% */}
          <div className="grid grid-cols-[45%_25%_30%] grid-rows-2">
            {/* Ajusta el gap si necesitas más espacio entre celdas */}
            {/* Primera fila con borde inferior */}
            <div className="h-12 col-span-1 border-b border-neutral-500 flex items-center whitespace-nowrap text-base font-medium">
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

            <div className="h-12 col-span-1 flex items-center whitespace-nowrap text-base font-medium">
              <Dot className="text-[#EAC45E] -mx-2" size={40} />
              Grupal
            </div>
            <div className="h-12 col-span-1 flex justify-center items-center">
              {descuentoGrupal === 0 && "No aplica"}
              {descuentoGrupal === 5 && "Somos 2"}
              {descuentoGrupal === 10 && "3 o más"}
            </div>
            <div className="h-12 col-span-1 border-l border-neutral-500 flex justify-center items-center font-semibold text-[#EAC45E]">
              {descuentoGrupal}%
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex flex-col relative h-[70px]">
              <div
                className={`${montserrat.className} w-full h-[75%] absolute bottom-0 text-center font-semibold tracking-wider bg-gradient-to-r from-[#f5de89] via-[#eccb52] to-[#cfa14c] text-white py-3 px-3`}
              >
                SESIÓN INDIVIDUAL
              </div>
            </div>
            <div>
              <div>
                <div className="text-center text-xl font-semibold h-12 flex items-end justify-center pb-1">
                  {oneSessionCashPrice
                    ? formatNumber(oneSessionCashPrice)
                    : "$0"}
                </div>
                <div className="bg-gray-200 p-2 text-center">
                  Precio en efectivo 😊
                </div>
              </div>
              <div>
                <div className="text-center text-xl font-semibold h-12 flex items-end justify-center pb-1">
                  {oneSessionCardPrice
                    ? formatNumber(oneSessionCardPrice)
                    : "$0"}
                </div>
                <div className="bg-gray-200 p-2 text-center flex flex-col gap-2">
                  <p>Débito o crédito</p>
                  <p>Hasta en 6 cuotas sin interés</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col relative h-[100px]">
              {/* <span className="absolute left-8 md:left-40 bottom-0 text-8xl font-bold text-black pr-2 z-10">
                6
              </span> */}
              <div
                className={`${montserrat.className} w-full h-1/2 absolute bottom-0 text-center font-semibold tracking-wider bg-gradient-to-r from-[#f5de89] via-[#eccb52] to-[#cfa14c] text-white py-3 px-3`}
              >
                PACK DE 6 SESIONES
              </div>
            </div>
            <div>
              <div>
                <div className="text-center text-xl font-semibold h-12 flex items-end justify-center pb-1">
                  {oneSessionCashPrice
                    ? formatNumber(oneSessionCashPrice * 6)
                    : "$0"}
                </div>
                <div className="bg-gray-200 p-2 text-center">
                  Precio en efectivo
                </div>
              </div>
              <div>
                <div className="text-center text-xl font-semibold h-12 flex items-end justify-center pb-1">
                  {oneSessionCardPrice
                    ? formatNumber(oneSessionCardPrice * 6)
                    : "$0"}
                </div>
                <div className="bg-gray-200 p-2 text-center flex flex-col gap-2">
                  <p>Débito o crédito</p>
                  <p>Hasta en 6 cuotas sin interés 😍</p>
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
            <span className="font-semibold">Consultános!</span>
          </h3>
          <p className="text-neutral-500 text-sm text-left">
            Envianos el presupuesto por el cual querés consultar
          </p>
          <div
            className="bg-gradient-to-r from-[#f5de89] via-[#eccb52] to-[#cfa14c] text-white text-center font-semibold md:text-base shadow-md rounded-full w-1/2 md:w-1/4 mx-auto my-8 py-3 md:py-2 flex items-center gap-2 justify-center text-xl cursor-pointer"
            onClick={handleWhatsAppSend}
          >
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
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2 items-center">
          {/* <Dot className="text-[#EAC45E] shrink-0" size={40} /> */}
          <p className="leading-5 text-neutral-500 tracking-wide px-4 text-justify text-sm">
            Presupuesto válido por 10 días / Para confirmar los turnos es
            necesaria una seña del 30% / Para descuento grupal los integrantes
            deberán contratar en forma simultánea / Descuento en efectivo solo
            abonando al contado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CotizadorStepsWrapper;
