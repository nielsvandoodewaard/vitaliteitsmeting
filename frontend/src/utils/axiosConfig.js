// utils/axiosConfig.js

import axios from "axios";

// Basis configuratie voor axios
const api = axios.create({
  baseURL: "http://localhost:1337",  // Vervang dit door je Strapi API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Functie om de auth token in te stellen
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
