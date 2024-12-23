import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "./http";

function useAdd() {
  const [loading, setLoading] = useState(false);
  const addSchools = async (
    schoolbody: object,
    url: string,
    cb: (data: any) => void
  ) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.post(url, { ...schoolbody });
      const responseData = response.data;
      // Process the response data
      cb(responseData);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error("Axios error:", error.message);
      } else {
        // Handle general errors
        console.error("General error:", error);
      }
    }
    setLoading(false);
  };

  const addUser = async (
    userBody: object,
    url: string,
    cb: (data: any) => void
  ) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.post(`${baseURL}/${url}`, { ...userBody });
      const responseData = response.data;
      // Process the response data
      cb(responseData);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error("Axios error:", error.message);
      } else {
        // Handle general errors
        console.error("General error:", error);
      }
    }
    setLoading(false);
  };
  return { loading, addSchools, addUser };
}

export default useAdd;
