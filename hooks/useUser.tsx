import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const useUser = (userId?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );
  return { data, error, isLoading, isValidating, mutate };
};

export default useUser;
