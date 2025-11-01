import { useQuery } from "@tanstack/react-query";

import { convertZipCodeToAddress } from "@/api/_external-services/convert-zip-code-to-address";

interface UseConvertZipCodeToAddress {
  zipCode: string;
}

export const useConvertZipCodeToAddress = ({
  zipCode,
}: UseConvertZipCodeToAddress) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["convert-zip-code-to-address", zipCode],
    queryFn: () => convertZipCodeToAddress({ zipCode }),
    enabled: !!zipCode,
    staleTime: Infinity,
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isError,
    isLoading,
  };
};
