"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AddressesIntro = () => {
  return (
    <section className="py-6 bg-gray-50 mb-4">
      <div className="container m-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Meus endereços
              </h1>
              <p className="text-gray-500 mt-2">
                Gerencie os seus endereços salvos para entregas
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/addresses/new">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar endereço
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
