import { getOrderByPaymentSessionId } from "@/api/order/get-order-by-payment-session-id";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrderByPaymentSessionIdProps {
  id: string;
}

export const useGetOrderByPaymentSessionId = ({
  id,
}: UseGetOrderByPaymentSessionIdProps) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["order-by-payment-session-id", id],
    queryFn: () => getOrderByPaymentSessionId({ id }),
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
