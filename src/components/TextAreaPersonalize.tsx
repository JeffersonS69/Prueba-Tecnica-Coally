import { Textarea } from "@chakra-ui/react";
import { FC } from "react";
import { PersonalizeProps } from "../interfaces/props";

const TextAreaPersonalize: FC<PersonalizeProps> = ({
  title,
  value,
  setValue,
}) => {
  return (
    <Textarea
      resize="none"
      p={2}
      placeholder={title}
      value={value}
      variant="flushed"
      _placeholder={{ color: "white" }}
      onChange={(e) => setValue(e.target.value)}
      required={title === "Title"}
    />
  );
};

export default TextAreaPersonalize;
