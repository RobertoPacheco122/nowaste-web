import { useQuery } from "@tanstack/react-query";

import { getAllProductsByEstablishment } from "@/api/product/get-all-products-by-establishments";

interface UseGetAllProductsByEstablishmentProps {
  establishmentId: string;
}

export const useGetAllProductsByEstablishment = ({
  establishmentId,
}: UseGetAllProductsByEstablishmentProps) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["products-by-establishment", establishmentId],
    queryFn: () => getAllProductsByEstablishment({ establishmentId }),
    refetchOnMount: false,
    enabled: !!establishmentId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isError,
    isLoading,
  };
};
