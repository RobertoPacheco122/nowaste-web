import { useQuery } from "@tanstack/react-query";

import { getAllEstablishmentsReviews } from "@/api/establishment/get-all-establishments-reviews";

interface IUseGetAllEstablishmentsReviewsProps {
  id: string;
}

export const useGetAllEstablishmentsReviews = ({
  id,
}: IUseGetAllEstablishmentsReviewsProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["establishment-reviews", id],
    queryFn: () => getAllEstablishmentsReviews({ id }),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    status: data?.status,
    error,
    isLoading,
  };
};
