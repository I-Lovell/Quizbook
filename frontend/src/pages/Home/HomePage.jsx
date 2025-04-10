import Header from "../../components/Post/Header";
import CustomTypeAnimation from "../../components/Post/CustomTypeAnimation";
import "./HomePage.css";
import "../Background.css";
import "../../Components/Post/TypeAnimation.css";

export const HomePage = () => {
  return (
    <div className="home">
      <div className="backim">
        <div className="TypeAnimation3a">
          <CustomTypeAnimation
            key="Set1"
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
        <div className="TypeAnimation3ab">
          <CustomTypeAnimation
            key="Set2"
            sequence={[
              "In which European country could you spend a Forint?",
              1000,
              "In Meet the Parents, what animal is Robert De Niro's character particularly fond of?",
              1000,
              "Where is the Sea of Showers?",
              1000,
              "Who is the protagonist in A Study in Scarlet?",
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          />{" "}
        </div>
      </div>
      <Header />
      <div className="welcome-box">
        <p>
          Welcome to QuizBook! The number one hub to connect with fellow
          quiz-lovers!
        </p>
      </div>

      <div className="TypeAnimation2a">
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
      <div className="TypeAnimation4a">
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
      <div className="TypeAnimation1a">
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
    </div>
  );
};
