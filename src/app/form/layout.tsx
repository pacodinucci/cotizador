import FormNavbar from "@/components/global/form-navbar";
import { PersonalDataProvider } from "../../../context/personal-data-context";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PersonalDataProvider>
      <main>
        <FormNavbar />
        {children}
      </main>
    </PersonalDataProvider>
  );
}
