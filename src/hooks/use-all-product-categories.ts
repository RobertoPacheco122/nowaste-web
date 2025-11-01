import { useQuery } from "@tanstack/react-query";

import { getAllProductCategories } from "@/api/product/get-all-product-categories";

export const useAllProductCategories = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: getAllProductCategories,
    refetchOnMount: false,
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
