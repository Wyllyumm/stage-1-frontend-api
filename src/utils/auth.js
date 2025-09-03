import { request } from "./Api";

/* real api request logic 
function userSignUp({ name, email, password }) {
  return request(`signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}

function userSignin({ email, password }) {
  return request(`signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

const getUserInfo = (token) => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}; */

//makeshift logic api request to interact with db.json //
export const authorize = (email, password) => {
  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "Will", email: "fake@example,com", _id: "fake-id" },
    });
  });
};

export const signup = (values) => {
  return new Promise((resolve) => {
    resolve({ values });
  });
};

export /* userSignUp, userSignin, getUserInfo */ {};
