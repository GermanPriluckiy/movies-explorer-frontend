export const BASE_URL = "http://localhost:3000";

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getResponseData(res));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const exitAccount = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    
  }).then((res) => getResponseData(res));
};

export const validateToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      
    },
  }).then((res) => getResponseData(res))
  .then(data => data);
};