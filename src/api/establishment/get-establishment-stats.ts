import { api } from "@/lib/axios";

export interface IGetEstablishmentStatsParams {
  id: string;
}

export interface IGetEstablishmentStatsResponse {
  sales: number;
  reducedWasteInGrams: number;
}

export const getEstablishmentStats = async ({
  id,
}: IGetEstablishmentStatsParams) => {
  const { data, status } = await api.get<IGetEstablishmentStatsResponse>(
    `/Establishment/stats/${id}`
  );

  return {
    data,
    status,
  };
};
