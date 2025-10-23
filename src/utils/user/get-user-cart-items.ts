import Cookies from "js-cookie";
import {
  CART_ITEMS_COOKIE_NAME,
  CartItemOnCookies,
} from "./remove-user-cart-items-cookies";

export const getUserCartItems = () => {
  const cartItems = Cookies.get(CART_ITEMS_COOKIE_NAME);

  return cartItems ? (JSON.parse(cartItems) as CartItemOnCookies[]) : null;
};
