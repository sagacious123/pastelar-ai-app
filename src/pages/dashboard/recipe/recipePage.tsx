import { Box, Flex, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  BsCalculator,
  BsCalendar,
  BsDownload,
  BsFileEarmark,
  BsPencil,
  BsPlus,
  BsPrinter,
  BsTrash,
  BsUpload,
} from "react-icons/bs";
import { MdOutlineFileCopy } from "react-icons/md";
import { PiChartBar, PiScan } from "react-icons/pi";
import { AddRecipeModal } from "./components";

export const RecipePage = () => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <div className="left-content w-[63%]">
          <div className="tab-head flex justify-between mb-6 border-b border-b-gray-500">
            <button className="p-3 text-wrap">Pates Biscuits</button>
            <button className="p-3 text-wrap">Pates Biscuits</button>
            <button className="p-3 text-wrap">Pates Biscuits</button>
            <button className="p-3 text-wrap">Pates Biscuits</button>
            <button className="p-3 text-wrap">Pates Biscuits</button>
          </div>
          <div className="recipe-table-container bg-w bg-[#ffffff5d] backdrop-blur-sm pt-3 pb-7 px-4 rounded-2xl">
            <table className="w-full text-center border-separate border-spacing-y-4">
              <thead>
                <tr>
                  <th className="p-4 py-2 text-gray-500">Recettes</th>
                  <th className="p-4 py-2 text-gray-500">Realisation</th>
                  <th className="p-4 py-2 text-gray-500">Conservation</th>
                  <th className="p-4 py-2 text-gray-500">Produits</th>
                  <th className="p-4 py-2 text-gray-500">Cout</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <tr
                    key={item}
                    className="bg-white rounded-2xl cursor-pointer"
                  >
                    <td className="rounded-s-2xl py-1 text-gray-500">
                      Pate a choux
                    </td>
                    <td className="py-1 text-gray-500">1h 20m</td>
                    <td className="py-1 text-gray-500">3 jours</td>
                    <td className="py-1 text-gray-500">6</td>
                    <td className="rounded-e-2xl py-1 text-gray-500">
                      11,58€/kg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-content w-[35%] h-full pt-4">
          <div className="options grid items-center justify-center mb-7">
            <HStack
              display={{ base: "flex" }}
              alignItems="center"
              justifyContent="center"
              spacing="28px"
            >
              {/* <div className="auth-user"> */}
              <button onClick={() => setShowRecipeModal(!showRecipeModal)}>
                <BsPlus className="text-3xl text-gray-500" />
              </button>
              <button>
                <MdOutlineFileCopy className="text-lg text-gray-500" />
              </button>
              <button>
                <BsUpload className="text-lg text-gray-500" />
              </button>
              <button>
                <BsDownload className="text-lg text-gray-500" />
              </button>
            </HStack>
            <button>
              <PiScan className="text-3xl text-gray-500" />
            </button>
          </div>
          <div className="bg-w bg-[#f8f8f8] overflow-hidden backdrop-blur-sm pt-3 rounded-2xl">
            <h2 className="font-extrabold text-[20px] text-center text-gray-500 mb-2">
              Pate a choux
            </h2>
            <HStack
              display={{ base: "flex" }}
              alignItems="center"
              justifyContent="center"
              spacing="28px"
              className="mb-3"
            >
              {/* <div className="auth-user"> */}
              <button>
                <BsPencil className="text-lg text-gray-500" />
              </button>
              <button>
                <PiChartBar className="text-lg text-gray-500" />
              </button>
              <button>
                <BsFileEarmark className="text-lg text-gray-500" />
              </button>
              <button>
                <BsCalculator className="text-lg text-gray-500" />
              </button>
              <button>
                <BsTrash className="text-lg text-gray-500" />
              </button>
              <button>
                <BsPrinter className="text-lg text-gray-500" />
              </button>
            </HStack>
            <div className="bg-[#f2f2f2] rounded-t-3xl p-4 pb-[130px]">
              <div className="flex items-center justify-center gap-2 mb-3">
                <h3 className="font-extrabold text-lg text-center text-gray-500">
                  Previsionnel de production
                </h3>
                <BsCalendar className="text-lg text-gray-500" />
              </div>
              <div className="flex justify-center  mb-5">
                <select name="" id="" className="text-center">
                  <option value="1">Adjourd'hui</option>
                </select>
              </div>

              <IngredientsList />
            </div>
          </div>
        </div>
      </div>
      {showRecipeModal && (
        <AddRecipeModal close={() => setShowRecipeModal(false)} />
      )}
    </div>
  );
};

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      // mr={{ base: "40px", md: "40px" }}
      // ml={{ base: "0", md: "40px" }}
    >
      <span
        className="absolute left-[40%] h-[28px] border border-solid border-gray-400 top-[12px]"

        // borderColor={useColorModeValue("gray.200", "gray.700")}
      ></span>
      <Box pos="relative" width="7px" height="7px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={"#eeeeee"}
          border={"1px solid"}
          borderColor={"gray.400"}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

export const IngredientsList = () => {
  return (
    <div>
      <Flex mb="10px" className="justify-center gap-6">
        <>
          <h5 className="w-[120px] text-right font-semibold text-gray-500">
            Ingredients
          </h5>
          <span></span>
          {/* <LineWithDot /> */}
          <h5 className="w-[120px] text-left font-semibold text-gray-500">
            Poids
          </h5>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Lait entier</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            535 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Eau</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            535 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Sucre semoule</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            45 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Sel fin</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            20 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Beurre doux</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            470 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Sel fin</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            20 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Farine T45 Gruau</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            290 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Farine T55</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            285 g
          </p>
        </>
      </Flex>
      <Flex mb="10px" className="justify-center gap-5">
        <>
          <p className="w-[120px] text-right text-gray-500">Oeufs entiers</p>
          <LineWithDot />
          <p className="w-[120px] text-left text-gray-500 font-semibold">
            950 g
          </p>
        </>
      </Flex>
    </div>
  );
};
