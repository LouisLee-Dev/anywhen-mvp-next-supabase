import { useQuery } from "@tanstack/react-query";
import {
  getAvailableRequest,
  getAcceptedRequest,
  getAllRequest,
} from "./actions";

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
