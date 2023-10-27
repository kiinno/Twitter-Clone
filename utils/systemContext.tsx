import { createContext, useCallback, useEffect, useState } from "react";

interface SystemContextProps {
  loginModal: {
    isOpen: boolean;
  };
  registerModal: {
    isOpen: boolean;
  };
  editModal: {
    isOpen: boolean;
  };
  showLoginModal: (status: boolean) => void;
  showRegisterModal: (status: boolean) => void;
  showEditModal: (status: boolean) => void;
}
const SystemContext = createContext<SystemContextProps>({
  loginModal: {
    isOpen: false,
  },
  registerModal: {
    isOpen: false,
  },
  editModal: {
    isOpen: false,
  },
  showLoginModal(status) {},
  showRegisterModal(status) {},
  showEditModal(status) {},
});

interface SystemProviderProps {
  children: React.ReactNode;
}
export const SystemProvider: React.FC<SystemProviderProps> = ({ children }) => {
  const [system, setSystem] = useState({
    loginModal: {
      isOpen: false,
    },
    registerModal: {
      isOpen: false,
    },
    editModal: {
      isOpen: false,
    },
  });

  const showLoginModal = (status: boolean) => {
    setSystem((prev) => ({
      ...prev,
      loginModal: { ...prev.loginModal, isOpen: status },
    }));
  };

  const showRegisterModal = (status: boolean) => {
    setSystem((prev) => ({
      ...prev,
      registerModal: { ...prev.registerModal, isOpen: status },
    }));
  };

  const showEditModal = (status: boolean) => {
    setSystem((prev) => ({
      ...prev,
      editModal: { ...prev.editModal, isOpen: status },
    }));
  };

  return (
    <SystemContext.Provider
      value={{ ...system, showLoginModal, showRegisterModal, showEditModal }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemContext;
