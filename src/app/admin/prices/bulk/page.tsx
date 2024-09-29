import CreatePricesComponent from "@/components/global/create-prices-component";
import React from "react";

type Props = {};

const BulkPage = (props: Props) => {
  return (
    <div className="pt-16 md:pt-24">
      <CreatePricesComponent />
    </div>
  );
};

export default BulkPage;
