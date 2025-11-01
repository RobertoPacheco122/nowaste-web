import { api } from "@/lib/axios";

export enum PaymentMethod {
  creditCard = 1,
  debitCard = 2,
  pix = 3,
  cashOnDelivery = 4,
}

export enum OrderStatus {
  pending = 1,
  confirmed = 2,
  preparing = 3,
  outForDelivery = 4,
  delivered = 5,
  waitingWithdrawal = 6,
  canceled = 7,
}

export interface RegisterOrderRequest {
  addressId: string;
  establishmentId: string;
  items: { productId: string; itemQuantity: number }[];
  orderDate: string;
  paymentMethod: PaymentMethod;
  observations?: string;
}

export interface RegisterOrderResponse {
  orderId: string;
  orderStatus: OrderStatus;
}

export const registerOrder = async ({
  addressId,
  establishmentId,
  items,
  orderDate,
  paymentMethod,
  observations,
}: RegisterOrderRequest) => {
  const { data, status } = await api.post<RegisterOrderResponse>("/Order", {
    addressId,
    establishmentId,
    items,
    orderDate,
    paymentMethod,
    observations,
  });

  return { data, status };
};
