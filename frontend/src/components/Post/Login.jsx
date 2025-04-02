import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Account Logged In:", { email, password });
  };

  return (
    <div className="login">
      <header className="login-details">
        <h1 className="login-title">Login</h1>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <p className="signup-text">
        Already have an account?{" "}
        <Link className="loginButton" to="/login">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default CreateAccount;
