import PersonalDataForm from "@/components/global/personal-data-form";
import React from "react";

type Props = {};

const PersonalDataPage = (props: Props) => {
  return (
    <div className="pb-16">
      <PersonalDataForm />
    </div>
  );
};

export default PersonalDataPage;
