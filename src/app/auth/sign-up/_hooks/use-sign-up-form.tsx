import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ApiErrorResponse } from "@/api/auth/authenticate";
import { registerUser } from "@/api/user/register-user";
import { RegisterUserFormData } from "../page";

interface UseSignInFormProps {
  onError?: () => void;
  onSuccess?: () => void;
}

export const useSignUpForm = ({
  onError,
  onSuccess,
}: UseSignInFormProps = {}) => {
  const {
    isError,
    isPending,
    isSuccess,
    mutateAsync: registerUserMutation,
  } = useMutation<
    Awaited<ReturnType<typeof registerUser>>,
    AxiosError<ApiErrorResponse>,
    RegisterUserFormData
  >({
    mutationFn: registerUser,
    onSuccess() {
      onSuccess?.();
    },
    onError(error) {
      onError?.();

      if (error.status === 400) {
        toast.error(
          <span className="font-semibold">Erro ao cadastrar usuário</span>,
          {
            description: (
              <span className="text-muted-foreground">
                {error.response?.data.errorMessages[0]}
              </span>
            ),
          }
        );

        return;
      }

      if (error.status === 500) {
        toast.error(
          <span className="font-semibold">Erro ao cadastrar usuário</span>,
          {
            description: (
              <span className="text-muted-foreground">
                Ocorreu um erro interno ao cadastar o usuário. Tente novamente
                mais tarde. Caso o problema persista, entre em contato com nossa
                equipe.
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
    registerUserMutation,
  };
};
