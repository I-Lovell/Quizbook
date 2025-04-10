import React, { useState, useEffect } from "react";
import "./Header.css";

const Fader = ({ text = "?", className, delay = 0 }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setFadeProp((prevFadeProp) => ({
          fade: prevFadeProp.fade === "fade-in" ? "fade-out" : "fade-in",
        }));
      }, 4000);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return <h1 className={[fadeProp.fade, className].join(" ")}>{text}</h1>;
};

export default Fader;
