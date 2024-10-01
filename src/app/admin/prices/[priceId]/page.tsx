import React from "react";
import PriceForm from "@/components/global/price-form";
import db from "@/lib/db";

interface PriceIdPageProps {
  params: {
    priceId: string;
  };
}

export const revalidate = 0; // Esto desactiva el caché desde el servidor.

const PriceIdPage = async ({ params }: PriceIdPageProps) => {
  const price = await db.prices.findFirst({
    where: {
      id: params.priceId,
    },
  });

  return (
    <div>
      <PriceForm initialData={price} />
    </div>
  );
};

export default PriceIdPage;
