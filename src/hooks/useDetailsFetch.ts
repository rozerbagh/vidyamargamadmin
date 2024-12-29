import useStorage from "./useStorage";
import { baseURL } from "./http";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
const useDetailsFetch = () => {
  const { cookies } = useStorage();
  const [loading, setLoading] = useState(false);
  const fetchUserDetails = async (url: string, _setStates: (data: any) => void) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.get(`${baseURL}/${url}`,{
        headers: {
          'admintkn': cookies.token
        }
      });
      const responseData = response.data;
      if (responseData.response?.data && responseData.response.data.length > 0) {
        _setStates(responseData.response.data[0]);
      } else if (responseData.data.length === 0) {
        _setStates(responseData.data[0]);
      } else {
        _setStates(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  return {
    loading,
    fetchUserDetails
  }
}

export default useDetailsFetch;