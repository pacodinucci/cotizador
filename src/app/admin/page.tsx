import CreatePricesComponent from "@/components/global/create-prices-component";
import PricesComponent from "@/components/global/prices-component";
import React from "react";

const AdminPage = async () => {
  return (
    <div className="px-4 py-8 md:p-24 flex justify-center">
      {/* <CreatePricesComponent /> */}
      <PricesComponent />
    </div>
  );
};

export default AdminPage;
