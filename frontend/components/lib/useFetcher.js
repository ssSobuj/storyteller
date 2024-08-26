"use client";

import useSWR from "swr";
import axios from "./axios";

export const useFetcher = (url, params = {}) => {
  const { data, error, isLoading, mutate } = useSWR(url, async () => {
    const response = await axios.get(url, { params });
    return response.data;
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
