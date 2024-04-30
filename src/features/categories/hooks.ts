import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./actions";
import { getCurrencies } from "./actions";
export const useCategories = () => {
  return useQuery({
    initialData: [],
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
export const useCurrencies = () => {
  return useQuery({
    initialData: [],
    queryKey: ["currencies"],
    queryFn: () => getCurrencies(),
  });
};
