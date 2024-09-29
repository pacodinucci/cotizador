"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Sheet } from "lucide-react";
import { usePriceStore } from "@/lib/store";
import { getPrices } from "../../../actions/get-prices";
import { Separator } from "../ui/separator";
import { oswald } from "@/lib/fonts";
import { Button } from "../ui/button";

const PricesComponent = () => {
  const router = useRouter();
  const { prices, setPrices } = usePriceStore();

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  const handleRowClick = (id: string) => {
    router.push(`/admin/prices/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-8 w-full md:px-48">
      <div className="flex justify-between items-center">
        <h1
          className={`${oswald.className} uppercase text-3xl px-6 text-neutral-700`}
        >
          Precios
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Sheet />
          </Button>
          <Button variant="outline">
            <Plus />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="overflow-x-auto">
        <table className="min-h-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Zona</th>
              <th className="px-4 py-2 border">Código</th>
              <th className="px-4 py-2 border">Sector</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Zona Chica</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr
                key={index}
                className="text-center"
                onClick={() => handleRowClick(price.id)}
              >
                <td className="px-4 py-2 border">{price.title}</td>
                <td className="px-4 py-2 border">{price.code}</td>
                <td className="px-4 py-2 border">{price.zone}</td>
                <td className="px-4 py-2 border">{price.price}</td>
                <td className="px-4 py-2 border">
                  {price.smallZone ? "Sí" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricesComponent;
