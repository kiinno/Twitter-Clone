import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const useAuthentications = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/get-auth",
    fetcher
  );
  return { data, error, isLoading, isValidating, mutate };
};

export default useAuthentications;
