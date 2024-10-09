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
  const [zones, setZones] = useState<Price[]>([]);

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

    setZones(items);

    try {
      await axios.patch("/api/prices/order", {
        id: reorderedItem.id,
        newOrder: result.destination.index + 1,
      });
      console.log("Orden actualizado exitosamente en la base de datos");
    } catch (error) {
      console.error("Error al actualizar el orden en la base de datos", error);
    }
  };

  return (
    <div className="flex">
      {/* Columna de números */}
      <ul className="flex flex-col gap-2 mr-2">
        {zones.map((_, index) => (
          <li
            key={index}
            className="border border-transparent rounded-md px-2 py-2.5 w-10 flex justify-center items-center text-neutral-500"
          >
            {index + 1}
          </li>
        ))}
      </ul>

      {/* Lista de elementos draggable */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="mainZones">
          {(provided) => (
            <ul
              className="flex flex-col gap-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {zones.map((price, index) => (
                <Draggable key={price.id} draggableId={price.id} index={index}>
                  {(provided) => (
                    <li
                      className="border border-neutral-300 rounded-md p-2 w-60 flex gap-x-2 bg-white"
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
