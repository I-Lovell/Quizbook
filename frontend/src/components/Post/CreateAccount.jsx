import { Link } from "react-router-dom";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
});

export const CreateAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const { email, password, username } = data;
    try {
      await signup(email, password, username);
      navigate("/login");
    } catch (err) {
      setError("root", {
        message: err.message,
      });
      navigate("/signup");
    }
  };

  return (
    <div className="create-account">
      <header className="account-details">
        <h1 className="create-account-title">Create Account</h1>
      </header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <span className="error">{errors.root.message}</span>}
        <div>
          <input
            className="input"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>
        <div>
          <input className="input" placeholder="Email" {...register("email")} />
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
            {...register("password")}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          role="submit-button"
          id="submit"
          type="submit"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
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
