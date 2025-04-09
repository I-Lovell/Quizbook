import { TypeAnimation as RawTypeAnimation } from "react-type-animation";

const CustomTypeAnimation = ({
  sequence,
  wrapper = "span",
  cursor = true,
  repeat = Infinity,
  speed = 50,
  style = {},
}) => {
  return (
    <RawTypeAnimation
      sequence={sequence}
      wrapper={wrapper}
      cursor={cursor}
      repeat={repeat}
      speed={speed}
      style={style}
    />
  );
};

export default CustomTypeAnimation;
