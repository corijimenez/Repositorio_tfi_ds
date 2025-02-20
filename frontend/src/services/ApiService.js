// src/services/ApiService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Error al registrar usuario",
    };
  }
};

export const confirmAccount = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/confirm`, { email, code });
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Código incorrecto o expirado",
    };
  }
};
