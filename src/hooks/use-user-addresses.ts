import { useQuery } from "@tanstack/react-query";

import { getAllAddressesByPerson } from "@/api/address/get-all-addresses-by-person";
import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";

export const useUserAddresses = () => {
  const loggedUser = getLoggedUserInformations();

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
