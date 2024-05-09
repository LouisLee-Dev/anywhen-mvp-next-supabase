import { useQuery } from "@tanstack/react-query";
import { getRequests } from "./actions";

export const useRentalRequests = () => {
  return useQuery({
    initialData: [],
    queryKey: ["renter", "requests"],
    queryFn: () => getRequests(),
  });
};
