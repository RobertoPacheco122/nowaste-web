import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UUID } from "node:crypto";
import { toast } from "sonner";

import { GetALLAddressesByPersonResponse } from "@/api/address/get-all-addresses-by-person";
import {
  registerAddress,
  RegisterAddressParams,
} from "@/api/address/register-address";
import { ApiErrorResponse } from "@/api/auth/authenticate";
import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";

interface UseRegisterAddressFormProps {
  onError?: () => void;
  onSuccess?: () => void;
}

export const useRegisterAddressForm = ({
  onError,
  onSuccess,
}: UseRegisterAddressFormProps = {}) => {
  const queryClient = useQueryClient();
  const loggedUser = getLoggedUserInformations();

  const { isError, isPending, isSuccess, error, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof registerAddress>>,
    AxiosError<ApiErrorResponse>,
    RegisterAddressParams
  >({
    mutationFn: registerAddress,
    onSuccess(data, variables) {
      onSuccess?.();

      if (!loggedUser) return;

      const createdAddress: GetALLAddressesByPersonResponse = {
        addressType: variables.addressType,
        city: variables.city,
        complement: variables.complement,
        id: data.data.id,
        latitude: variables.latitude,
        longitude: variables.longitude,
        neighborhood: variables.neighborhood,
        number: variables.number,
        personId: loggedUser.personId as UUID,
        state: variables.state,
        streetName: variables.streetName,
        zipCode: variables.zipCode,
      };

      const addressesCache = queryClient.getQueryData<{
        data: GetALLAddressesByPersonResponse[];
        status: number;
      }>(["addresses", loggedUser.personId]);

      queryClient.setQueryData<{
        data: GetALLAddressesByPersonResponse[];
        status: number;
      }>(["addresses", loggedUser.personId], {
        data: addressesCache?.data
          ? [...addressesCache.data, createdAddress]
          : [createdAddress],
        status: 200,
      });
    },
    onError(error) {
      onError?.();

      if (error.status === 400) {
        toast.error(<span className="font-semibold">Erro de validação</span>, {
          description: (
            <span className="text-muted-foreground">
              {error.response?.data.errorMessages[0]}
            </span>
          ),
        });

        return;
      }

      if (error.status === 500) {
        toast.error(
          <span className="font-semibold">Erro ao cadastrar endereço</span>,
          {
            description: (
              <span className="text-muted-foreground">
                Ocorreu um erro interno ao cadastar o endereço. Não se preocupe,
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
    isPending,
    isSuccess,
    error,
    registerAddressMutation: mutateAsync,
  };
};
