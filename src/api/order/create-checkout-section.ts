import { api } from "@/lib/axios";

export interface CreateCheckoutSectionParams {
  orderId: string;
}

interface CreateCheckoutSectionResponse {
  sessionId: string;
  sessionUrl: string;
}

export const createCheckoutSection = async ({
  orderId,
}: CreateCheckoutSectionParams) => {
  const { data, status } = await api.post<CreateCheckoutSectionResponse>(
    "/Order/checkout",
    {
      orderId,
    }
  );

  return {
    data,
    status,
  };
};
