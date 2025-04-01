
import "./HomePage.css";

import Header from "../../components/Post/Header";

export const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <main className="main-content">
        <div className="welcome-box">
          <p>Welcome to QuizBook! The number one hub to connect with fellow quiz-lovers!</p>
        </div>
      </main>
    </div>
  );
};