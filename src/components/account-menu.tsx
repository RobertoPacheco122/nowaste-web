"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, MapPin, ScrollText, User } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoggedUser } from "@/hooks/use-logged-user";
import { removeUserAuthToken } from "@/utils/user/remove-user-auth-token";

export function AccountMenu() {
  const { loggedUser, setLoggedUser } = useLoggedUser();

  const router = useRouter();

  const handleLogout = () => {
    removeUserAuthToken();
    setLoggedUser(null);

    router.push("/auth/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <User />
          <span>
            Olá,{" "}
            <span className="font-semibold">
              {loggedUser?.name || "visitante"}!
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-semibold">
          Minha conta
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {!loggedUser && (
            <React.Fragment>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-muted"
                asChild
              >
                <Link href="/auth/sign-up">Cadastrar-se</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-muted"
                asChild
              >
                <Link href="/auth/sign-in">Entrar</Link>
              </DropdownMenuItem>
            </React.Fragment>
          )}

          {loggedUser && (
            <React.Fragment>
              <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                <User /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted"
              >
                <Link href="/addresses">
                  <MapPin /> Endereços
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted"
              >
                <Link href="/orders">
                  <ScrollText /> Pedidos
                </Link>
              </DropdownMenuItem>
            </React.Fragment>
          )}
        </DropdownMenuGroup>

        {loggedUser && (
          <React.Fragment>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-muted hover:text-red-500"
                asChild
              >
                <span onClick={handleLogout} className="text-red-500">
                  <LogOut className="text-red-500" /> Sair
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
