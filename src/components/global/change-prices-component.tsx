"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChangePricesComponent = () => {
  const [selectedPercentage, setSelectedPercentage] = useState<
    number | undefined
  >(undefined);

  const pricesChange = [5, 10, 15, 20, 25, 30];

  useEffect(() => {
    console.log(selectedPercentage);
  }, [selectedPercentage]);

  return (
    <div className="flex gap-2 p-4">
      <Select
        onValueChange={(value: string) => setSelectedPercentage(Number(value))}
      >
        <SelectTrigger className="rounded-none outline-none focus:outline-none focus-visible:outline-none active:outline-none">
          <SelectValue
            placeholder={
              selectedPercentage
                ? `${selectedPercentage}%`
                : "Elije un descuento"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {pricesChange.map((p, index) => (
            <SelectItem key={index} value={p.toString()}>
              {p}%
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button>Aceptar</Button>
    </div>
  );
};

export default ChangePricesComponent;
