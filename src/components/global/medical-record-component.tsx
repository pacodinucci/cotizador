import React from "react";
import { MedicalRecord } from "@prisma/client";
import { format } from "date-fns";

interface MedicalRecordComponentProps {
  record: MedicalRecord;
  customerName: string | undefined;
}

const Section = ({
  title,
  items,
  other,
}: {
  title: string;
  items: string[];
  other?: string | null;
}) => {
  // Excluir si está vacío o solo contiene "Ninguna"
  const isEmpty =
    (items.length === 0 ||
      (items.length === 1 && items[0] === "Ninguna") ||
      (items.length === 1 && items[0] === "No")) &&
    !other;

  if (isEmpty) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
        {other && <li className="italic text-gray-500">Otros: {other}</li>}
      </ul>
    </div>
  );
};

const MedicalRecordComponent: React.FC<MedicalRecordComponentProps> = ({
  record,
  customerName,
}) => {
  // Map de todas las secciones
  const sections = [
    {
      title: "Condiciones cardiovasculares",
      items: record.cardiovascular,
      other: record.cardiovascularOther,
    },
    {
      title: "Condiciones de la sangre",
      items: record.bloodConditions,
      other: record.bloodConditionsOther,
    },
    {
      title: "Condiciones hepáticas",
      items: record.liverDiseases,
      other: record.liverDiseasesOther,
    },
    {
      title: "Condiciones infecciosas",
      items: record.infectiousDiseases,
      other: record.infectiousDiseasesOther,
    },
    {
      title: "Condiciones neurológicas",
      items: record.neurologicalConditions,
      other: record.neurologicalConditionsOther,
    },
    {
      title: "Condiciones pulmonares",
      items: record.lungConditions,
      other: record.lungConditionsOther,
    },
    {
      title: "Condiciones oncológicas",
      items: record.oncologicalConditions,
      other: record.oncologicalConditionsOther,
    },
    {
      title: "Condiciones metabólicas",
      items: record.metabolicConditions,
      other: record.metabolicConditionsOther,
    },
    {
      title: "Condiciones de la piel",
      items: record.skinConditions,
      other: record.skinConditionsOther,
    },
    {
      title: "Condiciones ginecológicas",
      items: record.gynecologicalConditions,
      other: record.gynecologicalConditionsOther,
    },
    {
      title: "Condiciones hormonales",
      items: record.hormonalConditions,
      other: record.hormonalConditionsOther,
    },
    {
      title: "Condiciones generales",
      items: record.generalCondition,
    },
    {
      title: "Condiciones familiares",
      items: record.familyBackground,
      other: record.familyBackgroundOther,
    },
    {
      title: "Cirugías previas",
      items: record.surgeryHistory,
      other: record.surgeryHistoryOther,
    },
    {
      title: "Prótesis",
      items: record.prosthesis,
      other: record.prosthesisOther,
    },
    {
      title: "Tratamientos recientes",
      items: record.recentTreatment,
      other: record.recentTreatmentOther,
    },
    {
      title: "Tratamientos pasados",
      items: record.pastTreatment,
      other: record.pastTreatmentOther,
    },
    {
      title: "Tratamientos estéticos",
      items: record.aestheticTreatment,
      other: record.aestheticTreatmentOther,
    },
    {
      title: "Medicación reciente",
      items: record.medication,
      other: record.medicationOther,
    },
    {
      title: "Historial de alergias",
      items: record.allergyHistory,
      other: record.allergyHistoryOther,
    },
    {
      title: "Uso de Isotretinoína (Roacután)",
      items: record.isotretinoinUsage,
      other: record.isotretinoinUsageOther,
    },
    {
      title: "Vacuna antitetánica",
      items: [record.tetanusVaccine],
      other: record.tetanusVaccineOther,
    },
    {
      title: "Otras condiciones",
      items: record.otherCondition,
      other: record.otherConditionDetail,
    },
  ];

  // Verificamos si hay alguna sección con contenido
  const hasContent = sections.some(
    (section) => section.items.length > 0 || !!section.other
  );

  return (
    <main className="w-[80%] mx-6 p-6 space-y-8">
      {/* Encabezado */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-900">
          Antecedentes médicos de {customerName}
        </h1>
        <p className="text-gray-500">
          Registro creado el {format(new Date(record.date), "dd/MM/yyyy")}
        </p>
      </div>

      {hasContent ? (
        <>
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              items={section.items}
              other={section.other}
            />
          ))}

          {/* Grupo sanguíneo */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">
              Grupo sanguíneo
            </h2>
            <p className="text-gray-700">{record.bloodType}</p>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600 text-lg">
          Este paciente no presenta antecedentes médicos registrados.
        </div>
      )}
    </main>
  );
};

export default MedicalRecordComponent;
