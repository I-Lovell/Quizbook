import "./HomePage.css";
import "../Background.css";
import "../../Components/Post/TypeAnimation.css";
import Header from "../../components/Post/Header";
import CustomTypeAnimation from "../../components/Post/CustomTypeAnimation";

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="backim"></div>
      <Header />
      <div className="TypeAnimation3">
        <CustomTypeAnimation
          sequence={[
            "Which part of his body did Albert Einstein leave to Princeton University?",
            1000,
            "An alloy made from copper and tin is commonly known as what?",
            1000,
            "What is on the outside of a Batterburg Cake?",
            1000,
            "What are Polish Dumplings more commonly known as?",
            1000,
          ]}
          speed={50}
          repeat={Infinity}
        />{" "}
      </div>
      <div className="TypeAnimation1">
        <CustomTypeAnimation
          sequence={[
            "What do the initials HTTP stand for?",
            1000,
            "Daleks were inhabitants of what planet?",
            1000,
            "In Shakespeares play, which king does Macbeth murder?",
            1000,
            "Who is the author of the Hitchhikers Guide to the Galaxy series?",
            1000,
          ]}
          speed={50}
          repeat={Infinity}
        />{" "}
      </div>
      <main className="main-content">
        <div className="welcome-box">
          <p>
            Welcome to QuizBook! The number one hub to connect with fellow
            quiz-lovers!
          </p>
        </div>
      </main>
      <div className="TypeAnimation2">
        <CustomTypeAnimation
          sequence={[
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
          repeat={Infinity}
        />{" "}
      </div>
      <div className="TypeAnimation4">
        <CustomTypeAnimation
          sequence={[
            "Who famously had a painting destroyed immediately after selling at auction?",
            1000,
            "Blathers is the name of a museum currating owl in which Nintendo game?",
            1000,
            "In the original 1980s Pacman the ghosts were named Inky, Blinky, Pinky, and what?",
            1000,
            "What is the name of Masterchielf's AI sidekick?",
            1000,
          ]}
          speed={50}
          repeat={Infinity}
        />{" "}
      </div>
    </div>
  );
};
