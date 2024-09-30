"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Plus, Sheet, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePriceStore } from "@/lib/store";
import { getPrices } from "../../../actions/get-prices";
import { Separator } from "../ui/separator";
import { oswald } from "@/lib/fonts";
import { Button } from "../ui/button";

const PricesComponent = () => {
  const router = useRouter();
  const { prices, setPrices } = usePriceStore();
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Track the selected row

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  const handleRowClick = (id: string) => {
    // Toggle selection: if clicked row is already selected, deselect it
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const handleActionClick = (id: string) => {
    console.log("Action button clicked for row:", id);
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
        <table className="min-h-full table-auto border-collapse w-full">
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
                className="text-center relative group"
                onClick={() => handleRowClick(price.id)}
              >
                <td className="px-4 py-4 border">{price.title}</td>
                <td className="px-4 py-4 border">{price.code}</td>
                <td className="px-4 py-4 border">{price.zone}</td>
                <td className="px-4 py-4 border">{price.price}</td>
                <td className="px-4 py-4 border">
                  {price.smallZone ? "Sí" : "No"}
                </td>

                {/* Action button (animated) */}
                <AnimatePresence>
                  {selectedRow === price.id && (
                    <motion.td
                      className="absolute left-0 top-0 h-full flex items-center justify-center bg-white text-white z-10"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ height: "100%" }}
                    >
                      <Button
                        size="sm"
                        className="bg-blue-600 h-full rounded-none px-6"
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-none h-full px-6"
                        onClick={() => handleActionClick(price.id)}
                      >
                        <Trash2 />
                      </Button>
                    </motion.td>
                  )}
                </AnimatePresence>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricesComponent;
