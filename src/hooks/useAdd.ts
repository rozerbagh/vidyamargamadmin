import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "./http";
import useStorage from "./useStorage";
function useAdd() {
  const [loading, setLoading] = useState(false);
  const { cookies } = useStorage();
  const addSchools = async (
    url: string,
    schoolbody: object,
    cb: (data: any) => void
  ) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.post(
        `${baseURL}/${url}`,
        { ...schoolbody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const responseData = response.data;
      // Process the response data
      setLoading(false);
      return responseData;
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
      const response: AxiosResponse = await axios.post(
        `${baseURL}/${url}`,
        {
          ...userBody,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
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

  const addBus = async (url: string, busBody: object) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.post(
        `${baseURL}/${url}`,
        { ...busBody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const responseData = response.data;
      return { data: responseData, status: response.status };
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        return { data: error.response?.data, status: error.response?.status };
      } else {
        return { data: error, status: 500 };
      }
    }
  };

  const addStudent = async (studentBody: object, url: string) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.post(
        `${baseURL}/${url}`,
        { ...studentBody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const responseData = response.data;
      return { data: responseData, status: response.status };
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        return { data: error.response?.data, status: error.response?.status };
      } else {
        return { data: error, status: 500 };
      }
    }
  };

  return { loading, setLoading, addSchools, addUser, addBus, addStudent };
}

export default useAdd;
