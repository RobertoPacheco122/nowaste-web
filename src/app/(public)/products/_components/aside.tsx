"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProductsFilters } from "./products-filters";

export const Aside = () => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky">
        <Card className="py-0">
          <CardContent className="p-6">
            <ProductsFilters />
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};
