import React from "react";
import { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [fullname, setFullName] = React.useState("");
  const [role, setARole] = React.useState("");
  const [email, setCEmail] = React.useState("");

  return (
    <UserContext.Provider
      value={{ fullname, role, email, setFullName, setARole, setCEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
/*import { createContext, useContext } from "react";

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
*/
