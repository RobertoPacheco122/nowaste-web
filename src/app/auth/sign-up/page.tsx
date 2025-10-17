"use client";

import React from "react";

import Link from "next/link";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  PiggyBank,
  Smartphone,
  Store,
} from "lucide-react";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { userRoles } from "@/api/user/register-user";
import { useSignUpForm } from "./_hooks/use-sign-up-form";
import { Spinner } from "@/components/ui/spinner";

const INPUT_STYLES_CLASSNAME = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

const registerUserFormSchema = z
  .object({
    fullname: z.string().nonempty("Obrigatório"),

    nickname: z.string().optional(),

    cpf: z
      .string()
      .nonempty("Obrigatório")
      .transform((cpf) => cpf.replace(/\D/g, ""))
      .refine((cpf) => cpf.length === 11, {
        message: "CPF inválido",
      }),

    phoneNumber: z
      .string()
      .nonempty("Obrigatório")
      .transform((phone) => phone.replace(/\D/g, ""))
      .refine((phone) => phone.length >= 10 && phone.length <= 11, {
        message: "Inválido",
      }),

    birthDate: z
      .string()
      .nonempty("Obrigatório")
      .refine(
        (date) => {
          const eighteenYearsAgo = dayjs().subtract(18, "years");
          const userBirthDate = dayjs(date);

          return (
            userBirthDate.isBefore(eighteenYearsAgo) ||
            userBirthDate.isSame(eighteenYearsAgo)
          );
        },
        {
          message: "Deves ser maior de 18 anos",
        }
      ),

    email: z.email("Inválido").nonempty("Obrigatório"),

    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

    confirmPassword: z.string().nonempty("Obrigatório"),

    termsOfUser: z.boolean().refine((value) => value, {
      message: "Deve aceitar os termos de uso",
    }),

    role: z.enum(userRoles),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export type RegisterUserFormData = z.infer<typeof registerUserFormSchema>;

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const router = useRouter();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
    values: {
      fullname: "",
      nickname: "",
      phoneNumber: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      termsOfUser: false,
      role: "customer",
    },
  });

  const { registerUserMutation, isPending } = useSignUpForm();

  const handleSubmitForm = async (data: RegisterUserFormData) => {
    try {
      await registerUserMutation(data);

      reset();
      toast.success(
        <span className="font-semibold">Usuário cadastrado com sucesso!</span>,
        {
          description: "Faça login para continuar.",
          action: {
            label: "Ir para login",
            onClick: () => router.push("/auth/sign-in"),
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <section className="bg-gradient-to-br from-green-50 to-green-100 grow px-8 py-12 lg:px-16 flex flex-col items-start justify-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Entre no movimento <span className="text-green-600">Nowaste</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Faça parte de uma comunidade que está fazendo a diferença. Economize
            em alimentos de qualidade, ajude a reduzir o desperdício e apoie os
            negócios locais.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <PiggyBank />
              </div>
              Economize até 70% em alimentos e refeições frescas
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <Globe />
              </div>
              Ajude a reduzir o desperdício de alimentos na sua comunidade
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <Store />
              </div>
              Apoie vendedores e restaurantes locais
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <Smartphone />
              </div>
              Receba notificações instantâneas sobre ofertas próximas
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16 h-full">
          <div className="mx-auto w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Criar uma conta
                </CardTitle>
                <CardDescription>
                  Preencha as informações abaixo para iniciar na Nowaste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(handleSubmitForm)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2 col-span-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="fullname">Nome completo</Label>
                        <span className="text-xs text-red-500">
                          {errors.fullname?.message}
                        </span>
                      </div>
                      <Input
                        {...register("fullname")}
                        id="fullname"
                        type="text"
                        className={errors.fullname && "border-red-500"}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cpf">CPF</Label>
                        <span className="text-xs text-red-500">
                          {errors.cpf?.message}
                        </span>
                      </div>
                      <div className="relative">
                        <Controller
                          name="cpf"
                          control={control}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                          }) => (
                            <IMaskInput
                              mask="000.000.000-00"
                              id="cpf"
                              name={name}
                              value={value}
                              onAccept={(unmaskedValue) =>
                                onChange(unmaskedValue)
                              }
                              onBlur={onBlur}
                              inputRef={ref}
                              placeholder="000.000.000-00"
                              className={cn(
                                INPUT_STYLES_CLASSNAME,
                                errors.cpf && "border-red-500"
                              )}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="phoneNumber">Celular</Label>
                        <span className="text-xs text-red-500">
                          {errors.phoneNumber?.message}
                        </span>
                      </div>
                      <div className="relative">
                        <Controller
                          name="phoneNumber"
                          control={control}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                          }) => (
                            <IMaskInput
                              mask="(00) 00000-0000"
                              id="phoneNumber"
                              name={name}
                              value={value}
                              onAccept={(unmaskedValue) =>
                                onChange(unmaskedValue)
                              }
                              onBlur={onBlur}
                              inputRef={ref}
                              placeholder="(00) 00000-0000"
                              className={cn(
                                INPUT_STYLES_CLASSNAME,
                                errors.phoneNumber && "border-red-500"
                              )}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 col-span-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="birthDate">Data de nascimento</Label>
                        <span className="text-xs text-red-500">
                          {errors.birthDate?.message}
                        </span>
                      </div>
                      <div className="relative">
                        <Input
                          {...register("birthDate")}
                          id="birthDate"
                          type="date"
                          className={errors.birthDate && "border-red-500"}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 col-span-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="email">Email</Label>
                        <span className="text-xs text-red-500">
                          {errors.email?.message}
                        </span>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...register("email")}
                          id="email"
                          type="email"
                          placeholder="meuemail@email.com"
                          className={cn(
                            "pl-10",
                            errors.email && "border-red-500"
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 col-span-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Senha</Label>
                        <span className="text-xs text-red-500">
                          {errors.password?.message}
                        </span>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...register("password")}
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Sua senha"
                          className={cn(
                            "pl-10",
                            errors.password && "border-red-500"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 col-span-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="confirmPassword">
                          Confirme a senha
                        </Label>
                        <span className="text-xs text-red-500">
                          {errors.confirmPassword?.message}
                        </span>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...register("confirmPassword")}
                          id="confirmPassword"
                          type={"password"}
                          placeholder="Confirme sua senha"
                          className={cn(
                            "pl-10",
                            errors.confirmPassword && "border-red-500"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="termsOfUser"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Checkbox
                            id="termsOfUser"
                            checked={value}
                            onCheckedChange={(checked) => onChange(!!checked)}
                            className={cn(
                              "cursor-pointer",
                              errors.termsOfUser && "border-red-500"
                            )}
                          />
                        )}
                      />
                      <div>
                        <Label htmlFor="terms" className="text-sm">
                          <span>
                            Eu concordo com os{" "}
                            <Link
                              href="#"
                              className="text-green-600 hover:underline"
                            >
                              Termos de Serviço
                            </Link>{" "}
                            e{" "}
                            <Link
                              href="#"
                              className="text-green-600 hover:underline"
                            >
                              Políticas de Privacidade
                            </Link>
                          </span>
                        </Label>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full cursor-pointer">
                    {isPending ? <Spinner /> : "Cadastrar-se"}
                  </Button>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                      Já possui uma conta?
                    </span>{" "}
                    <Link
                      href={"/auth/sign-in"}
                      className="text-sm font-semibold text-green-600 hover:text-green-500 hover:underline "
                    >
                      Autentique-se
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
