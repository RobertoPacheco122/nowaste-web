"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import React from "react";
import { ProductsFilters } from "./products-filters";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProductsIntro = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  return (
    <section className="py-6 bg-gray-50">
      <div className="container m-auto px-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ofertas de alimentos
            </h1>
            <p className="text-gray-500 mt-2">
              Encontre alimentos perfeitamente bons a preços incríveis. Ajude o
              comércio local
            </p>
          </div>

          <div className="flex gap-4">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtrar alimentos</SheetTitle>
                  <SheetDescription>
                    Refine sua busca para encontrar os melhores negócios
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-140px)]">
                  <div className="p-4 ">
                    <ProductsFilters />
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
