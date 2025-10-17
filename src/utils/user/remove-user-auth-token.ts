import Cookies from "js-cookie";

import { AUTH_COOKIE_NAME } from "@/app/auth/sign-in/_hooks/use-sign-in-form";

export const removeUserAuthToken = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
};
