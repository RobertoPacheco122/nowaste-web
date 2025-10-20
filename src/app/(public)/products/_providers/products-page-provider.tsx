"use client";

import React from "react";

import { createContext } from "use-context-selector";
import {
  productsFiltersSchema,
  type ProductsFiltersSchema,
} from "../_components/products-filters";

interface ProductsPageContext {
  selectedAddressId: string | undefined;
  setSelectedAddressId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  appliedFilters: ProductsFiltersSchema;
  setAppliedFilters: (filters: ProductsFiltersSchema) => void;
}

export const productsPageContext = createContext<ProductsPageContext>({
  selectedAddressId: undefined,
  setSelectedAddressId: () => {},
  appliedFilters: {} as ProductsFiltersSchema,
  setAppliedFilters: () => {},
});

export const ProductsPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appliedFilters, setAppliedFilters] =
    React.useState<ProductsFiltersSchema>(productsFiltersSchema.parse({}));
  const [selectedAddressId, setSelectedAddressId] = React.useState<
    string | undefined
  >(undefined);

  return (
    <productsPageContext.Provider
      value={{
        appliedFilters,
        setAppliedFilters,
        selectedAddressId,
        setSelectedAddressId,
      }}
    >
      {children}
    </productsPageContext.Provider>
  );
};
