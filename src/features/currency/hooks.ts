import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "./actions";

export const useCurrencies = () => {
  return useQuery({
    initialData: [],
    queryKey: ["currencies"],
    queryFn: () => getCurrencies(),
  });
};
