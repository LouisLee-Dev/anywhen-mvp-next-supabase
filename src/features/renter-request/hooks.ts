import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAvailableRequest,
  getAcceptedRequest,
  getAllRequest,
  acceptRequest,
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

export const useAvailableRequests = (propertyId: string) => {
  return useQuery({
    initialData: [],
    queryKey: ["owner", "availableRequests"],
    queryFn: async () => {
      const availableRequests: any[] = await getAvailableRequest(propertyId);
      return availableRequests;
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

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return acceptRequest(id);
    },
    onSuccess: async ({ success, request }, variables, context) => {
      if (success) {
        queryClient.setQueryData(
          ["owner", "availableRequests"],
          (requests: RentalRequest[]) => {
            return requests?.filter((t) => request.id != t.id);
          },
        );
        toast.success(`Request accepted successfully`);
      } else {
        toast.error("Request failed");
      }
    },
    onError: (error, variables, context) => {
      toast.error("Request failed");
    },
  });
};
