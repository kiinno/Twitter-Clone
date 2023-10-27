import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const usePosts = (userId?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    userId ? `/api/posts?userId=${userId}` : "/api/posts",
    fetcher
  );
  return { data, error, isLoading, isValidating, mutate };
};

export default usePosts;
