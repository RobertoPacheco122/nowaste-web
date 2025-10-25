"use client";

import React from "react";

import { createContext } from "use-context-selector";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";

import {
  getProductById,
  GetProductByIdResponse,
} from "@/api/product/get-product-by-id";
import {
  CART_ITEMS_COOKIE_NAME,
  CartItemOnCookies,
} from "@/utils/user/remove-user-cart-items-cookies";
import { getUserCartItems } from "@/utils/user/get-user-cart-items";

const PRODUCT_STALE_TIME = 1000 * 60 * 30; // 30 minutes

interface CartItem {
  product: GetProductByIdResponse;
  quantity: number;
}

interface CartContext {
  items: CartItem[];
  handleAddItem: (productId: string, quantity?: number) => Promise<void>;
  handleAddItemQuantity: (productId: string, quantity: number) => void;
  handleClearAllItems: () => void;
  handleRemoveItem: (productId: string) => void;
}

export const cartContext = createContext<CartContext>({
  items: [],
  handleAddItem: async () => {},
  handleAddItemQuantity: () => {},
  handleClearAllItems: () => {},
  handleRemoveItem: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const handleAddItem = React.useCallback(
    async (productId: string, quantity = 1) => {
      try {
        const { data: product, status } = await queryClient.fetchQuery({
          queryKey: ["product", productId],
          queryFn: () => getProductById({ id: productId }),
          staleTime: PRODUCT_STALE_TIME,
        });

        if (status !== 200)
          throw new Error(`Error on product fetching. Status code: ${status}`);

        const lastItem = items[items.length - 1];

        if (
          lastItem &&
          lastItem.product.establishment.id !== product.establishment.id
        ) {
          toast.error(
            <span className="font-semibold">
              Não foi possível adicionar o produto
            </span>,
            {
              description: (
                <span className="text-muted-foreground">
                  Não é possível ter itens de diferentes estabelecimentos no
                  mesmo carrinho. Caso queira adicionar um produto de outro
                  estabelecimento, limpe o carrinho atual e tente novamente.
                </span>
              ),
            }
          );

          return;
        }

        toast.success("Produto adicionado ao carrinho com sucesso!");

        let cartItemsOnCookies = getUserCartItems();

        if (!cartItemsOnCookies)
          Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify([]));

        cartItemsOnCookies = getUserCartItems();

        const cartItems: CartItemOnCookies[] = cartItemsOnCookies || [];

        const productInCartIndex = cartItems.findIndex(
          (cartItem) => cartItem.productId === productId
        );

        const productAlreadyExists = productInCartIndex !== -1;

        if (!productAlreadyExists) {
          setItems((previousValues) => {
            const newProducts = [...previousValues];
            newProducts.push({
              product,
              quantity: quantity,
            });

            return newProducts;
          });

          cartItems.push({ productId, quantity: 1 });
          Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(cartItems));

          return;
        }

        setItems((previousValues) => {
          return previousValues.map((item) => {
            if (item.product.id !== product.id) return item;

            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          });
        });

        cartItems[productInCartIndex].quantity += quantity;
        Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(cartItems));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast.error(
            <span className="font-semibold">Erro ao adicionar produto</span>,
            {
              description: (
                <span className="text-muted-foreground">
                  Ocorreu um erro ao adicionar o produto no carrinho. Por favor,
                  tente novamente.
                </span>
              ),
            }
          );
        }
      }
    },
    [items]
  );

  const handleAddItemQuantity = (productId: string, quantity: number) => {
    setItems((previousValues) => {
      return previousValues.map((item) => {
        if (item.product.id !== productId) return item;

        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      });
    });

    const cartItemsOnCookies = getUserCartItems();

    if (!cartItemsOnCookies) return;

    const specificItemOnCartItemsIndex = cartItemsOnCookies.findIndex(
      (cartItem) => cartItem.productId === productId
    );

    if (specificItemOnCartItemsIndex === -1) return;

    cartItemsOnCookies[specificItemOnCartItemsIndex].quantity += quantity;

    Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(cartItemsOnCookies));
  };

  const handleClearAllItems = React.useCallback(() => {
    setItems([]);

    Cookies.remove(CART_ITEMS_COOKIE_NAME);
  }, []);

  const handleRemoveItem = React.useCallback((productId: string) => {
    setItems((previousValues) => {
      return previousValues.filter((item) => item.product.id !== productId);
    });

    const cartItemsOnCookies = getUserCartItems();

    if (!cartItemsOnCookies) return;

    const cartItemsWithoutTheRemovedItem = cartItemsOnCookies.filter(
      (cartItem) => cartItem.productId !== productId
    );

    Cookies.set(
      CART_ITEMS_COOKIE_NAME,
      JSON.stringify(cartItemsWithoutTheRemovedItem)
    );
  }, []);

  const loadCartItemsOnCookiesToState = React.useCallback(async () => {
    const cartItemsOnCookies = getUserCartItems();

    if (!cartItemsOnCookies) return;

    try {
      const productsPromises = cartItemsOnCookies.map((cartItem) => {
        return queryClient.fetchQuery({
          queryKey: ["product", cartItem.productId],
          queryFn: () => getProductById({ id: cartItem.productId }),
          staleTime: PRODUCT_STALE_TIME,
        });
      });

      const products = await Promise.all(productsPromises);

      setItems(
        products.map((product) => {
          return {
            product: product.data,
            quantity:
              cartItemsOnCookies.find(
                (cartItem) => cartItem.productId === product.data.id
              )?.quantity || 0,
          };
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast.error(
          <span className="font-semibold">
            Erro ao recuperar produtos do carrinho
          </span>,
          {
            description: (
              <span className="text-muted-foreground">
                Adicione-os novamente ao carrinho para prosseguir.
              </span>
            ),
          }
        );
      }
    }
  }, []);

  React.useEffect(() => {
    loadCartItemsOnCookiesToState();
  }, [loadCartItemsOnCookiesToState]);

  return (
    <cartContext.Provider
      value={{
        items,
        handleAddItem,
        handleAddItemQuantity,
        handleClearAllItems,
        handleRemoveItem,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
