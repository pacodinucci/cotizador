"use client";

import React, { useEffect, useState } from "react";
import Chat from "@/components/global/chat";
import { Loader2, MenuSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Props = {};

const ChatPage = (props: Props) => {
  const [directionsMenuOpen, setDirectionsMenuOpen] = useState(false);
  const [directions, setDirections] = useState<any[]>([]);
  const [directionsContent, setDirectionsContent] = useState("");
  const [directionId, setDirectionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const { data } = await axios.get("/api/directions");

        if (data.length > 0) {
          setDirections(data);
          setDirectionsContent(data[0].content || "");
          setDirectionId(data[0].id);
        }
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };

    fetchDirections();
  }, []);

  const toggleDirections = () => {
    setDirectionsMenuOpen((prev) => !prev);
  };

  const handleSave = async () => {
    if (!directionId) {
      alert("No hay dirección disponible para actualizar.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.patch(`/api/directions/${directionId}`, {
        content: directionsContent,
      });
    } catch (error) {
      console.error("Error al actualizar la dirección:", error);
      alert("Hubo un problema al actualizar la dirección.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className={`absolute top-6 right-6 rounded-md bg-white p-4 ${
          directionsMenuOpen && "border-2 border-neutral-100 shadow-md"
        }`}
        initial={{ width: 40, height: 40 }}
        animate={
          directionsMenuOpen
            ? { width: 450, height: 500 }
            : { width: 40, height: 40 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {!directionsMenuOpen ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-2 right-2"
            >
              <MenuSquare
                onClick={toggleDirections}
                className="cursor-pointer"
              />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-2 right-2"
            >
              <X onClick={toggleDirections} className="cursor-pointer" />
            </motion.div>
          )}
        </AnimatePresence>

        {directionsMenuOpen && (
          <div className="mt-10 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Direcciones para el chatbot
            </h2>
            <textarea
              className="w-full h-60 p-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              placeholder="Escribe aquí las direcciones..."
              value={directionsContent}
              onChange={(e) => setDirectionsContent(e.target.value)}
            />
            <Button
              className="bg-blue-500 hover:bg-blue-500/80"
              onClick={handleSave}
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Guardar"
              )}
            </Button>
          </div>
        )}
      </motion.div>

      <Chat directions={directionsContent} />
    </div>
  );
};

export default ChatPage;
