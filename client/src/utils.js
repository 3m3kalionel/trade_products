import axios from "axios";
import axiosApi from "./api/axiosApi";

const saveToken = userDetails => {
  localStorage.setItem("trade-products-token", JSON.stringify(userDetails));
};

const retrieveToken = () => localStorage.getItem("trade-products-token");

export const deleteToken = () =>
  localStorage.removeItem("trade-products-token");

export const setToken = token => {
  if (token) {
    saveToken(token);
  } else {
    const userTokenDetails = JSON.parse(retrieveToken());
    if (userTokenDetails) {
      axiosApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userTokenDetails.token}`;
    }

    return userTokenDetails;
  }
};
