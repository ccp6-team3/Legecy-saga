import axios from "axios";

const API_URL = "/auth";

const signup = (username, email, password) => {
  return axios
    .post(API_URL + "/signup", {
      userName: username,
      userEmail: email,
      userPassword: password,
    })
    .then(res => {
      
    })
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      userEmail: email,
      userPassword: password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;