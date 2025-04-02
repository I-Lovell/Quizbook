import { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";


export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password, username);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  return (
    <div className="create-account">
      <header className="account-details">
        <h1 className="create-account-title">Create Account</h1>
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
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          id="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
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
