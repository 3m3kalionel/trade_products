import axios from "axios";

export const saveToken = userDetails => {
  localStorage.setItem("trade-products-token", JSON.stringify(userDetails));
};

export const retrieveToken = () => localStorage.getItem("trade-products-token");

export const deleteToken = () =>
  localStorage.removeItem("trade-products-token");

export const setToken = token => {
  if (token) {
    saveToken(token);
  } else {
    token = retrieveToken();
  }
  axios.defaults.headers.common["x-access-token"] = token;
};
