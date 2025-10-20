"use client";

import React from "react";

import { ProductsSearch } from "./_components/products-search";
import { Aside } from "./_components/aside";
import { ProductsGrid } from "./_components/products-grid";
import { ProductsPageProvider } from "./_providers/products-page-provider";

export default function Products() {
  return (
    <ProductsPageProvider>
      <ProductsSearch />
      <section>
        <div className="container m-auto py-6 px-4">
          <div className="flex gap-6">
            <Aside />
            <ProductsGrid />
          </div>
        </div>
      </section>
    </ProductsPageProvider>
  );
}
