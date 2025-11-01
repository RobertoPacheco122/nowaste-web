import { api } from "@/lib/axios";
import { AddressType } from "../address/register-address";
import { EstablishmentStatus } from "./get-all-available-establishments-for-address";

export interface IGetEstablishmentByIdParams {
  id: string;
}

export interface IGetEstablishmentByIdResponse {
  id: string;
  createdAt: string;
  cnpj: string;
  legalName: string;
  tradeName: string;
  exhibitionName: string;
  email: string;
  telephone: string;
  phoneNumber: string;
  serviceRadiusInMeters: number;
  totalReviews: number;
  averageRating: number;
  operationalAddress: {
    id: string;
    streetName: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    isDeleted: boolean;
    addressType: AddressType;
    personId: string;
    establishmentId: string;
    institutionId: string;
  };
  operatingDays: {
    id: string;
    closingTime: string;
    openingTime: string;
    dayOfWeek: number;
    establishmentId: string;
  }[];
  status: EstablishmentStatus;
  description: string;
  deliveryFeeInCents: number;
}

export const getEstablishmentById = async ({
  id,
}: IGetEstablishmentByIdParams) => {
  const { data, status } = await api.get<IGetEstablishmentByIdResponse>(
    `/Establishment/${id}`
  );

  return {
    data,
    status,
  };
};
