import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  BoxProps,
  HStack,
  StackProps,
  Input,
  InputProps,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useWindowWidth } from "utilities/windowWidth";

export type VerificationCodeInputProps = {
  wrapperProps?: StackProps;
  childProps?: BoxProps;
  inputProps?: InputProps;
  codeLength?: number;
  colorTheme?: string;
  rounded?: boolean;
  width?: string;
  bg?: string;
};

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  wrapperProps,
  childProps,
  inputProps,
  codeLength = 4,
  colorTheme = "primary",
  rounded,
  width,
  bg,
}) => {
  const windowWidth = useWindowWidth();
  const [code, setCode] = useState(Array(codeLength).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(codeLength).fill(null));

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // console.log(newCode);
    if (value !== "" && index < code.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // const handleKeyDown = (
  //   index: number,
  //   event: KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (
  //     event.key === "Backspace" &&
  //     index > 0 &&
  //     code[index] === "" &&
  //     inputRefs.current[index - 1]
  //   ) {
  //     inputRefs.current[index - 1]?.focus();
  //   }
  // };

  // useEffect(() => {
  //   inputRefs.current[activeInput]!.focus();
  // }, [activeInput]);

  return (
    <HStack {...wrapperProps}>
      <PinInput placeholder='' otp>
        {code.map((value, index) => (
          <>
            <PinInputField
              key={index}
              borderWidth={activeInput === index ? "1px" : "1px"}
              boxShadow={activeInput === index ? "0 0 0px 3px #a3d9a5" : ""}
              className={
                activeInput === index
                  ? `border-${colorTheme}-100 d-flex align-items-center justify-content-center text-center text-${colorTheme}-600 fw-500`
                  : `border-${colorTheme}-300 d-flex align-items-center justify-content-center text-center text-${colorTheme}-600 fw-500`
              }
              style={{ caretColor: "transparent" }}
              maxWidth={width ?? "80px"}
              maxHeight={width ?? "80px"}
              width={"23%"}
              // height={"64px"}
              borderRadius={rounded ? "full" : "8px"}
              fontSize={rounded === true ? "24px" : "48px"}
              p={"8px"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              // onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              //   handleKeyDown(index, e)
              // }
              onFocus={() => setActiveInput(index)}
              bg={bg ?? "transparent"}
            />

            {/* <Box
              key={index}
              borderWidth={activeInput === index ? "4px" : "1px"}
              className={
                activeInput === index
                  ? `border-${colorTheme}-100`
                  : `border-${colorTheme}-300`
              }
              borderRadius={"8px"}
              fontSize={"48px"}
              p={"8px"}
              {...childProps}
            >
              <Input
                className={`d-flex align-items-center justify-content-center border-0 text-${colorTheme}-600 fw-500`}
                fontSize={"48px"}
                width={"64px"}
                height={"64px"}
                type="text"
                style={{ caretColor: "transparent" }}
                maxLength={1}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                onFocus={() => setActiveInput(index)}
                ref={(el) => (inputRefs.current[index] = el)}
                {...inputProps}
              />
            </Box> */}
            {codeLength > 4 && index === 2 && (
              <Box
                width={windowWidth >= 768 ? "28px" : "5px"}
                height={"60px"}
                className='d-flex align-items-center justify-content-center'
                fontSize={"48px"}
              >
                {windowWidth >= 768 ? "-" : ""}
              </Box>
            )}
          </>
        ))}
      </PinInput>
    </HStack>
  );
};
