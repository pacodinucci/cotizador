"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Prices } from "@prisma/client";
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

interface PriceFormProps {
  initialData: Prices | null;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "El nombre de la zona es requerido.",
  }),
  zone: z.string().min(1, {
    message: "Debe elegir un sector.",
  }),
  price: z.number().min(1, {
    message: "El precio es requerido.",
  }),
  code: z.string().min(3, {
    message: "El código es requerido y debe ser de 3 letras.",
  }),
  smallZone: z.boolean(),
});

const PriceForm = ({ initialData }: PriceFormProps) => {
  const router = useRouter();

  console.log(initialData);

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        title: "",
        zone: "",
        price: 0,
        code: "",
        smallZone: false,
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  const sectors = ["Alta", "Media", "Baja"];

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const processedData = {
      ...data,
      price: Number(data.price),
    };

    try {
      const payload = { prices: [processedData] };
      if (initialData) {
        await axios.patch(`/api/prices/${initialData.id}`, payload);
        console.log("Registro actualizado");
      } else {
        await axios.post("/api/prices", payload);
        console.log("Nuevo registro creado");
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1
          className={`${oswald.className} uppercase text-3xl px-2 py-4 text-neutral-700`}
        >
          {initialData ? "Actualizar zona" : "Crear zona"}
        </h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          <ArrowLeft />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de zona</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="zone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Selecciona un sector"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
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
          <FormField
            name="smallZone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zona Chica</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={field.value ? "true" : "false"}
                  defaultValue={field.value ? "true" : "false"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Selecciona una opción"
                        defaultValue={field.value ? "true" : "false"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Sí</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading
              ? "Guardando..."
              : initialData
              ? "Guardar Cambios"
              : "Crear Zona"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PriceForm;
