import React from "react";
import db from "@/lib/db";
import ComboForm from "@/components/global/combo-form";

interface ComboPageProps {
  params: {
    comboId: string;
  };
}

const ComboIdPage = async ({ params }: ComboPageProps) => {
  const combo = await db.combo.findFirst({
    where: { id: params.comboId },
    include: { zones: true },
  });

  return (
    <div>
      <ComboForm initialData={combo} />
    </div>
  );
};

export default ComboIdPage;
