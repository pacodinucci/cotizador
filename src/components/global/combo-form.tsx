"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Combo, Zone } from "@prisma/client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { oswald } from "@/lib/fonts";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { usePriceStore } from "@/lib/store";
import { getPrices } from "../../../actions/get-prices";
import { Label } from "../ui/label";

interface ComboWithZones extends Combo {
  zones: Zone[];
}

// Definir el esquema del formulario sin el campo `zones` ya que lo manejaremos manualmente
const formSchema = z.object({
  price: z.number().min(1, { message: "El precio es requerido." }),
  smallZones: z
    .number()
    .min(1, { message: "La cantidad de zonas chicas es requerida." }),
});

interface ComboFormProps {
  initialData: ComboWithZones | null;
}

const ComboForm = ({ initialData }: ComboFormProps) => {
  const router = useRouter();
  const { prices, setPrices } = usePriceStore();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  // Set initial zones if editing
  useEffect(() => {
    if (initialData && initialData.zones) {
      setSelectedZones(initialData.zones.map((zone) => zone.id));
    }
  }, [initialData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || 0,
      smallZones: initialData?.zones.length || 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSelectZones = (zoneId: string) => {
    setSelectedZones((prevSelected) => {
      if (prevSelected.includes(zoneId)) {
        return prevSelected.filter((id) => id !== zoneId);
      } else {
        return [...prevSelected, zoneId];
      }
    });
  };

  const isSelected = (zoneId: string) => selectedZones.includes(zoneId);

  const handleRemoveTag = (zoneId: string) => {
    setSelectedZones((prevSelected) =>
      prevSelected.filter((id) => id !== zoneId)
    );
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (selectedZones.length === 0) {
      setError("Debes seleccionar al menos una zona.");
      return;
    }
    try {
      const selectedZonesData = prices.filter((zone) =>
        selectedZones.includes(zone.id)
      );
      const title = selectedZonesData.map((zone) => zone.code).join(" + ");

      const processedData = {
        price: Number(data.price),
        smallZones: Number(data.smallZones),
        zones: selectedZones,
        title,
      };

      if (initialData) {
        await axios.patch(`/api/combos/${initialData.id}`, processedData);
        console.log("Combo actualizado");
      } else {
        await axios.post("/api/combos", processedData);
        console.log("Nuevo combo creado");
      }

      router.push("/admin/combos");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1
          className={`${oswald.className} uppercase text-3xl px-2 py-4 text-neutral-700`}
        >
          {initialData ? "Actualizar combo" : "Crear combo"}
        </h1>
        <Button variant="outline" onClick={() => router.push("/admin/combos")}>
          <ArrowLeft />
        </Button>
      </div>
      <Separator />

      {error && (
        <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-md">
          {error}
        </div>
      )}

      <Form {...form}>
        <form className="flex flex-col gap-y-4 py-4" onSubmit={onSubmit}>
          {/* Etiqueta para las zonas seleccionadas */}
          <Label>Zonas seleccionadas</Label>
          <FormItem>
            {selectedZones.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedZones.map((zoneId) => {
                  const zone = prices.find((z) => z.id === zoneId);
                  return (
                    <div
                      key={zoneId}
                      className="bg-[#EAC45E] text-gray-800 px-3 py-1 rounded-full cursor-pointer flex items-center"
                      onClick={() => handleRemoveTag(zoneId)}
                    >
                      <span>{zone?.title}</span>
                      <span className="ml-2 text-gray-600 hover:text-red-600">
                        ✕
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-[48px]">
                Aún no hay zonas seleccionadas
              </div>
            )}
          </FormItem>

          {/* Multi-select para Zonas */}
          <FormItem>
            <FormLabel>Selecciona Zonas</FormLabel>
            <Select>
              <SelectTrigger className="rounded-md outline-none">
                <SelectValue placeholder="Selecciona una o más zonas" />
              </SelectTrigger>
              <SelectContent>
                {/* Sección Alta */}
                <div className="px-8 py-2 font-bold text-gray-600">
                  Zona Alta
                </div>
                <Separator className="mb-1" />
                {prices
                  .filter((price) => price.zone === "Alta")
                  .map((price) => (
                    <div
                      key={price.id}
                      onClick={() => handleSelectZones(price.id)}
                      className={`cursor-pointer px-8 py-2 ${
                        isSelected(price.id) ? "bg-[#EAC45E] text-white" : ""
                      }`}
                    >
                      {price.title}
                    </div>
                  ))}

                <div className="px-8 py-2 font-bold text-gray-600">
                  Zona Media
                </div>
                <Separator className="mb-1" />
                {prices
                  .filter((price) => price.zone === "Media")
                  .map((price) => (
                    <div
                      key={price.id}
                      onClick={() => handleSelectZones(price.id)}
                      className={`cursor-pointer px-8 py-2 ${
                        isSelected(price.id) ? "bg-[#EAC45E] text-white" : ""
                      }`}
                    >
                      {price.title}
                    </div>
                  ))}

                <div className="px-8 py-2 font-bold text-gray-600">
                  Zona Baja
                </div>
                <Separator className="mb-1" />
                {prices
                  .filter((price) => price.zone === "Baja")
                  .map((price) => (
                    <div
                      key={price.id}
                      onClick={() => handleSelectZones(price.id)}
                      className={`cursor-pointer px-8 py-2 ${
                        isSelected(price.id) ? "bg-[#EAC45E] text-white" : ""
                      }`}
                    >
                      {price.title}
                    </div>
                  ))}
              </SelectContent>
            </Select>
          </FormItem>

          {/* Zonas chicas */}
          <FormField
            name="smallZones"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zonas Chicas</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Precio del combo */}
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del Combo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading
              ? "Guardando..."
              : initialData
              ? "Guardar Cambios"
              : "Crear Combo"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ComboForm;
