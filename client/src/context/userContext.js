import { createContext, useContext } from "react";

export const userContext = createContext({
  fullname,
  role,
  email,
});

export const useUser = () => {
  return useContext(userContext);
};

export const userProvider = useContext.Provider;
