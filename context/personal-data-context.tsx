"use client";

import { createContext, useContext, useState } from "react";

interface PersonalDataContextType {
  email: string;
  setEmail: (email: string) => void;
  customerId: string;
  setCustomerId: (customerId: string) => void;
}

const PersonalDataContext = createContext<PersonalDataContextType | undefined>(
  undefined
);

export const PersonalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [email, setEmail] = useState("");
  const [customerId, setCustomerId] = useState("");

  return (
    <PersonalDataContext.Provider
      value={{ email, setEmail, customerId, setCustomerId }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
};

export const usePersonalData = () => {
  const context = useContext(PersonalDataContext);
  if (!context) {
    throw new Error(
      "usePersonalData must be used within an PersonalDataProvider"
    );
  }
  return context;
};
