"use client";

import { cartContext } from "@/providers/cart-provider";
import { useContextSelector } from "use-context-selector";

export const useUserCart = () => {
  const items = useContextSelector(cartContext, (context) => context.items);

  const handleAddItem = useContextSelector(
    cartContext,
    (context) => context.handleAddItem
  );

  const handleRemoveItem = useContextSelector(
    cartContext,
    (context) => context.handleRemoveItem
  );

  const handleAddItemQuantity = useContextSelector(
    cartContext,
    (context) => context.handleAddItemQuantity
  );

  return {
    items,
    handleAddItem,
    handleRemoveItem,
    handleAddItemQuantity,
  };
};
