import axios from "axios";

import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";
import { removeUserAuthToken } from "@/utils/user/remove-user-auth-token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const userAuthToken = getLoggedUserInformations();

    if (userAuthToken?.token) {
      config.headers.Authorization = `Bearer ${userAuthToken.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const loggedUser = getLoggedUserInformations();

    if (error.response?.status === 401 && loggedUser) {
      removeUserAuthToken();

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/auth/sign-in"
      ) {
        window.location.href = "/auth/sign-in";
      }
    }

    return Promise.reject(error);
  }
);
