import { api } from "@/lib/axios";

interface GetAllProductCategoriesResponse {
  id: string;
  name: string;
  description: string;
}

export const getAllProductCategories = async () => {
  const { data, status } = await api.get<GetAllProductCategoriesResponse[]>(
    "/Product/category"
  );

  return {
    data,
    status,
  };
};
