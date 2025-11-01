import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  deleteAddress,
  DeleteAddressParams,
} from "@/api/address/delete-address";
import { GetALLAddressesByPersonResponse } from "@/api/address/get-all-addresses-by-person";
import { ApiErrorResponse } from "@/api/auth/authenticate";
import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";

interface UseDeleteAddressProps {
  onError?: () => void;
  onSuccess?: () => void;
}

export const useDeleteAddress = ({
  onError,
  onSuccess,
}: UseDeleteAddressProps = {}) => {
  const queryClient = useQueryClient();
  const loggedUser = getLoggedUserInformations();

  const { isError, error, isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof deleteAddress>>,
    AxiosError<ApiErrorResponse>,
    DeleteAddressParams
  >({
    mutationFn: deleteAddress,
    onSuccess: ({ status }, variables) => {
      if (status !== 204)
        throw new Error(
          `An error occurred while attempting to delete the address. Status code: ${status}`
        );

      if (!loggedUser) return;

      onSuccess?.();

      const addressesCache = queryClient.getQueryData<{
        data: GetALLAddressesByPersonResponse[];
        status: number;
      }>(["user-addresses", loggedUser.personId]);

      const newAddresses = addressesCache!.data.map((address) => {
        if (address.id !== variables.id) return address;

        return {
          ...address,
          isDeleted: true,
        };
      });

      queryClient.setQueryData(["user-addresses", loggedUser.personId], {
        data: newAddresses,
        status: 200,
      });
    },
    onError: (error) => {
      onError?.();

      if (error.status === 401) {
        toast.error(
          <span className="font-semibold">Erro ao deletar endereço</span>,
          {
            description: (
              <span className="text-muted-foreground">
                Parece que você não está logado. Autentique-se e tente
                novamente.
              </span>
            ),
          }
        );

        return;
      }

      if (error.status === 404) {
        toast.error(
          <span className="font-semibold">Erro ao deletar endereço</span>,
          {
            description: (
              <span className="text-muted-foreground">
                Não encontramos esse endereço em nossa base de dados. Tente
                novamente.
              </span>
            ),
          }
        );

        return;
      }

      if (error.status === 500) {
        toast.error(
          <span className="font-semibold">Erro ao deletar endereço</span>,
          {
            description: (
              <span className="text-muted-foreground">
                Ocorreu um erro interno ao deletar o endereço. Não se preocupe,
                não é culpa sua :).
              </span>
            ),
          }
        );
      }

      toast.error(<span className="font-semibold">Erro de conexão</span>, {
        description: (
          <span className="text-muted-foreground">
            Não foi possível conectar ao servidor. Verifique sua conexão com a
            internet e tente novamente.
          </span>
        ),
      });
    },
  });

  return {
    isError,
    error,
    isPending,
    deleteAddressMutation: mutateAsync,
  };
};
