import React, { useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
// import { Search2Icon } from "@chakra-ui/icons";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import { useAuth } from "store/auth";
import { useGetAllCampaignsQuery } from "store/campaigns";
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
  const { user } = useAuth();
  const { data: campaigns, isLoading } = useGetAllCampaignsQuery(
    user?.role === "exporter" ? { exporterId: user?._id } : {}
  );

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
      className="wrapper-box mr-3"
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
          <InputLeftElement height={"100%"} pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            // placeholder="Search"
            border={"none"}
            paddingBlock={"8px"}
            paddingInline={"12px"}
            paddingLeft={"32px"}
            height={"29px"}
            onClick={handleInputClick}
            onChange={handleInputChange}
            width={inputWidth}
            bg={"white"}
            style={{ borderRadius: "32px" }}
          />
        </InputGroup>
      </div>
    </Box>
  );
};
