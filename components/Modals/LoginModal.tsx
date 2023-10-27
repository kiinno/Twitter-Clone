import React, { useState, useCallback, useContext } from "react";
import Input from "../Input";
import Modal from "../Modal";
import SystemContext from "@/utils/systemContext";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const system = useContext(SystemContext);

  const [email, setEmail] = useState("admin@developer.dev");
  const [password, setPassword] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      system.showLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, system]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    system.showRegisterModal(true);
    system.showLoginModal(false);
  }, [isLoading, system]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
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
        You dont have an account?
        <span
          onClick={onToggle}
          className="ml-1 cursor-pointer text-white hover:underline"
        >
          Create Now
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={system.loginModal.isOpen}
      onSubmit={onSubmit}
      onClose={() => {
        system.showLoginModal && system.showLoginModal(false);
      }}
      title="Login"
      actionLabel="Sign in"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
