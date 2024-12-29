import { useState } from "react";
import { useCookies } from "react-cookie";
const useStorage = () => {
  const [cookies, setCookie] = useCookies(["token", "user"]);
  const [storage, setStorage] = useState<any>(null);
  return {storage, setStorage, cookies, setCookie};
}
export default useStorage;