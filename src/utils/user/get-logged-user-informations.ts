import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AUTH_COOKIE_NAME } from "@/app/auth/sign-in/_hooks/use-sign-in-form";
import { UserRole } from "@/api/user/register-user";

interface JwtLoggedUserPayloadCustom {
  exp: number;
  iat: number;
  nbf: number;
  role: UserRole;
  unique_name: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid": string;
  personId: string;
}

export interface LoggedUser {
  id: string;
  personId: string;
  name: string;
  role: UserRole;
  token: string;
}

export const getLoggedUserInformations = () => {
  const authToken = Cookies.get(AUTH_COOKIE_NAME);

  if (!authToken) return null;

  const decodedToken = jwtDecode<JwtLoggedUserPayloadCustom>(authToken);

  return {
    id: decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
    ],
    personId: decodedToken.personId,
    name: decodedToken.unique_name,
    role: decodedToken.role,
    token: authToken,
  } as LoggedUser;
};
