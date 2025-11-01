import { api } from "@/lib/axios";
import {
  EstablishmentStatus,
  ProductInventoryTrackingType,
} from "../establishment/get-all-available-establishments-for-address";
import { AddressType } from "../address/register-address";

interface GetProductByIdRequest {
  id: string;
}

export interface GetProductByIdResponse {
  id: string;
  name: string;
  description: string;
  quantityInStock?: number;
  isActive: boolean;
  inventoryTrackingType: ProductInventoryTrackingType;
  establishment: {
    createdAt: string;
    description: string;
    operationalAddress: {
      id: string;
      isDeleted: boolean;
      streetName: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      latitude: number;
      longitude: number;
      addressType: AddressType;
      personId?: string;
      establishmentId: string;
      institutionId?: string;
    };
    id: string;
    cnpj: string;
    legalName: string;
    tradeName: string;
    exhibitionName: string;
    email: string;
    telephone: string;
    phoneNumber: string;
    serviceRadiusInMeters: number;
    averageRating: number;
    totalReviews: number;
    status: EstablishmentStatus;
    deliveryFeeInCents: number;
  };
  actualPriceHistory: {
    id: string;
    price: number;
    salePrice: number;
    showDiscountAsPercentage: boolean;
    effectiveDate: string;
    productId: string;
  };
}

export const getProductById = async ({ id }: GetProductByIdRequest) => {
  const { data, status } = await api.get<GetProductByIdResponse>(
    `/Product/${id}`
  );

  return {
    data,
    status,
  };
};
