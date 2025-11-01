import { useContextSelector } from "use-context-selector";
import { productsPageContext } from "../_providers/products-page-provider";

export const useProductsAppliedFilters = () => {
  const appliedFilters = useContextSelector(
    productsPageContext,
    (context) => context.appliedFilters
  );

  const setAppliedFilters = useContextSelector(
    productsPageContext,
    (context) => context.setAppliedFilters
  );

  return {
    appliedFilters,
    setAppliedFilters,
  };
};
