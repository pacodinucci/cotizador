"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { montserrat, oswald } from "@/lib/fonts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { usePersonalData } from "../../../context/personal-data-context";
import CustomDatePicker from "../ui/custom-date-picker";
import {
  APPROACH_OPTIONS,
  NATIONALITIES,
  PROVINCES,
} from "@/lib/formConstants";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  //   phone: z.string().min(1, { message: "El teléfono es requerido." }),
  phonePrefix: z
    .string()
    .min(2, { message: "La característica es requerida." }),
  phoneNumber: z.string().min(6, { message: "El número es requerido." }),
  email: z.string().email({ message: "Email inválido." }),
  nickname: z.string().optional(),

  dni: z.string().min(1, { message: "El DNI es requerido." }),
  gender: z.enum(["Femenino", "Masculino", "Otro"], {
    required_error: "El género es requerido.",
  }),
  birthDate: z
    .string()
    .min(1, { message: "La fecha de nacimiento es requerida." }),
  address: z.string().min(1, { message: "La dirección es requerida." }),
  province: z.string().min(1, { message: "La provincia es requerida." }),
  city: z.string().optional(),
  neighborhood: z.string().optional(),

  nationality: z.string().min(1, { message: "La nacionalidad es requerida." }),
  profession: z.string().optional(),

  contactName: z.string().optional(),
  contactNumber: z.string().optional(),

  approach: z.array(z.string()).min(1, { message: "Debes elegir una opción." }),
  approachContact: z.string().optional(),
  otherReason: z.string().optional(),

  medicalCoverage: z.string().optional(),
  medicalCoveragePlan: z.string().optional(),
  medicalCoverageNumber: z.string().optional(),
});

const PersonalDataForm = () => {
  const router = useRouter();
  const { email, setCustomerId } = usePersonalData();

  console.log(email);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phonePrefix: "",
      phoneNumber: "",
      email: email || "",
      approach: [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const phone = `549${data.phonePrefix}${data.phoneNumber}`;

    const { phonePrefix, phoneNumber, ...rest } = data;
    const payload = {
      ...rest,
      phone,
    };

    try {
      const response = await axios.post("/api/customers", payload);
      const createdCustomer = response.data;
      setCustomerId(createdCustomer.id);
      router.push("/form/medicalRecord");
      console.log(payload);
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  return (
    <div className={`${montserrat.className} p-4 md:px-40 md:w-[70vw] mx-auto`}>
      <div className="my-4">
        <h1 className="text-4xl text-neutral-900">Datos Personales</h1>
        <h3 className="text-lg text-neutral-500">
          Para empezar, te pedimos que completes algunos datos personales.
        </h3>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-8 py-4 text-neutral-800"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="p-2 rounded-md bg-neutral-50 flex flex-col gap-y-8">
            <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-12">
              {/* Email */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <div className="flex gap-x-2">
                  {/* Característica */}
                  <FormField
                    name="phonePrefix"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ej: 11"
                            className="w-20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Número */}
                  <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Número"
                            className="w-56"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 gap-x-12">
              {/* Nombre */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Apodo */}
              <FormField
                name="nickname"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apodo</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Género */}
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-80">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona género" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Fecha de nacimiento */}
              <FormField
                name="birthDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 gap-x-12">
              {/* Nacionalidad */}
              <FormField
                name="nationality"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nacionalidad</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-80">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una nacionalidad" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />

                      <SelectContent>
                        {NATIONALITIES.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* DNI */}
              <FormField
                name="dni"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 gap-x-12">
              {/* Domicilio */}
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domicilio</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Provincia */}
              <FormField
                name="province"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-80">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una provincia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROVINCES.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-12">
              {/* Barrio */}
              <FormField
                name="neighborhood"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barrio</FormLabel>
                    <FormLabel className="pl-2 text-xs text-neutral-500">
                      * Solo si vivís en CABA
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Localidad */}
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localidad</FormLabel>
                    <FormLabel className="pl-2 text-xs text-neutral-500">
                      * Solo si no vivís en CABA
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Profesión */}
            <FormField
              name="profession"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profesión</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-80" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-8 bg-orange-50 p-2 rounded-md">
            <div>
              <h3>Contacto de Emergencia</h3>
              <h4 className="text-sm text-neutral-800">
                Podés dejarnos un contacto de emergencia de un amigo o familiar
                ante cualquier eventualidad que pueda suceder en el consultorio.
              </h4>
            </div>
            {/* Nombre de Contacto */}
            <FormField
              name="contactName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Contacto</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-80" />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Número de Contacto */}
            <FormField
              name="contactNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de teléfono de Contacto</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-80" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-8 p-2 bg-emerald-50 rounded-md">
            {/* Cómo se acercó (checkbox group) */}
            <FormField
              name="approach"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cómo conociste Clínica W?</FormLabel>
                  <div className="flex flex-col gap-2 px-2">
                    {APPROACH_OPTIONS.map((option) => (
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

                  {/* Mostrar campo adicional si se selecciona "Otros" */}
                  {field.value?.includes("Otros") && (
                    <FormField
                      name="otherReason"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormLabel>Especificá el motivo:</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Mostrar campo adicional para persona que recomendó */}
                  {field.value?.some((v) =>
                    [
                      "Recomendación de amigo/a o familiar",
                      "Recomendación de otro Profesional o Institución Médica",
                      "Recomendación de otro lugar/comercio",
                    ].includes(v)
                  ) && (
                    <FormField
                      name="approachContact"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormLabel>¿Quién te recomendó o refirió?</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-8 bg-zinc-50 p-2 rounded-md">
            <h3>
              ⛔ Completar solo si vas a realizar una consulta con el Dr.
              Wetzel. Caso contrario no es necesario completar
            </h3>
            <div className="flex gap-y-12">
              {/* Cobertura Médica */}
              <FormField
                name="medicalCoverage"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cobertura Médica</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 gap-x-12">
              {/* Cobertura Médica */}
              <FormField
                name="medicalCoveragePlan"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan de Cobertura Médica</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80 md:w-auto" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Número de Cobertura Médica */}
              <FormField
                name="medicalCoverageNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Número de asociado de Cobertura Médica
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80 md:w-auto" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-1/4 self-center text-lg md:text-base"
          >
            {isLoading ? "Cargando" : "Siguiente"}
            {isLoading && <Loader2 className="h-5 w-5 animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PersonalDataForm;
