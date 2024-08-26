import { decode } from "jwt-js-decode";
import axios from "../lib/axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const fetchUserData = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found in local storage.");
    throw new Error("No token found");
  }
  try {
    // Log token for debugging

    const response = await axios.get(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // More detailed error handling
    if (error.response) {
      console.error("Error fetching user data:", error.response.data);
    } else {
      console.error("Error fetching user data:", error.message);
    }
    throw error;
  }
};

export const decodeToken = () => {
  const token = getToken();
  if (token) {
    try {
      return decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

export const getCurrentUserId = () => {
  const decoded = decodeToken();
  return decoded ? decoded.id : null;
};
