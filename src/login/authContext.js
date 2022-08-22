import React from "react";

export const setToken = (newToken) => {
  window.localStorage.setItem(
    "loggedAppToken",
    JSON.stringify(`Bearer ${newToken}`)
  );
};

export const setUser = (newUser) => {
  console.log(newUser);
  window.localStorage.setItem("loggedAppUser", JSON.stringify(newUser));
};

export const requestToken = {
  headers: {
    Authorization: window.localStorage
      .getItem("loggedAppToken")
      .replace(/['"]+/g, ""),
  },
};
