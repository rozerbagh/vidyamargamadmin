import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "./http";

function useFetch() {
  const [loading, setLoading] = useState(false);
  const fetchData = async (url: string, _setStates: (data: any) => void) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.get(url);
      const responseData = response.data;
      // Process the response data
      _setStates(responseData);
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
  const fetchUsersList = async (): Promise<any> => {
    const url = `${baseURL}/user/lists?admintkn=vidyamargamadmin`;
    try {
      const response: AxiosResponse = await axios.get(url);
      const userData = response.data;
      return userData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error("Axios error:", error.message);
      } else {
        // Handle general errors
        console.error("General error:", error);
      }
      return null;
    }
  };

  const fetchSchoolsList = async (): Promise<any> => {
    setLoading(true);
    const url = `${baseURL}/app/school/all?admintkn=vidyamargamadmin`;
    try {
      const response: AxiosResponse = await axios.get(url);
      const userData = response.data;
      setLoading(false)
      return userData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error("Axios error:", error.message);
      } else {
        // Handle general errors
        console.error("General error:", error);
      }
      setLoading(false)
      return null;
    }
  };

  const fetchBusesList = async (schoolId: string): Promise<any> => {
    setLoading(true);
    const url = `${baseURL}/app/school/bus/all/${schoolId}?admintkn=vidyamargamadmin`;
    try {
      const response: AxiosResponse = await axios.get(url);
      const _data = response.data.response.data;
      setLoading(false);
      return _data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error("Axios error:", error.message);
      } else {
        // Handle general errors
        console.error("General error:", error);
      }
      setLoading(false);
      return null;
    }
  };
  return {
    loading,
    fetchData,
    fetchUsersList,
    fetchSchoolsList,
    fetchBusesList,
  };
}

export default useFetch;
