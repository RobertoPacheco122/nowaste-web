import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/api/auth/authenticate";
import {
  IRegisterReviewParams,
  registerReview,
} from "@/api/review/register-review";
import { toast } from "sonner";

interface IRegisterReviewProps {
  onError?: () => void;
  onSuccess?: () => void;
}

export const useRegisterReview = ({
  onError,
  onSuccess,
}: IRegisterReviewProps = {}) => {
  const { data, error, isPending, isError, isSuccess, mutateAsync } =
    useMutation<
      Awaited<ReturnType<typeof registerReview>>,
      AxiosError<ApiErrorResponse>,
      IRegisterReviewParams
    >({
      mutationFn: registerReview,
      onSuccess() {
        onSuccess?.();
      },
      onError(error) {
        onError?.();

        if (error.status === 400) {
          toast.error(
            <span className="font-semibold">Erro ao cadastrar avaliação</span>,
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
            <span className="font-semibold">Erro ao cadastrar avaliação</span>,
            {
              description: (
                <span className="text-muted-foreground">
                  Ocorreu um erro interno ao cadastar o usuário. Não se
                  preocupe, não é culpa sua :).
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
    data,
    isError,
    isPending,
    isSuccess,
    error,
    registerReviewMutation: mutateAsync,
  };
};
