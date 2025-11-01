import { useContextSelector } from "use-context-selector";
import { productsPageContext } from "../_providers/products-page-provider";

export const useSelectedAddress = () => {
  const selectedAddressId = useContextSelector(
    productsPageContext,
    (context) => context.selectedAddressId
  );

  const setSelectedAddressId = useContextSelector(
    productsPageContext,
    (context) => context.setSelectedAddressId
  );

  return {
    selectedAddressId,
    setSelectedAddressId,
  };
};
