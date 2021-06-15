import axios from "axios";

import events from "rest/events";
import userEvents from "rest/user_events";
import ladder from "rest/ladder";
import users from "rest/users";
import shop from "rest/shop";
import notifications from "rest/notifications";

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 403) {
      //redirect to auth
      console.log("redirect to auth");
      window.location.href = `${process.env.PUBLIC_URL}/login?redirect=${window.location.pathname}`;
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.preauthurl = window.location.pathname;
  const token = window.localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const API = {
  events,
  userEvents,
  ladder,
  users,
  shop,
  notifications,
};

export default API;
