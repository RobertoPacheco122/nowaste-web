"use client";

import React from "react";

import Link from "next/link";
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

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-4">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" type="text" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <div className="relative">
                      <Input id="cpf" type="text" />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input id="rg" type="text" />
                  </div>
                  <div className="space-y-2 col-span-4">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="meuemail@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-4">
                    <Label htmlFor="email">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
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
                  <div className="space-y-2 col-span-4">
                    <Label htmlFor="email">Confirme a senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={"password"}
                        className="pl-10"
                        placeholder="Confirme sua senha"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="cursor-pointer" />
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
                <Button className="w-full cursor-pointer">Criar conta</Button>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
