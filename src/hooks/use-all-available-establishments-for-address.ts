import { getAllAvailableEstablishmentsForAddress } from "@/api/establishment/get-all-available-establishments-for-address";
import { useQuery } from "@tanstack/react-query";

interface UseAllAvailableEstablishmentsForAddressProps {
  addressId: string;
}

const FIVE_MINUTES = 1000 * 60 * 5;

export const useAllAvailableEstablishmentsForAddress = ({
  addressId,
}: UseAllAvailableEstablishmentsForAddressProps) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["available-establishments-for-address", addressId],
    queryFn: () => getAllAvailableEstablishmentsForAddress({ addressId }),
    enabled: !!addressId,
    refetchOnMount: false,
    staleTime: FIVE_MINUTES,
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isError,
    isLoading,
  };
};
