import React, { useState } from "react";
import { useUser } from "../../context/userContext";

export default function Products() {
  const { fullname, role, email } = useUser();
  const [roleSwitch, setRoleSwitch] = useState();

  return <div></div>;
}
