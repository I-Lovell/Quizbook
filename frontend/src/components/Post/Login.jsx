import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { login as loginService } from "../../services/authentication";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useCurrentUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const token = await loginService(email, password);
      login(token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("root", {
        message: err.message,
      });
      navigate("/login");
    }
  };

  return (
    <div className="login">
      <header className="login-details">
        <h1 className="login-title">Login</h1>
      </header>
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        {errors.root && <span className="error">{errors.root.message}</span>}
        <div>
          <input
            className="input"
            placeholder="Email"
            id="email"
            type="text"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            className="input"
            placeholder="Password"
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="like-button"
          role="submit-button"
          id="submit"
          type="submit"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="signup-text">
        Don&apos;t have an account?{" "}
        <Link className="loginButton" to="/signup">
          Sign Up Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
