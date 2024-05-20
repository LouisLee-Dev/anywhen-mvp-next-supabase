import { useQuery } from "@tanstack/react-query";
import { getMyRequests, getMatchedRequests } from "./actions";
import { getOffersOfRequest } from "../offers/actions";

export const useRentalRequests = () => {
  return useQuery({
    initialData: [],
    queryKey: ["renter", "requests"],
    queryFn: () => getMatchedRequests(),
  });
};

export const useMyRequests = () => {
  return useQuery({
    initialData: [],
    queryKey: ["renter", "my-requests"],
    queryFn: () => getMyRequests(),
  });
};

export const useOffersOfRequest = (requestId: string) => {
  return useQuery({
    initialData: [],
    queryKey: ["renter", "offers", requestId],
    queryFn: () => getOffersOfRequest(requestId),
  });
};
