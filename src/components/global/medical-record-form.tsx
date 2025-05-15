"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { montserrat } from "@/lib/fonts";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePersonalData } from "../../../context/personal-data-context";
import {
  AESTHETIC_TREATMENT_OPTIONS,
  ALLERGY_OPTIONS,
  BLOOD_CONDITIONS_OPTIONS,
  BLOOD_TYPES,
  CARDIOVASCULAR_OPTIONS,
  FAMILY_BACKGROUND_OPTIONS,
  GENERAL_CONDITIONS_OPTIONS,
  GYNECOLOGICAL_CONDITIONS_OPTIONS,
  HORMONAL_CONDITIONS_OPTIONS,
  INFECTIOUS_DISEASES_OPTIONS,
  ISOTRETINOIN_OPTIONS,
  LIVER_DISEASES_OPTIONS,
  LUNG_CONDITIONS_OPTIONS,
  MEDICATION_OPTIONS,
  METABOLIC_CONDITIONS_OPTIONS,
  NEUROLOGICAL_CONDITIONS_OPTIONS,
  ONCOLOGICAL_CONDITIONS_OPTIONS,
  OTHER_CONDITION_OPTIONS,
  PAST_TREATMENT_OPTIONS,
  PROSTHESIS_OPTIONS,
  RECENT_TREATMENT_OPTIONS,
  SKIN_CONDITIONS_OPTIONS,
  SURGERY_HISTORY_OPTIONS,
  TETANUS_VACCINE_OPTIONS,
} from "@/lib/formConstants";
import axios from "axios";

const formSchema = z.object({
  cardiovascular: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  cardiovascularOther: z.string().optional(),

  bloodConditions: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  bloodConditionsOther: z.string().optional(),

  liverDiseases: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  liverDiseasesOther: z.string().optional(),

  infectiousDiseases: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  infectiousDiseasesOther: z.string().optional(),

  neurologicalConditions: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  neurologicalConditionsOther: z.string().optional(),

  lungConditions: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  lungConditionsOther: z.string().optional(),

  bloodType: z
    .string()
    .min(1, { message: "Debes seleccionar tu grupo sanguíneo." }),

  oncologicalConditions: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  oncologicalConditionsOther: z.string().optional(),

  metabolicConditions: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  metabolicConditionsOther: z.string().optional(),

  skinConditions: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una opción." }),
  skinConditionsOther: z.string().optional(),

  gynecologicalConditions: z.array(z.string()).optional(),
  gynecologicalConditionsOther: z.string().optional(),

  familyBackground: z.array(z.string()).optional(),
  familyBackgroundOther: z.string().optional(),

  hormonalConditions: z.array(z.string()).min(1, "Este campo es obligatorio"),
  hormonalConditionsOther: z.string().optional(),

  surgeryHistory: z.array(z.string()).min(1, "Este campo es obligatorio"),
  surgeryHistoryOther: z.string().optional(),

  prosthesis: z.array(z.string()).min(1, "Este campo es obligatorio"),
  prosthesisOther: z.string().optional(),

  generalCondition: z.array(z.string()).min(1, "Este campo es obligatorio."),

  medication: z.array(z.string()).min(1, "Este campo es obligatorio"),
  medicationOther: z.string().optional(),

  recentTreatment: z.array(z.string()).min(1, "Este campo es obligatorio"),
  recentTreatmentOther: z.string().optional(),

  pastTreatment: z.array(z.string()).min(1, "Este campo es obligatorio"),
  pastTreatmentOther: z.string().optional(),

  aestheticTreatment: z
    .array(z.string())
    .min(1, { message: "Debés seleccionar una opción." }),

  aestheticTreatmentOther: z.string().optional(),

  allergyHistory: z
    .array(z.string())
    .min(1, { message: "Debés seleccionar una opción." }),

  allergyHistoryOther: z.string().optional(),

  isotretinoinUsage: z
    .array(z.string())
    .min(1, { message: "Debés seleccionar una opción." }),

  isotretinoinUsageOther: z.string().optional(),

  tetanusVaccine: z
    .string()
    .min(1, { message: "Debés seleccionar una opción." }),

  tetanusVaccineOther: z.string().optional(),

  otherCondition: z
    .array(z.string())
    .min(1, { message: "Debés seleccionar una opción." }),

  otherConditionDetail: z.string().optional(),
});

