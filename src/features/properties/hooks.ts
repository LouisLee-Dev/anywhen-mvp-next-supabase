import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProperty,
  deleteProperty,
  getProperty,
  getProperties,
  updateProperty,
  uploadPropertyImage,
  getMyProperties,
  deletePropertyImage,
} from "./actions";
import { Property, PropertyInput } from "./schema";
import { toast } from "sonner";

export const useProperty = (propertyId: string) => {
  return useQuery({
    queryKey: ["property", propertyId],
    queryFn: async () => {
      const property: Property = await getProperty(propertyId);
      return property;
    },
  });
};

export const useProperties = () => {
  return useQuery({
    initialData: [],
    queryKey: ["properties"],
    queryFn: async () => {
      const properties: Property[] = await getProperties();
      return properties;
    },
  });
};

export const useMyProperties = () => {
  return useQuery({
    initialData: [],
    queryKey: ["properties", "me"],
    queryFn: async () => {
      const properties: Property[] = await getMyProperties();
      return properties;
    },
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (property: PropertyInput) => {
      return createProperty(property);
    },
    onMutate: async (property: PropertyInput) => {
      await queryClient.cancelQueries({ queryKey: ["properties", "me"] });
      const previousProperties = queryClient.getQueryData(["properties", "me"]);
      return { previousProperties };
    },
    onSuccess: async ({ data: { success, property } }, variables, context) => {
      if (success) {
        queryClient.setQueryData(
          ["properties", "me"],
          (properties: Property[]) => {
            return [property, ...(properties || [])];
          },
        );
        toast.success(`${property.title} created successfully`);
      } else {
        queryClient.setQueryData(
          ["properties", "me"],
          context.previousProperties,
        );
        toast.error("Request failed");
      }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["properties", "me"],
        context.previousProperties,
      );
      console.log(error);
      toast.error("Request failed");
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (property: PropertyInput) => {
      return updateProperty(property);
    },
    onMutate: async (property: PropertyInput) => {
      await queryClient.cancelQueries({ queryKey: ["properties", "me"] });
      const previousProperties = queryClient.getQueryData(["properties", "me"]);
      queryClient.setQueryData(
        ["properties", "me"],
        (properties: Property[]) => {
          return properties?.map((t) => (t.id === property.id ? property : t));
        },
      );
      return { previousProperties };
    },
    onSuccess: async ({ data: { success, property } }, variables, context) => {
      if (success) {
        queryClient.setQueryData(
          ["properties", "me"],
          (properties: Property[]) => {
            return properties?.map((t) => {
              if (property.id === t.id) return property;
              else return t;
            });
          },
        );
        queryClient.setQueryData(["property", property.id], property);
        toast.success(`${property.title} updated successfully`);
      } else {
        queryClient.setQueryData(
          ["properties", "me"],
          context.previousProperties,
        );
        toast.error("Request failed");
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      queryClient.setQueryData(
        ["properties", "me"],
        context.previousProperties,
      );
      toast.error("Request failed");
    },
  });
};

export const useUploadPropertyImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      propertyId,
      imageUrl,
    }: {
      propertyId: string;
      imageUrl: string;
    }) => {
      return uploadPropertyImage(propertyId, imageUrl);
    },
    onMutate: async ({
      propertyId,
      imageUrl,
    }: {
      propertyId: string;
      imageUrl: string;
    }) => {
      queryClient.cancelQueries({ queryKey: ["property", propertyId] });
    },
    onSuccess: async ({ success, property }, variables, context) => {
      if (success) {
        toast.success(`Image uploaded successfully`);
        queryClient.setQueryData(["property", property.id], property);
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

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (property: PropertyInput) => {
      return deleteProperty(property.id);
    },
    onMutate: async (property: PropertyInput) => {
      await queryClient.cancelQueries({ queryKey: ["properties", "me"] });
      const previousProperties = queryClient.getQueryData(["properties", "me"]);
      return { previousProperties };
    },
    onSuccess: async ({ success, property, message }, variables, context) => {
      if (success) {
        toast.success(`${property.title} deleted successfully`);
        queryClient.setQueryData(
          ["properties", "me"],
          (properties: Property[]) => {
            return properties?.filter((t) => t.id !== property.id);
          },
        );
      } else {
        queryClient.setQueryData(
          ["properties", "me"],
          context.previousProperties,
        );
        toast.error(message);
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      queryClient.setQueryData(
        ["properties", "me"],
        context.previousProperties,
      );
      toast.error("Request failed");
    },
  });
};

export const useDeletePropertyImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      propertyId,
      imageId,
    }: {
      propertyId: string;
      imageId: string;
    }) => {
      return deletePropertyImage({ propertyId, imageId });
    },
    onMutate: async (variables: { propertyId: string; imageId: string }) => {
      queryClient.cancelQueries({
        queryKey: ["property", variables.propertyId],
      });
    },
    onSuccess: async ({ success, property }, variables, context) => {
      if (success) {
        toast.success(`Image deleted successfully`);
        queryClient.setQueryData(["property", property.id], property);
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
