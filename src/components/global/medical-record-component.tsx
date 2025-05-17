import React from "react";
import { MedicalRecord } from "@prisma/client";
import { format } from "date-fns";

interface MedicalRecordComponentProps {
  record: MedicalRecord;
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
  if (items.length === 0 && !other) return null;

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
}) => {
  return (
    <main className="w-[80%] mx-6 p-6 space-y-8">
      {/* Encabezado */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-900">
          Antecedentes médicos
        </h1>
        <p className="text-gray-500">
          Registro creado el {format(new Date(record.date), "dd/MM/yyyy")}
        </p>
      </div>

      {/* Condiciones médicas */}
      <Section
        title="Condiciones cardiovasculares"
        items={record.cardiovascular}
        other={record.cardiovascularOther}
      />
      <Section
        title="Condiciones de la sangre"
        items={record.bloodConditions}
        other={record.bloodConditionsOther}
      />
      <Section
        title="Condiciones hepáticas"
        items={record.liverDiseases}
        other={record.liverDiseasesOther}
      />
      <Section
        title="Condiciones infecciosas"
        items={record.infectiousDiseases}
        other={record.infectiousDiseasesOther}
      />
      <Section
        title="Condiciones neurológicas"
        items={record.neurologicalConditions}
        other={record.neurologicalConditionsOther}
      />
      <Section
        title="Condiciones pulmonares"
        items={record.lungConditions}
        other={record.lungConditionsOther}
      />
      <Section
        title="Condiciones oncológicas"
        items={record.oncologicalConditions}
        other={record.oncologicalConditionsOther}
      />
      <Section
        title="Condiciones metabólicas"
        items={record.metabolicConditions}
        other={record.metabolicConditionsOther}
      />
      <Section
        title="Condiciones de la piel"
        items={record.skinConditions}
        other={record.skinConditionsOther}
      />
      <Section
        title="Condiciones ginecológicas"
        items={record.gynecologicalConditions}
        other={record.gynecologicalConditionsOther}
      />
      <Section
        title="Condiciones hormonales"
        items={record.hormonalConditions}
        other={record.hormonalConditionsOther}
      />
      <Section title="Condiciones generales" items={record.generalCondition} />
      <Section
        title="Condiciones familiares"
        items={record.familyBackground}
        other={record.familyBackgroundOther}
      />

      {/* Tratamientos */}
      <Section
        title="Cirugías previas"
        items={record.surgeryHistory}
        other={record.surgeryHistoryOther}
      />
      <Section
        title="Prótesis"
        items={record.prosthesis}
        other={record.prosthesisOther}
      />
      <Section
        title="Tratamientos recientes"
        items={record.recentTreatment}
        other={record.recentTreatmentOther}
      />
      <Section
        title="Tratamientos pasados"
        items={record.pastTreatment}
        other={record.pastTreatmentOther}
      />
      <Section
        title="Tratamientos estéticos"
        items={record.aestheticTreatment}
        other={record.aestheticTreatmentOther}
      />

      {/* Medicación y vacunas */}
      <Section
        title="Medicación reciente"
        items={record.medication}
        other={record.medicationOther}
      />
      <Section
        title="Historial de alergias"
        items={record.allergyHistory}
        other={record.allergyHistoryOther}
      />
      <Section
        title="Uso de Isotretinoína (Roacután)"
        items={record.isotretinoinUsage}
        other={record.isotretinoinUsageOther}
      />
      <Section
        title="Vacuna antitetánica"
        items={[record.tetanusVaccine]}
        other={record.tetanusVaccineOther}
      />

      {/* Otros */}
      <Section
        title="Otras condiciones"
        items={record.otherCondition}
        other={record.otherConditionDetail}
      />

      {/* Grupo sanguíneo */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800">Grupo sanguíneo</h2>
        <p className="text-gray-700">{record.bloodType}</p>
      </div>
    </main>
  );
};

export default MedicalRecordComponent;
