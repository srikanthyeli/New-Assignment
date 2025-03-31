import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Authentication APIs
export const registerUser = (userData) => api.post("/register", userData);
export const loginUser = (credentials) => api.post("/login", credentials);

// Store APIs
export const getStores = () => api.get("/stores");
export const addStore = (storeData, token) =>
  api.post("/stores", storeData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Ratings APIs
export const submitRating = (ratingData, token) =>
  api.post("/ratings", ratingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
