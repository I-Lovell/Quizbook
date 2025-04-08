import "./HomePage.css";
import "../Background.css";
import { TypeAnimation } from "react-type-animation";

import Header from "../../components/Post/Header";

export const HomePage = () => {
  return (
    <div className="home">
      <div className="backim"></div>
      <Header />
      <main className="main-content">
        <div className="welcome-box">
          <p>
            Welcome to QuizBook! The number one hub to connect with fellow
            quiz-lovers!
          </p>
        </div>
        <div className="TypeAnimation">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "What is the most popular pet in the world?",
              1000,
              "Which food was used as an April Fool's joke in 1957?",
              1000,
              "What is the National Animal of Scotland?",
              1000,
              "Which fingernail grows the fastest?",
              1000,
            ]}
            speed={50}
            style={{ fontSize: "2em" }}
            repeat={Infinity}
          />{" "}
        </div>
      </main>
    </div>
  );
};
