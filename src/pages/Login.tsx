import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorage from '../hooks/useStorage';
import useAuthenticate from '../hooks/useAuthenticate';

const LoginPage: React.FC = () => {
  const { setCookie} = useStorage();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuthenticate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const responseData = await handleLogin(emailRef.current?.value ?? "", passwordRef.current?.value ?? "" );
    console.log(responseData)
    setCookie("token", responseData.response.data?.token)
    setCookie("user", responseData.response.data)
    navigate("/")
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h3>Vidyamargam Login !</h3>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email">Email</label>
            <input required type="email" className="login-input" id="login-email" ref={emailRef} />
          </div>
          <div>
            <label htmlFor="login-password">Password</label>
            <input required className="login-input" type="password" ref={passwordRef} />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              Submit
            </button>
          </div>
        </form>
      </div>

    </div>
  )
};

export default LoginPage;