import React from 'react';
import { useDispatch } from 'react-redux';
import { LoginType } from "../Interfaces/PagesInterfaces";
import useAuthenticate from '../hooks/useAuthenticate';
import { storeUsers } from "../redux/userSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const {loading, handleLogin} = useAuthenticate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const responseData = await handleLogin("","");
    console.log(responseData)
    localStorage.setItem("token", responseData.response.data?.token)
    dispatch(storeUsers(responseData))
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h3>Login !</h3>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email">Email</label>
            <input required type="email" className="login-input" id="login-email" />
          </div>
          <div>
            <label htmlFor="login-password">Password</label>
            <input required className="login-input" type="password" />
          </div>
          <div>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

    </div>
  )
};

export default LoginPage;