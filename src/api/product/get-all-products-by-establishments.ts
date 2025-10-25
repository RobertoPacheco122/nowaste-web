import { api } from "@/lib/axios";
import { ProductInventoryTrackingType } from "../establishment/get-all-available-establishments-for-address";

interface GetAllProductsByEstablishmentRequest {
  establishmentId: string;
}

interface GetAllProductsByEstablishmentResponse {
  id: string;
  name: string;
  description: string;
  quantityInStock?: number;
  isActive: boolean;
  inventoryTrackingType: ProductInventoryTrackingType;
  category: {
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
}

export const getAllProductsByEstablishment = async ({
  establishmentId,
}: GetAllProductsByEstablishmentRequest) => {
  const { data, status } = await api.get<
    GetAllProductsByEstablishmentResponse[]
  >(`/Product/get-all-by-establishment/${establishmentId}`);

  return {
    data,
    status,
  };
};
