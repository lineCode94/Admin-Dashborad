import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";
export const AdminActions = {
  login: "USER_LOGIN",
  logout: "USER_LOGOUT",
  central: "ENTER_CENTRAL",
  email: "LOGIN_EMAIL",
};
export const AdminContext = createContext();

const initialState = {
  adminInfo: Cookies.get("adminInfo")
    ? JSON.parse(Cookies.get("adminInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case AdminActions.login:
      return { ...state, adminInfo: action.payload };

    case AdminActions.logout:
      return {
        ...state,
        adminInfo: null,
      };

    case AdminActions.central:
      return {
        ...state,
        central: action.payload,
      };

    case AdminActions.email:
      return {
        ...state,
        email: action.payload,
      };

    default:
      return state;
  }
}

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
