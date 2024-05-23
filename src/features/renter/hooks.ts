import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyRequests, getMatchedRequests } from "./actions";
import { declineOffer, getOffersOfRequest } from "../offers/actions";
import { Offer } from "../offers/schema";
import { toast } from "sonner";

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
    queryKey: ["renter", "requests", requestId, "offers"],
    queryFn: () => getOffersOfRequest(requestId),
  });
};

export const useDeclineOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offer: Offer) =>
      declineOffer(offer).catch((e) => {
        console.log(e);
        return { success: false, offer: null, message: "Unknown error" };
      }),
    onSuccess: async ({ success, offer }, variables, context) => {
      if (success) {
        queryClient.setQueryData(
          ["renter", "requests", offer.request_id, "offers"],
          (offers: Offer[]) => {
            return offers.map((o) => {
              if (o.id === offer.id) {
                return offer;
              }
              return o;
            });
          },
        );
      } else {
        toast.error("Request failed");
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast.error("Request failed");
    },
  });
};
