import { api } from "@/lib/axios";

export interface IGetAllEstablishmentsReviewsParams {
  id: string;
}

export interface IGetAllEstablishmentsReviewsResponse {
  id: string;
  rating: number;
  personComment: string;
  establishmentResponse: string;
  reviewDate: string;
  responseDate: string;
  person: {
    fullName: string;
    cpf: string;
    birthDate: string;
    phoneNumber: string;
    nickname: string;
  };
  orderId: string;
  establishmentId: string;
}

export const getAllEstablishmentsReviews = async ({
  id,
}: IGetAllEstablishmentsReviewsParams) => {
  const { data, status } = await api.get<
    IGetAllEstablishmentsReviewsResponse[]
  >(`Establishment/get-all-reviews/${id}`);

  return {
    data,
    status,
  };
};
