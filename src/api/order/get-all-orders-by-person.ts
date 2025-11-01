import { api } from "@/lib/axios";
import { AddressType } from "../address/register-address";
import { ProductInventoryTrackingType } from "../establishment/get-all-available-establishments-for-address";
import { OrderStatus, PaymentMethod } from "./register-order";
import { TReviewRating } from "../review/register-review";

export interface GetAllOrdersByPersonResponse {
  id: string;
  friendlyId: string;
  orderDate: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  isPaid: true;
  deliveryAddress: string;
  observations: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentSessionId: string;
  establishment: {
    id: string;
    createdAt: string;
    cnpj: string;
    legalName: string;
    tradeName: string;
    exhibitionName: string;
    email: string;
    telephone: string;
    phoneNumber: string;
    serviceRadiusInMeters: number;
    totalReviews: number;
    averageRating: number;
    operationalAddress: {
      id: string;
      streetName: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      latitude: number;
      longitude: number;
      isDeleted: true;
      addressType: AddressType;
      personId: string;
      establishmentId: string;
      institutionId: string;
    };
    status: OrderStatus;
    description: string;
    deliveryFeeInCents: number;
  };
  person: {
    fullName: string;
    cpf: string;
    birthDate: string;
    phoneNumber: string;
    nickname: string;
  };
  orderItems: [
    {
      productName: string;
      unitPrice: number;
      itemQuantity: number;
      subtotal: number;
      discount: number;
      total: number;
      orderId: string;
      product: {
        id: string;
        name: string;
        description: string;
        quantityInStock: number | null;
        isActive: true;
        inventoryTrackingType: ProductInventoryTrackingType;
        weightInGrams: number;
        actualPriceHistory: {
          id: string;
          price: number;
          salePrice: number;
          showDiscountAsPercentage: true;
          effectiveDate: string;
          productId: string;
        };
      };
    }
  ];
  review?: {
    id: string;
    rating: TReviewRating;
    personComment: string | null;
    establishmentResponse: string | null;
    reviewDate: string;
    responseDate: null;
    personId: string;
    orderId: string;
    establishmentId: string;
  };
}

export const getAllOrdersByPerson = async () => {
  const { data, status } = await api.get<GetAllOrdersByPersonResponse[]>(
    `/Order/get-all-by-person`
  );

  return {
    data,
    status,
  };
};
