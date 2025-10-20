import { useQuery } from "@tanstack/react-query";

import { useLoggedUser } from "./use-logged-user";
import { getAllAddressesByPerson } from "@/api/address/get-all-addresses-by-person";

export const useUserAddresses = () => {
  const { loggedUser } = useLoggedUser();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["user-addresses", loggedUser?.personId],
    queryFn: () =>
      getAllAddressesByPerson({ personId: loggedUser?.personId || "" }),
    refetchOnMount: false,
    enabled: !!loggedUser,
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
