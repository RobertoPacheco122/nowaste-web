"use client";

import { ApiErrorResponse } from "@/api/auth/authenticate";
import {
  createCheckoutSection,
  CreateCheckoutSectionParams,
} from "@/api/order/create-checkout-section";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseCreateCheckoutSectionProps {
  onError?: () => void;
  onSuccess?: () => void;
}

export const useCreateCheckoutSection = ({
  onError,
  onSuccess,
}: UseCreateCheckoutSectionProps = {}) => {
  const { data, error, isPending, isError, isSuccess, mutateAsync } =
    useMutation<
      Awaited<ReturnType<typeof createCheckoutSection>>,
      AxiosError<ApiErrorResponse>,
      CreateCheckoutSectionParams
    >({
      mutationFn: createCheckoutSection,
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
    createCheckoutSectionMutation: mutateAsync,
  };
};
