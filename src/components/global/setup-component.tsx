"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainZoneOrder from "./main-zone-order";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { oswald } from "@/lib/fonts";
import { useRouter } from "next/navigation";

const SetupComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1
          className={`${oswald.className} uppercase text-3xl px-6 text-neutral-700`}
        >
          Precios
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin")}>
            <ArrowLeft />
          </Button>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="w-1/2 mx-auto">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Orden de Zonas Principales</AccordionTrigger>
            <AccordionContent>
              <MainZoneOrder />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SetupComponent;
