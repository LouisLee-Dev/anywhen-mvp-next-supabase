import { useQuery } from "@tanstack/react-query";
import { getMyRequests, getMatchedRequests } from "./actions";

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
