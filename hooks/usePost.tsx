import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const usePost = (postId?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );
  return { data, error, isLoading, isValidating, mutate };
};

export default usePost;
