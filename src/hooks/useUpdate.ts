import { useState } from "react";
import useStorage from "./useStorage";
import { baseURL } from "./http";
import axios, { AxiosResponse } from "axios";
const useUpdate = () => {
  const { cookies } = useStorage();
  const [loading, setLoading] = useState(false);
  const updateUserDetails = async (
    url: string,
    body: any
  ) => {
    setLoading(false);
    try {
      const response: AxiosResponse = await axios.patch(`${baseURL}/${url}`,body, {
        headers: {
          admintkn: cookies.token,
        },
      });
      const responseData = response.data;
      setLoading(false);
      return responseData;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  return {
    loading,
    updateUserDetails,
  };
};

export default useUpdate;
