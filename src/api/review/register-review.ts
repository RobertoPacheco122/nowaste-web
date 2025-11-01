import { api } from "@/lib/axios";

export type TReviewRating = 1 | 2 | 3 | 4 | 5;

export interface IRegisterReviewParams {
  rating: TReviewRating;
  personComment: string;
  orderId: string;
}

export interface IRegisterReviewResponse {
  id: string;
  rating: TReviewRating;
}

export const registerReview = async ({
  rating,
  personComment,
  orderId,
}: IRegisterReviewParams) => {
  const { data, status } = await api.post<IRegisterReviewResponse>("/Review", {
    rating,
    personComment,
    orderId,
  });

  return {
    data,
    status,
  };
};
