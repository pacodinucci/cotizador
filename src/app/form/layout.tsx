import FormNavbar from "@/components/global/form-navbar";
import { PersonalDataProvider } from "../../../context/personal-data-context";

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
