"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Plus, Sheet, Trash2, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePriceStore } from "@/lib/store";
import { getPrices } from "../../../actions/get-prices";
import { Separator } from "../ui/separator";
import { oswald } from "@/lib/fonts";
import { Button } from "../ui/button";
import { deletePrice } from "../../../actions/delete-price";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerTrigger,
} from "../ui/drawer"; // Import your Drawer component

const PricesComponent = () => {
  const router = useRouter();
  const { prices, setPrices } = usePriceStore();
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Track the selected row
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Control the drawer visibility
  const [deleteId, setDeleteId] = useState<string | null>(null); // Track which item to delete

  const refreshPrices = async () => {
    const updatedPrices = await getPrices();
    setPrices(updatedPrices);
  };

  const fetchPrices = async () => {
    const pricesData = await getPrices();
    setPrices(pricesData);
  };

  useEffect(() => {
    fetchPrices();
  }, [setPrices]);

  const handleRowClick = (id: string) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const handleEditClick = (id: string) => {
    router.push(`/admin/prices/${id}`);
  };

  const handleDeleteClick = async () => {
    if (deleteId) {
      try {
        await deletePrice(deleteId);
        setIsDrawerOpen(false); // Close the drawer
        refreshPrices(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting price:", error);
      }
    }
  };

  const openDeleteDrawer = (id: string) => {
    setDeleteId(id); // Set the ID of the item to delete
    setIsDrawerOpen(true); // Open the drawer
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
          <Button
            variant="outline"
            onClick={() => router.push("/admin/prices/setup")}
          >
            <SlidersHorizontal />
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/prices/bulk")}
          >
            <Sheet />
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/prices/new")}
          >
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
              <th className="px-4 py-2 border">Zona Principal</th>
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
                <td className="px-4 py-4 border">
                  {price.mainZone ? "Sí" : "No"}
                </td>

                {/* Action buttons (animated) */}
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
                        onClick={() => handleEditClick(price.id)}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-none h-full px-6"
                        onClick={() => openDeleteDrawer(price.id)} // Open the drawer to confirm deletion
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

      {/* Drawer for delete confirmation */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger />
        <DrawerContent className="h-[30vh]">
          <DrawerHeader>
            <DrawerTitle>
              Estás seguro que querés borrar este registro?
            </DrawerTitle>
            <DrawerDescription>
              Esta acción no se puede deshacer.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={handleDeleteClick}
              variant="destructive"
              className="w-full"
            >
              Borrar
            </Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PricesComponent;
