import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "./http";

function useAuthenticate() {
  const [loading, setLoading] = useState(false);
  const handleLogin = async (
    email: string,
    password: string
  ): Promise<any> => {
    setLoading(false);
    try {
      const url = `${baseURL}/user/login`;
      const response: AxiosResponse = await axios.post(url, {
        email: email,
        password: password,
      });
      const responseData = response.data;
      // Process the response data
      setLoading(false);
      return responseData
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
  return { loading, handleLogin };
}

export default useAuthenticate;
