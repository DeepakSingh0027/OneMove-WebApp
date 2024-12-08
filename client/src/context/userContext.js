import { createContext, useContext } from "react";

export const userContext = createContext({
  fullname: "",
  role: "buyer",
  email: "",
  updateFullname: (fullname) => {},
  updateRole: (role) => {},
  updateEmail: (email) => {},
});

export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = userContext.Provider;
