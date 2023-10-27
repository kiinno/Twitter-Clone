import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const useUsers = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/users",
    fetcher
  );
  return { data, error, isLoading, isValidating, mutate };
};

export default useUsers;
