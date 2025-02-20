import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";

const DirectionsModal = () => {
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
      <Button className="bg-blue-500 hover:bg-blue-500/80" onClick={handleSave}>
        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Guardar"}
      </Button>
    </div>
  );
};

export default DirectionsModal;
