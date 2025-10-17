import { api } from "@/lib/axios";
import { UUID } from "node:crypto";

export const userRoles = [
  "customer",
  "establishmentAdmin",
  "establishmentStockOperator",
  "establishmentFinancial",
  "establishmentEmployee",
  "institutionAdmin",
  "institutionLogisticOperator",
  "institutionEmployee",
  "nowasteAdmin",
  "nowasteSupport",
  "nowasteEmployee",
] as const;

export type UserRole = (typeof userRoles)[number];

interface RegisterUserParams {
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  fullname: string;
  cpf: string;
  birthDate: string;
  nickname?: string;
  establishmentId?: UUID;
  institutionId?: UUID;
}

export interface RegisterUserResponse {
  name: string;
  token: string;
}

export const registerUser = async ({
  birthDate,
  cpf,
  email,
  fullname,
  password,
  phoneNumber,
  role,
  establishmentId,
  institutionId,
  nickname,
}: RegisterUserParams) => {
  const { data, status } = await api.post<RegisterUserResponse>("/User", {
    birthDate,
    cpf,
    email,
    fullname,
    password,
    phoneNumber,
    role,
    establishmentId,
    institutionId,
    nickname,
  });

  return {
    data,
    status,
  };
};
