"use client";

import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { fetchUserData } from "../utilits/user";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);
      setIsLoggedIn(!!storedToken);

      if (storedToken) {
        (async () => {
          try {
            const userData = await fetchUserData();
            setUser(userData);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        })();
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/api/users/login", credentials);
      const { token } = data;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      setToken(token);
      setIsLoggedIn(true);
      const userData = await fetchUserData();
      setUser(userData);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      await axios.post("/api/users/register", credentials);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken("");
    setIsLoggedIn(false);
    setUser(null);
  };

  return {
    token,
    isLoggedIn,
    user,
    login,
    register,
    logoutUser,
  };
};
