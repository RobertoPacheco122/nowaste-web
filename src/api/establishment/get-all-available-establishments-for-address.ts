import { api } from "@/lib/axios";

export enum EstablishmentStatus {
  active = 1,
  inactive = 2,
  awaitingApproval = 3,
  banned = 4,
}

export enum ProductInventoryTrackingType {
  byUnit = 1,
  notApplicable = 2,
}

interface GetAllAvailableEstablishmentsForAddressParams {
  addressId: string;
}

interface GetAllAvailableEstablishmentsForAddressResponse {
  establishment: {
    cnpj: string;
    legalName: string;
    tradeName: string;
    exhibitionName: string;
    email: string;
    telephone: string;
    phoneNumber: string;
    serviceRadiusInMeters: number;
    status: EstablishmentStatus;
    averageRating: number;
    distanceInMetersFromAddressToEstablishment: number;
  };
  products: {
    id: string;
    name: string;
    description: string;
    quantityInStock: number | undefined;
    isActive: boolean;
    inventoryTrackingType: ProductInventoryTrackingType;
    productCategory: {
      id: string;
      name: string;
      description: string;
    };
    actualPriceHistory: {
      id: string;
      price: number;
      salePrice: number;
      showDiscountAsPercentage: boolean;
      effectiveDate: string;
      productId: string;
    };
  }[];
}

export const getAllAvailableEstablishmentsForAddress = async ({
  addressId,
}: GetAllAvailableEstablishmentsForAddressParams) => {
  const { data, status } = await api.get<
    GetAllAvailableEstablishmentsForAddressResponse[]
  >(`/Establishment/get-all-available-for-address/${addressId}`);

  return {
    data,
    status,
  };
};
