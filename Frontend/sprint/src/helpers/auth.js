import { setCookie, getCookie, deleteCookie } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, employee) => {
  setCookie("token", token);
  setLocalStorage("employee", employee);
};

export const isAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("employee")) {
    return getLocalStorage("employee");
  } else {
    return false;
  }
};

export const logout = (next) => {
  deleteCookie("token");
  deleteLocalStorage("employee");

  next();
};


//For client

export const setClientAuthentication = (token1, client) => {
  setCookie("token1", token1);
  setLocalStorage("client", client);
};


export const isClientAuthenticated = () => {
  if (getCookie("token1") && getLocalStorage("client")) {
    return getLocalStorage("client");

  } else {
    return false;
  }
};

export const clientLogout = (next) => {
  deleteCookie("token1");
  deleteLocalStorage("client");

  next();
};

