import { useQuery } from "@tanstack/react-query";

import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";
import { getAllOrdersByPerson } from "@/api/order/get-all-orders-by-person";

export const useGetAllOrdersByPerson = () => {
  const loggedUser = getLoggedUserInformations();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["orders-by-person", loggedUser?.personId],
    queryFn: () => getAllOrdersByPerson(),
    enabled: !!loggedUser,
    staleTime: 1000 * 60 * 10, //10 minutes
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isError,
    isLoading,
  };
};
