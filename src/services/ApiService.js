// src/services/ApiService.js
import axios from "axios";

const ApiService = axios.create({
  baseURL: "https://tu-api-url.com",
});

export const login = async (credentials) => {
  try {
    const response = await ApiService.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};
