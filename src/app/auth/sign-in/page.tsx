"use client";

import React from "react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  ShoppingCart,
  Sprout,
} from "lucide-react";

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
import { useSignInForm } from "./_hooks/use-sign-in-form";
import { Spinner } from "@/components/ui/spinner";

const authFormSchema = z.object({
  email: z
    .email("Email invalido. Tente novamente")
    .nonempty("Campo obrigatório."),
  password: z.string().nonempty("Campo obrigatório."),
});

export type AuthFormData = z.infer<typeof authFormSchema>;

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
  });

  const { authenticateMutation, isPending } = useSignInForm();

  const handleFormSubmit = React.useCallback(
    async (data: AuthFormData) => {
      try {
        await authenticateMutation(data);

        toast.success("Login realizado com sucesso!");
        router.push("/products");
      } catch (error) {
        console.error(error);
      }
    },
    [authenticateMutation, router]
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="bg-gradient-to-br from-green-50 to-green-100 grow px-8 py-12 lg:px-16 flex flex-col items-start justify-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Bem-vindo de volta a <span className="text-green-600">Nowaste</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Continue sua jornada para reduzir o desperdício de alimentos e
            economizar dinheiro. Acesse ofertas exclusivas de fornecedores
            locais e ajude a construir uma comunidade mais sustentável.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <ShoppingCart />
              </div>
              Acesse suas ofertas salvas e favoritas
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <MapPin />
              </div>
              Obtenha recomendações personalizadas perto de você
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <Sprout />
              </div>
              Acompanhe o seu impacto ambiental
            </li>
          </ul>
        </div>
      </div>
      <main>
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16 h-full">
          <div className="mx-auto w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Entrar</CardTitle>
                <CardDescription>
                  Preencha seu email e senha para acessar sua conta e aproveitar
                  nossas ofertas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(handleFormSubmit)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email</Label>
                      {errors.email && (
                        <span className="text-sm text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...register("email")}
                        placeholder="meuemail@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      {errors.password && (
                        <span className="text-sm text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...register("password")}
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        className="pl-10"
                        placeholder="Sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
                  <div>
                    <Link
                      href={"/auth/recover-password"}
                      className="text-sm mb-4 text-green-600 hover:text-green-500 hover:underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Entrar"}
                  </Button>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                      Não possui uma conta?
                    </span>{" "}
                    <Link
                      href={"/auth/sign-up"}
                      className="text-sm font-semibold text-green-600 hover:text-green-500 hover:underline "
                    >
                      Cadastre-se
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
