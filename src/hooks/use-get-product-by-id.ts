import { useQuery } from "@tanstack/react-query";

import { getProductById } from "@/api/product/get-product-by-id";

interface UseGetProductByIdProps {
  id: string;
}

export const useGetProductById = ({ id }: UseGetProductByIdProps) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ id }),
    refetchOnMount: false,
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isError,
    isLoading,
  };
};
