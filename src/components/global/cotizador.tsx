"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PiQuestionMarkBold } from "react-icons/pi";
import { MdOutlineWhatsapp } from "react-icons/md";
import { Separator } from "../ui/separator";
import { usePriceStore } from "@/lib/store";
import { getPrices } from "../../../actions/get-prices";

type Item = {
  nombre: string;
  precio: number;
};

const Cotizador = () => {
  const { prices, setPrices } = usePriceStore();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const [infoItem, setInfoItem] = useState<Item | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Fetch de precios al montar el componente
  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();
      setPrices(pricesData);
    };
    fetchPrices();
  }, [setPrices]);

  // Efecto para detectar si es móvil o no
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cálculo del total
  useEffect(() => {
    setPrecioTotal(selectedItems.reduce((acc, item) => acc + item.precio, 0));
  }, [selectedItems]);

  // Transformar los precios en zonas específicas
  const precios = useMemo(() => {
    const zonas = {
      ZonaAlta: prices.filter((price) => price.zone === "Alta"),
      ZonaMedia: prices.filter((price) => price.zone === "Media"),
      ZonaBaja: prices.filter((price) => price.zone === "Baja"),
    };

    return Object.fromEntries(
      Object.entries(zonas).map(([zona, items]) => [
        zona,
        items.map((price) => ({
          nombre: price.title,
          precio: price.price,
        })),
      ])
    );
  }, [prices]);

  const handleAddPrice = (item: Item) => {
    setSelectedItems((prevItems) =>
      prevItems.some((si) => si.nombre === item.nombre)
        ? prevItems.filter((si) => si.nombre !== item.nombre)
        : [...prevItems, item]
    );
  };

  const handleShowInfo = (event: React.MouseEvent, item: Item) => {
    event.stopPropagation();
    setInfoItem(item);
  };

  const handleWhatsAppSend = () => {
    if (selectedItems.length === 0) {
      setShowDialog(true);
    } else {
      const message = selectedItems
        .map((item) => `${item.nombre} - $${item.precio}`)
        .join("\n");
      const totalMessage = `Total: $${precioTotal}`;
      const fullMessage = `Hola, me gustaría solicitar una cotización para los siguientes ítems:\n${message}\n${totalMessage}`;

      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/5491143994339?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div
      className={`relative bg-slate-200 min-h-[100vh] ${
        isMobile ? "w-full" : "w-[50%]"
      } flex gap-10 px-5 py-10`}
    >
      <div className={`${isMobile ? "w-[70%]" : "w-[60%]"} `}>
        <Accordion type="single" collapsible className="text-white w-3/5">
          {Object.entries(precios).map(([zona, items], index) => (
            <AccordionItem
              key={zona}
              value={`item-${index + 1}`}
              className="border-0 mb-2"
            >
              <AccordionTrigger className="flex justify-between px-1 hover:no-underline border-2 border-slate-800 bg-slate-800 rounded-lg mb-2 w-full">
                {zona.toUpperCase().replace("ZONA", "ZONA ")}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 w-full">
                {items.map((item) => (
                  <div
                    key={item.nombre}
                    className={`py-2 px-4 text-sm font-semibold border-2 rounded-lg cursor-pointer flex items-center justify-between hover:opacity-75 ${
                      selectedItems.some((it) => it.nombre === item.nombre)
                        ? "bg-emerald-600"
                        : "bg-indigo-500"
                    }`}
                    onClick={() => handleAddPrice(item)}
                  >
                    <span>{item.nombre}</span>
                    <PiQuestionMarkBold
                      size={20}
                      className="flex-shrink-0"
                      onClick={(event) => handleShowInfo(event, item)}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div
        className={`flex flex-col fixed top-10 ${
          isMobile ? "right-[5%]" : "right-[30%]"
        }`}
      >
        <div
          className={`bg-white rounded-lg shadow py-5 ${
            isMobile ? "w-[45vw]" : "w-[20vw]"
          }`}
        >
          {selectedItems.length > 0 ? (
            <ul className="list-none">
              {selectedItems.map((item, index) => (
                <li
                  key={item.nombre}
                  className={`flex justify-between items-center px-5 py-1 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <span>{item.nombre}</span>
                  <span className="font-semibold">${item.precio}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 px-5">
              Selecciona las zonas para cotizar.
            </p>
          )}
          <Separator className="mt-2" />
          <div className="text-xl font-bold mt-4 flex justify-end px-5">
            ${precioTotal}
          </div>
        </div>
        <Button
          variant="outline"
          className={`mt-4 flex ${
            isMobile
              ? "justify-start gap-5 font-semibold"
              : "justify-center gap-5 flex-row-reverse"
          } `}
          onClick={handleWhatsAppSend}
        >
          <MdOutlineWhatsapp size={25} />
          <p>{isMobile ? "Continuar" : "Continuar en Whatsapp"}</p>
        </Button>
      </div>

      {infoItem && (
        <Drawer open={!!infoItem} onClose={() => setInfoItem(null)}>
          <DrawerContent className="flex flex-col items-center justify-center">
            <DrawerHeader>
              <DrawerTitle>{infoItem.nombre}</DrawerTitle>
              <DrawerClose onClick={() => setInfoItem(null)} />
            </DrawerHeader>
            <DrawerDescription>Precio: ${infoItem.precio}</DrawerDescription>
            <DrawerFooter>
              <Button onClick={() => setInfoItem(null)}>Cerrar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      {showDialog && (
        <AlertDialog open={showDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Por favor, agregue al menos un ítem a su cotización.
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDialog(false)}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Cotizador;
