import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { ReactComponent as ChevronRight } from "assets/svg/chevron-right-black.svg";
import { ReactComponent as ChevronLeft } from "assets/svg/chevron-left-black.svg";
import React, { useState } from "react";

export const PaginationChakra = ({
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void; //Fn to paginate in the parent component
}) => {
  totalPages = Math.ceil(totalItems / itemsPerPage) ?? totalPages;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    // console.log(newPage);

    if (
      typeof newPage === "number" &&
      newPage > totalPages
      // (typeof newPage === "number" && newPage < 1)
    ) {
      return;
    }
    setCurrentPage((newPage + 1) as number);
    onPageChange(newPage as number);
  };

  const renderPageButtons = () => {
    const visiblePages = calculateVisiblePages();

    return visiblePages.map((pageNumber, index) => (
      <Button
        key={index}
        w={"32px"}
        h={"32px"}
        onClick={() => handlePageChange(index)}
        className={`${
          currentPage === pageNumber
            ? "bg-primary-600 text-white border-0"
            : "bg-white"
        } border border-grey-100 fw-300`}
      >
        {pageNumber !== "ellipsis" ? pageNumber : "..." /* Show ellipsis */}
      </Button>
    ));
  };
  // console.log(totalPages, currentPage);
  const calculateVisiblePages = () => {
    const maxVisiblePages = 4;
    const visiblePages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        visiblePages.push(i);
      }

      visiblePages.push("ellipsis");

      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    <Flex>
      <HStack spacing="5px" mx={"auto"}>
        <Box
          className="border border-grey-100 d-flex align-items-center justify-content-center touchable bg-white"
          borderRadius={"8px"}
          w={"32px"}
          h={"32px"}
          onClick={() => {
            handlePageChange(0);
          }}
        >
          <ChevronLeft />
          <ChevronLeft />
        </Box>
        <Box
          className="border border-grey-100 d-flex align-items-center justify-content-center touchable bg-white"
          borderRadius={"8px"}
          w={"32px"}
          h={"32px"}
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          <ChevronLeft />
        </Box>
        {renderPageButtons()}
        <Box
          className="border border-grey-100 d-flex align-items-center justify-content-center touchable bg-white"
          borderRadius={"8px"}
          w={"32px"}
          h={"32px"}
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <ChevronRight />
        </Box>
        <Box
          className="border border-grey-100 d-flex align-items-center justify-content-center touchable bg-white"
          borderRadius={"8px"}
          w={"32px"}
          h={"32px"}
          onClick={() => {
            handlePageChange(totalPages - 1);
          }}
        >
          <ChevronRight />
          <ChevronRight />
        </Box>
      </HStack>
    </Flex>
  );
};
