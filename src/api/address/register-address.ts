import { api } from "@/lib/axios";

export enum AddressType {
  home = 1,
  work = 2,
  operational = 3,
  common = 4,
}

export interface RegisterAddressParams {
  streetName: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  addressType: AddressType;
  personId?: string;
  establishmentId?: string;
  institutionId?: string;
}

interface RegisterAddressResponse {
  id: string;
  streetName: string;
}

export const registerAddress = async ({
  addressType,
  city,
  complement,
  latitude,
  longitude,
  neighborhood,
  number,
  personId,
  state,
  streetName,
  zipCode,
  establishmentId,
  institutionId,
}: RegisterAddressParams) => {
  const { data, status } = await api.post<RegisterAddressResponse>("/Address", {
    addressType,
    city,
    complement,
    latitude,
    longitude,
    neighborhood,
    number,
    personId,
    state,
    streetName,
    zipCode,
    establishmentId,
    institutionId,
  });

  return {
    data,
    status,
  };
};
