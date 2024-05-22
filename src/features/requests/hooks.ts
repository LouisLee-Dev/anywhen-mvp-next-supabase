import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMatchedRequests,
  getBookingRequest,
  getAllRequest,
  acceptRentalRequestForProperty,
  cancelRentalRequestForProperty,
} from "./actions";
import { RentalRequest } from "./schema";
import { toast } from "sonner";

export const useAllRequests = () => {
  return useQuery({
    initialData: [],
    queryKey: ["owner", "alleRequests"],
    queryFn: async () => {
      const allRequests: any[] = await getAllRequest();
      return allRequests;
    },
  });
};

export const useMatchedRequestsOfProperty = (propertyId: string) => {
  return useQuery({
    initialData: [],
    queryKey: ["property", propertyId, "requests"],
    queryFn: async () => {
      const matchedRequests = await getMatchedRequests(propertyId);
      return matchedRequests;
    },
  });
};

export const useBookingRequests = () => {
  return useQuery({
    initialData: [],
    queryKey: ["owner", "acceptedRequests"],
    queryFn: async () => {
      const acceptedRequests: any[] = await getBookingRequest();
      return acceptedRequests;
    },
  });
};

export const useAcceptRentalRequestForProperty = (propertyId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId }: { requestId: string }) => {
      return acceptRentalRequestForProperty(propertyId, requestId).catch(
        (e) => {
          console.log(e);
          return { success: false, request: null, message: "Unknown error" };
        },
      );
    },
    onSuccess: async ({ success, request, message }, variables, context) => {
      if (success) {
        queryClient.setQueryData(
          ["property", propertyId, "requests"],
          (requests: RentalRequest[]) => {
            return requests.map((t) => (t.id === request.id ? request : t));
          },
        );
        toast.success(message);
      } else {
        toast.error(message || "Request failed");
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast.error("Request failed");
    },
  });
};

export const useCancelRentalRequestForProperty = (propertyId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId }: { requestId: string }) => {
      return cancelRentalRequestForProperty(propertyId, requestId).catch(
        (e) => {
          console.log(e);
          return { success: false, request: null, message: "Unknown error" };
        },
      );
    },
    onSuccess: async ({ success, request, message }, variables, context) => {
      if (success) {
        queryClient.setQueryData(
          ["property", propertyId, "requests"],
          (requests: RentalRequest[]) => {
            return requests.map((t) => (t.id === request.id ? request : t));
          },
        );
        toast.success(
          `You accpeted a request. Renter will get notification soon.`,
        );
      } else {
        toast.error(message || "Request failed");
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast.error("Request failed");
    },
  });
};
