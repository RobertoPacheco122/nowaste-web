import { useQuery } from "@tanstack/react-query";

import { getEstablishmentById } from "@/api/establishment/get-establishment-by-id";

interface IUseGetEstablishmentByIdProps {
  id: string;
}

export const useGetEstablishmentById = ({
  id,
}: IUseGetEstablishmentByIdProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["establishment", id],
    queryFn: () => getEstablishmentById({ id }),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isLoading,
  };
};
