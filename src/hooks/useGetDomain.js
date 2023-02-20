import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export function useGetDomain() {
  const { state } = useContext(AdminContext);
  let domain = null;
  if (Boolean(state.adminInfo?.data.domain))
    domain = state.adminInfo?.data.domain;
  else if (localStorage.getItem("subDomain"))
    domain = localStorage.getItem("subDomain");
  return domain;
}
