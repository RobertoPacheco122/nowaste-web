import { ApiErrorResponse } from "@/api/auth/authenticate";
import {
  registerOrder,
  RegisterOrderRequest,
} from "@/api/order/register-order";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseRegisterOrderProps {
  onError?: () => void;
  onSuccess?: () => void;
}

export const useRegisterOrder = ({
  onError,
  onSuccess,
}: UseRegisterOrderProps = {}) => {
  const { data, error, isPending, isError, isSuccess, mutateAsync } =
    useMutation<
      Awaited<ReturnType<typeof registerOrder>>,
      AxiosError<ApiErrorResponse>,
      RegisterOrderRequest
    >({
      mutationFn: registerOrder,
      onSuccess() {
        onSuccess?.();
      },
      onError() {
        onError?.();
      },
    });

  return {
    data,
    isError,
    isPending,
    isSuccess,
    error,
    registerOrderMutation: mutateAsync,
  };
};
