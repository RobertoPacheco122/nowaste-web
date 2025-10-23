import Cookies from "js-cookie";

export const CART_ITEMS_COOKIE_NAME = "nowaste_cart_items";

export interface CartItemOnCookies {
  productId: string;
  quantity: number;
}

export const removeUserCartItemsCookies = () => {
  Cookies.remove(CART_ITEMS_COOKIE_NAME);
};
