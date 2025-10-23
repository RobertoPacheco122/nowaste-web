import { api } from "@/lib/axios";

export interface DeleteAddressParams {
  id: string;
}

export const deleteAddress = async ({ id }: DeleteAddressParams) => {
  const { status } = await api.delete(`/Address/${id}`);

  return {
    status,
  };
};
