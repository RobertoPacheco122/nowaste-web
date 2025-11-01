import { api } from "@/lib/axios";
import { UUID } from "node:crypto";

interface GetALLAddressesByPersonParams {
  personId: string;
}

export type AddressType = 1 | 2 | 3 | 4;

export interface GetALLAddressesByPersonResponse {
  id: string;
  isDeleted: boolean;
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
  personId: UUID;
  establishmentId?: UUID;
  institutionId?: UUID;
}

export const getAllAddressesByPerson = async ({
  personId,
}: GetALLAddressesByPersonParams) => {
  const { data, status } = await api.get<GetALLAddressesByPersonResponse[]>(
    `/Address/get-all-by-person/${personId}`
  );

  return {
    data,
    status,
  };
};
