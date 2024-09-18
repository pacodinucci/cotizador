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

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  useEffect(() => {
    console.log(selectedTreatments);
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
                    : "Selecciona uno o más tratamientos"
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
            {/* <h4 className="font-medium text-gray-700">Zonas seleccionadas:</h4> */}
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
          <Select>
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="Elegí una opción" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="1" className="text-base">
                Sola/o
              </SelectItem>
              <SelectItem value="2" className="text-base">
                2 personas (5% off c/u)
              </SelectItem>
              <SelectItem value="3" className="text-base">
                3 personas o mas (10% off c/u)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CotizadorSteps;
