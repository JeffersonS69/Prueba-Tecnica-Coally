import { Input } from "@chakra-ui/react";
import { FC } from "react";
import { PersonalizeProps } from "../interfaces/props";

const InputPersonalize: FC<PersonalizeProps> = ({ title, value, setValue }) => {
  return (
    <Input
      placeholder={title}
      p={2}
      value={value}
      variant="flushed"
      _placeholder={{ color: "white" }}
      onInvalid={(e) => console.log(e)}
      colorPalette="white"
      onChange={(e) => setValue(e.target.value)}
      required={title === "Title"}
    />
  );
};

export default InputPersonalize;
