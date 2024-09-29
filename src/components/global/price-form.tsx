"use client";

import React, { useEffect } from "react";
import { getPriceById } from "../../../actions/get-price-by-id";
import { usePriceStore } from "@/lib/store";
import { Prices } from "@prisma/client";
import * as z from "zod";
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
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="p-4">
      <h1
        className={`${oswald.className} uppercase text-3xl px-6 py-4 text-neutral-700`}
      >
        Actualizar zona
      </h1>
      <Separator />
      <Form {...form}>
        <form className="flex flex-col gap-y-4 py-4">
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
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PriceForm;
