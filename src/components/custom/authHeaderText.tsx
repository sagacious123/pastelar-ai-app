import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useWindowWidth } from "utilities/windowWidth";

export type AuthHeaderTextProps = {
  title?: string;
  subTitle?: string;
};

export const AuthHeaderText: React.FC<AuthHeaderTextProps> = ({
  title,
  subTitle,
}) => {
  const windowWidth = useWindowWidth();
  return (
    <div>
      <Heading
        as="h2"
        className={`fw-600 text-grey-900 ${ windowWidth <= 768 && 'mb-0' }`}
        size="lg"
        fontFamily="Inter"
        color="MenuText"
      >
        {title}
      </Heading>
      <Text fontSize="md" color="gray.500" className={`lh-base ${ windowWidth <= 768 && 'mb-0' }`}>
        {subTitle}
      </Text>
    </div>
  );
};
