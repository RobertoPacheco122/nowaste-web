"use client";

import { cartContext } from "@/providers/cart-provider";
import { useContextSelector } from "use-context-selector";

export const useUserCart = () => {
  const items = useContextSelector(cartContext, (context) => context.items);

  const handleAddItem = useContextSelector(
    cartContext,
    (context) => context.handleAddItem
  );

  const handleAddItemQuantity = useContextSelector(
    cartContext,
    (context) => context.handleAddItemQuantity
  );

  const handleClearAllItems = useContextSelector(
    cartContext,
    (context) => context.handleClearAllItems
  );

  const handleRemoveItem = useContextSelector(
    cartContext,
    (context) => context.handleRemoveItem
  );

  return {
    handleAddItem,
    handleAddItemQuantity,
    handleClearAllItems,
    handleRemoveItem,
    items,
  };
};
