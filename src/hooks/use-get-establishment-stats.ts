import { getEstablishmentStats } from "@/api/establishment/get-establishment-stats";
import { useQuery } from "@tanstack/react-query";

interface IUseGetEstablishmentStatsProps {
  id: string;
}

export const useGetEstablishmentStats = ({
  id,
}: IUseGetEstablishmentStatsProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["establishment-stats", id],
    queryFn: () => getEstablishmentStats({ id }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isLoading,
  };
};
