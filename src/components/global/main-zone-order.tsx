"use client";

import React, { useEffect, useState } from "react";
import { Price, usePriceStore } from "@/lib/store";
import { getPrices } from "../../../actions/get-prices";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../ui/custom-droppable";
import { GripVertical } from "lucide-react";
import axios from "axios";

const MainZoneOrder = () => {
  const { prices, setPrices } = usePriceStore();
  const [mainPrices, setMainPrices] = useState<Price[]>([]);
  const [zones, setZones] = useState(prices);

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await getPrices();
      const mainZones = response
        .filter((item: Price) => item.mainZone)
        .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      setPrices(mainZones);
    };
    fetchPrices();
  }, [setPrices]);

  useEffect(() => {
    setZones(prices);
  }, [prices]);

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(zones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Actualizamos el estado local con el nuevo orden
    setZones(items);

    // Llamada a la API para actualizar el orden en la base de datos
    try {
      await axios.patch("/api/prices/order", {
        id: reorderedItem.id,
        newOrder: result.destination.index + 1, // El nuevo orden
      });
      console.log("Orden actualizado exitosamente en la base de datos");
    } catch (error) {
      console.error("Error al actualizar el orden en la base de datos", error);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="mainZones">
          {(provided) => (
            <ul
              className="flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {zones.length > 0 &&
                zones.map((price, index) => (
                  <Draggable
                    key={price.id}
                    draggableId={price.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className="border border-neutral-300 rounded-md p-2 w-3/4 flex gap-x-2 bg-white"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <GripVertical className="text-neutral-300" />
                        <p>{price.title}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MainZoneOrder;
