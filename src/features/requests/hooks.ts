import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMatchedRequests,
  getAcceptedRequest,
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

export const useAcceptedRequests = () => {
  return useQuery({
    initialData: [],
    queryKey: ["owner", "acceptedRequests"],
    queryFn: async () => {
      const acceptedRequests: any[] = await getAcceptedRequest();
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
          return { success: false, request: null };
        },
      );
    },
    onSuccess: async ({ success, request }, variables, context) => {
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
        toast.error(request || "Request failed");
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
          return { success: false, request: null };
        },
      );
    },
    onSuccess: async ({ success, request }, variables, context) => {
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
        toast.error("Request failed");
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast.error("Request failed");
    },
  });
};
