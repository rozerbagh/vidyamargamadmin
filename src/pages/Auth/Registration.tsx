import React from "react";
import useStorage from "../../hooks/useStorage";

const RegistrationPage: React.FC = () => {
  const {setCookie} = useStorage();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const email = formData.get('login-email') as string;
    const password = formData.get('login-password') as string;
    console.log('Success:', { email, password });
    setCookie("token", "1234567890")
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h3>Registration !</h3>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <input required type="email" className="login-input" id="login-email" />
          <div>
            <label htmlFor="login-email"></label>
            <input required type="email" className="login-input" id="login-email"/>
          </div>
          <div>
            <label htmlFor="login-password"></label>
            <input required className="login-input" type="password"/>
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

export default RegistrationPage;