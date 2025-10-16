import { api } from "@/lib/axios";

export interface ApiErrorResponse {
  errorMessages: string[];
}

interface AuthenticateParams {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  name: string;
  token: string;
}

export const authenticate = async ({ email, password }: AuthenticateParams) => {
  const { data, status } = await api.post<AuthenticateResponse>("/Auth/Login", {
    email,
    password,
  });

  return {
    data,
    status,
  };
};
