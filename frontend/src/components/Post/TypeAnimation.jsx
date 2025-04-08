import { TypeAnimation as RawTypeAnimation } from "react-type-animation";

const TypeAnimation = ({
  sequence,
  wrapper = "span",
  cursor = true,
  repeat = Infinity,
  style = {},
}) => {
  return (
    <RawTypeAnimation
      sequence={sequence}
      wrapper={wrapper}
      cursor={cursor}
      repeat={repeat}
      style={{ fontSize: "2em", display: "inline-block", ...style }}
    />
  );
};

export default TypeAnimation;
