import useAuthentications from "@/hooks/useAuthentications";
import usePosts from "@/hooks/usePosts";
import SystemContext from "@/utils/systemContext";
import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const system = useContext(SystemContext);
  const { data: currentUser } = useAuthentications();
  const { mutate: mutatePosts } = usePosts();
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment
        ? `/api/posts/comment?postId=${postId}`
        : "/api/posts";
      const res = await axios.post(url, { body });
      toast.success("Successfully.");

      mutatePosts();
      setBody("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, mutatePosts, postId]);

  const onChange = useCallback((ev: any) => {
    const val: string = ev.target.value;
    setBody(val);
    if (val.length > 0) setTouched(true);
    else setTouched(false);
  }, []);
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser?.user ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser.user?._id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={onChange}
              value={body}
              placeholder={placeholder}
              className="disabled:opacity-80 peer mt-3 ring-0 tex-[20px] placeholder-neutral-500 text-white bg-transparent resize-none focus:outline-none w-full"
            ></textarea>
            {/* {touched && ( */}
            <div className="my-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !touched}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
            {/* )} */}
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold ">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={() => system.showLoginModal(true)} />
            <Button
              label="Register"
              onClick={() => system.showRegisterModal(true)}
              secondary
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
