import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "@/api/order/get-order-by-id";

interface UseGetOrderByIdProps {
  id: string;
}

export const useGetOrderById = ({ id }: UseGetOrderByIdProps) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["order-by-id", id],
    queryFn: () => getOrderById({ id }),
    enabled: !!id,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 30, // 5 minutes
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isError,
    isLoading,
  };
};
