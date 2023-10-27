import React, { useState, useCallback, useContext } from "react";
import Input from "../Input";
import Modal from "../Modal";
import SystemContext from "@/utils/systemContext";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const system = useContext(SystemContext);

  const [email, setEmail] = useState("jona_doe@email.any");
  const [password, setPassword] = useState("123123123");
  const [name, setName] = useState("Jona Doe");
  const [username, setUsername] = useState("jona_doe");
  const [isLoading, setIsLoading] = useState(false);
  const [registerErrors, setRegError] = useState<any>(null);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      system.showRegisterModal(false);
      toast.success(`Welcome ${email} in your new world`);
      setEmail("");
      setPassword("");
      setName("");
      setUsername("");
      setRegError(null);
    } catch (error) {
      setRegError(error);
      toast.error("Somting went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, system, username]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    system.showRegisterModal(false);
    system.showLoginModal(true);
  }, [isLoading, system]);
  console.log(registerErrors);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {registerErrors && (
        <div className="text-sm text-red-500 text-center font-light">
          {registerErrors.response.data.message ?? registerErrors.message}
        </div>
      )}
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        type="email"
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="ml-1 cursor-pointer text-white hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={system.registerModal.isOpen}
      onSubmit={onSubmit}
      onClose={() => {
        system.showRegisterModal && system.showRegisterModal(false);
      }}
      title="Register"
      actionLabel="Sign up"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
