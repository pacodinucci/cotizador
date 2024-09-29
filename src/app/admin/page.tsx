import CreatePricesComponent from "@/components/global/create-prices-component";
import PricesComponent from "@/components/global/prices-component";
import React from "react";

const AdminPage = () => {
  return (
    <div className="p-8 md:p-24 flex justify-center">
      {/* <CreatePricesComponent /> */}
      <PricesComponent />
    </div>
  );
};

export default AdminPage;
