import React, { useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
// import { Search2Icon } from "@chakra-ui/icons";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import { useWindowWidth } from "utilities/windowWidth";

interface SearchBarProps {
  width: string;
  height: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ width, height }) => {
  const windowWidth = useWindowWidth();
  const [active, setActive] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [inputWidth, setInputWidth] = React.useState<string | undefined>(width);

  useEffect(() => {
    const handleDocumentClick = () => {
      setActive(false);
      setInputWidth(width);
    };

    const wrapperBox = document.querySelector(".wrapper-box");
    if (wrapperBox) {
      wrapperBox.addEventListener("click", handleDocumentClick);
    }

    return () => {
      if (wrapperBox) {
        wrapperBox.removeEventListener("click", handleDocumentClick);
      }
    };
  }, [width]);

  const handleInputClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const newInputWidth = windowWidth < 768 ? "90vw" : "70vw";
    setInputWidth(newInputWidth);
    setActive(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLocaleLowerCase());
    console.log(e.target.value.toLocaleLowerCase());
  };

  return (
    <Box
      position={active ? "absolute" : "relative"}
      height={active ? "100vh" : "fit-content"}
      width={active ? "100vw" : "fit-content"}
      bg={"rgba(247, 247, 247, 0.75)"}
      top={0}
      left={0}
      zIndex={100}
      display={"flex"}
      justifyContent={"center"}
      className="wrapper-box"
      style={{ borderRadius: "32px" }}
    >
      <div>
        <InputGroup
          size="md"
          width={inputWidth}
          position={"relative"}
          marginTop={active ? "16px" : "none"}
          style={{ borderRadius: "32px" }}
        >
          {/* There seems to be a bug with chakra ui's InputLeftElement */}
          <InputLeftElement height={"100%"} pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            border={"1px solid #7E7E7E"}
            paddingBlock={"8px"}
            paddingInline={"12px"}
            paddingLeft={"32px"}
            height={"fit-content"}
            onClick={handleInputClick}
            onChange={handleInputChange}
            width={inputWidth}
            bg={"white"}
            style={{ borderRadius: "32px" }}
          />
        </InputGroup>
        <VStack
          width={inputWidth}
          bg={active === true && query !== "" ? "white" : "transparent"}
          borderBottomRadius={"16px"}
          onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
          px={"16px"}
          height={"auto"}
          maxHeight={"70%"}
          overflowY={"scroll"}
        ></VStack>
      </div>
    </Box>
  );
};
