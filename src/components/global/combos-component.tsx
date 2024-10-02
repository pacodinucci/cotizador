"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Plus, Sheet, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useComboStore } from "@/lib/store";
import { getCombos } from "../../../actions/get-combos";
import { Separator } from "../ui/separator";
import { oswald } from "@/lib/fonts";
import { Button } from "../ui/button";
import { deleteCombo } from "../../../actions/delete-combo";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerTrigger,
} from "../ui/drawer";

const CombosComponent = () => {
  const router = useRouter();
  const { combos, setCombos } = useComboStore();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const refreshCombos = async () => {
    const updatedCombos = await getCombos();
    setCombos(updatedCombos);
  };

  const fetchCombos = async () => {
    const combosData = await getCombos();
    setCombos(combosData);
  };

  useEffect(() => {
    fetchCombos();
  }, [setCombos]);

  const handleRowClick = (id: string) => {
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const handleEditClick = (id: string) => {
    router.push(`/admin/combos/${id}`);
  };

  const handleDeleteClick = async () => {
    if (deleteId) {
      try {
        await deleteCombo(deleteId); // Use the delete combo action
        setIsDrawerOpen(false); // Close the drawer
        refreshCombos(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting combo:", error);
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
          Combos
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin")}>
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/combos/new")}
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
              <th className="px-4 py-2 border w-[40%]">Combo</th>
              <th className="px-4 py-2 border w-[30%]">Zonas Ch</th>
              <th className="px-4 py-2 border w-[30%]">Precio</th>
            </tr>
          </thead>
          <tbody>
            {combos.map((combo, index) => (
              <tr
                key={index}
                className="text-center relative group"
                onClick={() => handleRowClick(combo.id)}
              >
                <td className="px-4 py-4 border w-[40%]">{combo.title}</td>
                <td className="px-4 py-4 border w-[30%]">{combo.smallZones}</td>
                <td className="px-4 py-4 border w-[30%]">{combo.price}</td>

                <AnimatePresence>
                  {selectedRow === combo.id && (
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
                        onClick={() => handleEditClick(combo.id)}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-none h-full px-6"
                        onClick={() => openDeleteDrawer(combo.id)} // Open the drawer to confirm deletion
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

export default CombosComponent;