const MedicalRecordForm = () => {
  const router = useRouter();
  const { customerId } = usePersonalData();

  console.log(customerId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      ...data,
      customerId,
    };
    try {
      const response = await axios.post("/api/medicalRecord", payload);
      router.push("/form/successful");
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  return (
    <div className={`${montserrat.className} p-4 md:px-40 w-[70vw] mx-auto`}>
      <div className="my-4">
        <h1 className="text-4xl text-neutral-900">Cuestionario de Salud</h1>
        <h3 className="text-lg text-neutral-500">
          A continuación te haremos algunas preguntas relacionadas con tu
          historial médico. Si tenes antecedentes de alguna de las condiciones
          por favor marcala/s y luego describi cualquier detalle importante en
          &quot;otro&quot;.
        </h3>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-8 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Cardiovascular */}
          <FormField
            name="cardiovascular"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones
                  cardiovasculares?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {CARDIOVASCULAR_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            if (checked) {
                              field.onChange([...newValue, option]);
                            } else {
                              field.onChange(
                                newValue.filter((v) => v !== option)
                              );
                            }
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="cardiovascularOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sangre */}
          <FormField
            name="bloodConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones de la sangre?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {BLOOD_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            if (checked) {
                              field.onChange([...newValue, option]);
                            } else {
                              field.onChange(
                                newValue.filter((v) => v !== option)
                              );
                            }
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="bloodConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Patologías hepáticas */}
          <FormField
            name="liverDiseases"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías hepáticas?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {LIVER_DISEASES_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            if (checked) {
                              field.onChange([...newValue, option]);
                            } else {
                              field.onChange(
                                newValue.filter((v) => v !== option)
                              );
                            }
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="liverDiseasesOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condiciones infecciosas */}
          <FormField
            name="infectiousDiseases"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de enfermedades/condiciones infecciosas?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {INFECTIOUS_DISEASES_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            if (checked) {
                              field.onChange([...newValue, option]);
                            } else {
                              field.onChange(
                                newValue.filter((v) => v !== option)
                              );
                            }
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="infectiousDiseasesOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condiciones neurológicas o neuromusculares */}
          <FormField
            name="neurologicalConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de condiciones neurológicas o
                  neuromusculares?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {NEUROLOGICAL_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="neurologicalConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condiciones pulmonares */}
          <FormField
            name="lungConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones pulmonares?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {LUNG_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="lungConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Grupo y factor sanguíneo */}
          <FormField
            name="bloodType"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>¿Cuál es su grupo y factor sanguíneo?</FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {BLOOD_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={() => field.onChange(type)}
                        className="accent-green-600"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Patologías oncológicas */}
          <FormField
            name="oncologicalConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones oncológicas?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {ONCOLOGICAL_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="oncologicalConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Patologías metabólicas */}
          <FormField
            name="metabolicConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones metabólicas?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {METABOLIC_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="metabolicConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Patologías de la piel */}
          <FormField
            name="skinConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones de la piel?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {SKIN_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="skinConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Patologías ginecológicas */}
          <FormField
            name="gynecologicalConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones ginecológicas?{" "}
                  <span className="text-sm italic text-gray-500 block">
                    *Exclusiva para pacientes mujeres
                  </span>
                </FormLabel>

                <div className="flex flex-col gap-2 px-2">
                  {GYNECOLOGICAL_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="gynecologicalConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Antecedentes de familia */}
          <FormField
            name="familyBackground"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  Antecedentes de Familia{" "}
                  <span className="text-sm italic text-gray-500 block">
                    *Exclusiva para pacientes mujeres
                  </span>
                </FormLabel>

                <div className="flex flex-col gap-2 px-2">
                  {FAMILY_BACKGROUND_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          field.onChange(
                            checked
                              ? [...newValue, option]
                              : newValue.filter((v) => v !== option)
                          );
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="familyBackgroundOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Patologías hormonales */}
          <FormField
            name="hormonalConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedentes de patologías/condiciones hormonales?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {HORMONAL_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Otros") && (
                  <FormField
                    name="hormonalConditionsOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Especificar..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cirugías previas */}
          <FormField
            name="surgeryHistory"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Alguna vez te realizaron un procedimiento quirúrgico?
                  <p className="text-sm text-neutral-500">
                    Si alguna vez has tenido una cirugía por favor indique que
                    &quot;Sí&quot; y luego desarrolle en &quot;otro&quot;
                    indicando el tipo de procedimiento, el año y el estado
                    actual.
                  </p>
                </FormLabel>

                <div className="flex flex-col gap-2 px-2">
                  {SURGERY_HISTORY_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "No") {
                            return checked
                              ? field.onChange(["No"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("No")) {
                            const filtered = newValue.filter((v) => v !== "No");
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {/* Mostrar input si seleccionó "Sí" */}
                {field.value?.includes("Sí") && (
                  <FormField
                    name="surgeryHistoryOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Especificá el procedimiento</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Ej: cesárea (2019), sin complicaciones"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="prosthesis"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés alguna prótesis médica?
                  <p className="text-sm text-neutral-500">
                    Ejemplo: Metálica, dental, acústica, válvula cardíaca, etc.
                    Si la respuesta es afirmativa por favor indique que
                    &quot;Sí&quot; y luego desarrolle en &quot;otro&quot;
                    indicando el tipo de prótesis.
                  </p>
                </FormLabel>

                <div className="flex flex-col gap-2 px-2">
                  {PROSTHESIS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "No") {
                            return checked
                              ? field.onChange(["No"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("No")) {
                            const filtered = newValue.filter((v) => v !== "No");
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {/* Mostrar input si seleccionó "Sí" */}
                {field.value?.includes("Sí") && (
                  <FormField
                    name="prosthesisOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Especificar prótesis</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Ej: prótesis dental"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="generalCondition"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Presenta alguna de las siguientes condiciones?
                </FormLabel>

                <div className="flex flex-col gap-2 px-2">
                  {GENERAL_CONDITIONS_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];

                          if (option === "Ninguna") {
                            return checked
                              ? field.onChange(["Ninguna"])
                              : field.onChange([]);
                          }

                          if (newValue.includes("Ninguna")) {
                            const filtered = newValue.filter(
                              (v) => v !== "Ninguna"
                            );
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="medication"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tomaste alguna medicación en las últimas semanas?
                  <p className="text-sm text-neutral-500">
                    Ejemplo: Anticonceptivos, Antibióticos, Hipertensivos,
                    Corticoides. Si la respuesta es afirmativa por favor indique
                    en &quot;otro&quot; el fármaco, dosis, frecuencia y fecha de
                    la última toma.
                  </p>
                </FormLabel>

                <div className="flex flex-col gap-2 px-2">
                  {MEDICATION_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (option === "No") {
                            return checked
                              ? field.onChange(["No"])
                              : field.onChange([]);
                          }
                          if (newValue.includes("No")) {
                            const filtered = newValue.filter((v) => v !== "No");
                            field.onChange(
                              checked ? [...filtered, option] : filtered
                            );
                          } else {
                            field.onChange(
                              checked
                                ? [...newValue, option]
                                : newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {/* ✅ Mostrar input si seleccionó "Sí" */}
                {field.value?.includes("Sí") && (
                  <FormField
                    name="medicationOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Especificar medicación:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-96"
                            placeholder="Ej: Ibuprofeno 600mg, 1 cada 8 hs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="recentTreatment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Realizaste algún tratamiento médico recientemente?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {RECENT_TREATMENT_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (checked) {
                            field.onChange([...newValue, option]);
                          } else {
                            field.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {field.value?.includes("Sí") && (
                  <FormField
                    name="recentTreatmentOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Especificá el tratamiento:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="pastTreatment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Realizaste algún tratamiento (médico o farmacológico) de
                  importancia en el pasado?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {PAST_TREATMENT_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (checked) {
                            field.onChange([...newValue, option]);
                          } else {
                            field.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {field.value?.includes("Sí") && (
                  <FormField
                    name="pastTreatmentOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Especificá el tratamiento:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="aestheticTreatment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Realizaste algún procedimiento estético recientemente?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {AESTHETIC_TREATMENT_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (checked) {
                            field.onChange([...newValue, option]);
                          } else {
                            field.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Sí") && (
                  <FormField
                    name="aestheticTreatmentOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>
                          Especificá el tipo de tratamiento y su estado actual:
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="allergyHistory"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>¿Tenés antecedentes de alergia?</FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {ALLERGY_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (checked) {
                            field.onChange([...newValue, option]);
                          } else {
                            field.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {field.value?.includes("Sí") && (
                  <FormField
                    name="allergyHistoryOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>
                          Especificá el motivo y la gravedad:
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ¿Alguna vez utilizaste fármacos con Isotretinoína (Roacután)? */}
          <FormField
            name="isotretinoinUsage"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Alguna vez utilizaste fármacos con Isotretinoína (Roacután)?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {ISOTRETINOIN_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (checked) {
                            field.onChange([...newValue, option]);
                          } else {
                            field.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <FormMessage />

                {field.value?.includes("Sí") && (
                  <FormField
                    name="isotretinoinUsageOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </FormItem>
            )}
          />

          {/* ¿Alguna vez te aplicaste la vacuna antitetánica? */}
          <FormField
            name="tetanusVaccine"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Alguna vez te aplicaste la vacuna antitetánica?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {TETANUS_VACCINE_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === option}
                        onCheckedChange={() => {
                          field.onChange(option === field.value ? "" : option);
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                <FormMessage />

                {field.value === "Sí" && (
                  <FormField
                    name="tetanusVaccineOther"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>
                          Especificá cuándo y por qué razón:
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-96" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </FormItem>
            )}
          />

          <FormField
            name="otherCondition"
            control={form.control}
            render={({ field }) => (
              <FormItem className="bg-zinc-50 p-8 rounded-md">
                <FormLabel>
                  ¿Tenés antecedente de algún tratamiento o condición que no
                  figure en este cuestionario?
                </FormLabel>
                <div className="flex flex-col gap-2 px-2">
                  {OTHER_CONDITION_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const newValue = field.value || [];
                          if (checked) {
                            field.onChange([...newValue, option]);
                          } else {
                            field.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <FormMessage />
                {field.value?.includes("Sí") && (
                  <FormField
                    name="otherConditionDetail"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Otros:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-1/4 self-center"
          >
            {isLoading ? "Enviando..." : "Siguiente"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MedicalRecordForm;
