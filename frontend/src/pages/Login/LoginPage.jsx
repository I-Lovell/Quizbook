import Header from "../../components/Post/Header";
import Login from "../../components/Post/Login";
import "../Background.css";

export const LoginPage = () => {
  return (
    <div className="home">
      <div className="backim"></div>
      <Header />
      <Login />
    </div>
  );
};

export default LoginPage;
