"use client";

import React from "react";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div>
              <Link
                href={"/auth/recover-password"}
                className="text-sm mb-4 text-green-600 hover:text-green-500 hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Button className="w-full">Entrar</Button>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
