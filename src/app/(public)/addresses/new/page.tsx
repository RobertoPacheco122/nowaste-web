"use client";

import React from "react";

import z from "zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Plus } from "lucide-react";
import { IMaskInput } from "react-imask";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewAddressIntro } from "./_components/new-address-intro";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConvertZipCodeToAddress } from "@/hooks/use-convert-zip-code-to-address";
import { useRegisterAddressForm } from "./_hooks/use-register-address-form";
import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";
import { Spinner } from "@/components/ui/spinner";

const INPUT_STYLES_CLASSNAME = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

const registerAdressFormSchema = z.object({
  streetName: z.string().nonempty("Obrigatório."),
  addressType: z.enum(["1", "2", "3", "4"], {
    error: "Selecione um valor.",
  }),
  zipCode: z
    .string()
    .nonempty("Obrigatório.")
    .transform((zipCoode) => zipCoode.replace(/\D/g, ""))
    .refine((zipCoode) => zipCoode.length === 8, {
      message: "O CEP deve ter 8 dígitos.",
    }),
  number: z.string().nonempty("Obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().nonempty("Obrigatório."),
  city: z.string().nonempty("Obrigatório."),
  state: z.string().nonempty("Obrigatório."),
  latitude: z.number(),
  longitude: z.number(),
});

export type RegisterAdressFormData = z.infer<typeof registerAdressFormSchema>;

export default function NewAddress() {
  const [zipCodeToFetch, setZipCodeToFetch] = React.useState("");

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RegisterAdressFormData>({
    resolver: zodResolver(registerAdressFormSchema),
    defaultValues: {
      city: "",
      streetName: "",
      zipCode: "",
      number: "",
      complement: "",
      neighborhood: "",
      state: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const {
    data: zipCodeInformations,
    isLoading: isFetchingZipCodeInformations,
  } = useConvertZipCodeToAddress({ zipCode: zipCodeToFetch });

  const { registerAddressMutation, isPending } = useRegisterAddressForm();

  React.useEffect(() => {
    if (!zipCodeInformations) return;

    const { address, cep, city, district, lat, lng, state } =
      zipCodeInformations;

    if (address) setValue("streetName", address);
    if (cep) setValue("zipCode", cep);
    if (city) setValue("city", city);
    if (district) setValue("neighborhood", district);
    if (lat) setValue("latitude", Number(lat));
    if (lng) setValue("longitude", Number(lng));
    if (state) setValue("state", state);
  }, [zipCodeInformations, setValue]);

  const handleCepFieldBlur = () => {
    const zipCode = getValues("zipCode");

    const cleanedZipCode = zipCode.replace(/\D/g, "");

    if (cleanedZipCode.length !== 8) return;

    setZipCodeToFetch(cleanedZipCode);
  };

  const onSubmit = async ({
    addressType,
    city,
    latitude,
    longitude,
    neighborhood,
    number,
    state,
    streetName,
    zipCode,
    complement,
  }: RegisterAdressFormData) => {
    try {
      const loggedUser = getLoggedUserInformations();

      if (!loggedUser) return;

      await registerAddressMutation({
        addressType: Number(addressType),
        city,
        latitude,
        longitude,
        complement: complement || "",
        neighborhood,
        number,
        state,
        streetName,
        zipCode,
        personId: loggedUser.personId,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error while registering address: ${error.message}`);
      }
    }
  };

  return (
    <main className="min-h-screen">
      <NewAddressIntro />
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do endereço</CardTitle>
            <CardDescription>
              Nós utilizaremos esse endereço para apresentar a você ofertas e
              para entregas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-4">
              <FieldGroup>
                <Field>
                  <FieldLabel
                    className="flex items-center justify-between font-semibold"
                    htmlFor="address-type"
                  >
                    Tipo de endereço
                    <FieldError>
                      <span>{errors.addressType?.message}</span>
                    </FieldError>
                  </FieldLabel>
                  <Controller
                    control={control}
                    name="addressType"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="address-type">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Casa</SelectItem>
                          <SelectItem value="2">Trabalho</SelectItem>
                          <SelectItem value="4">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field>
                  <FieldLabel
                    className="flex items-center justify-between font-semibold"
                    htmlFor="zipCode"
                  >
                    CEP
                    <FieldError>
                      <span>{errors.zipCode?.message}</span>
                    </FieldError>
                  </FieldLabel>
                  <Controller
                    control={control}
                    name="zipCode"
                    render={({ field: { onChange, value, name, ref } }) => (
                      <IMaskInput
                        mask="00000-000"
                        id="zipCode"
                        placeholder="00000-000"
                        onBlur={handleCepFieldBlur}
                        ref={ref}
                        name={name}
                        className={cn(INPUT_STYLES_CLASSNAME)}
                        value={value}
                        onAccept={(unmaskedValue) => onChange(unmaskedValue)}
                      />
                    )}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel
                      className="flex justify-between font-semibold"
                      htmlFor="streetName"
                    >
                      Logradouro
                      <FieldError>
                        <span>{errors.streetName?.message}</span>
                      </FieldError>
                    </FieldLabel>
                    <Input
                      id="streetName"
                      {...register("streetName")}
                      placeholder="Ex.: Rua das Laranjeiras"
                      disabled={isFetchingZipCodeInformations}
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      className="flex justify-between font-semibold"
                      htmlFor="number"
                    >
                      Número
                      <FieldError>
                        <span>{errors.number?.message}</span>
                      </FieldError>
                    </FieldLabel>
                    <Input
                      id="number"
                      {...register("number")}
                      placeholder="Ex.: 123"
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="font-semibold" htmlFor="complement">
                      Complemento (opcional)
                    </FieldLabel>
                    <Input id="complement" {...register("complement")} />
                  </Field>
                  <Field>
                    <FieldLabel
                      className="flex justify-between font-semibold"
                      htmlFor="neighborhood"
                    >
                      Bairro
                      <FieldError>
                        <span>{errors.neighborhood?.message}</span>
                      </FieldError>
                    </FieldLabel>
                    <Input
                      id="neighborhood"
                      {...register("neighborhood")}
                      disabled={isFetchingZipCodeInformations}
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      className="flex justify-between font-semibold"
                      htmlFor="city"
                    >
                      Cidade
                      <FieldError>
                        <span>{errors.city?.message}</span>
                      </FieldError>
                    </FieldLabel>
                    <Input id="city" {...register("city")} disabled={true} />
                  </Field>
                  <Field>
                    <FieldLabel
                      className="flex justify-between font-semibold"
                      htmlFor="state"
                    >
                      Estado
                      <FieldError>
                        <span>{errors.state?.message}</span>
                      </FieldError>
                    </FieldLabel>
                    <Input id="state" {...register("state")} disabled={true} />
                  </Field>
                </div>
              </FieldGroup>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isPending ? <Spinner /> : <Plus />} Adicionar
              </Button>
            </form>
            <Button
              asChild
              variant={"outline"}
              className="w-full cursor-pointer"
            >
              <Link href="/addresses">
                <ChevronLeft />
                Voltar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
