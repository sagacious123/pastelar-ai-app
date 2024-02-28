/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "store/auth";
import { useModalProvider } from "providers";
import { SearchBar } from "components/custom/searchBar";
import {
  MdOutlineDarkMode,
  MdOutlineNotifications,
  MdOutlineSettings,
} from "react-icons/md";
import { BsChevronDown, BsPower } from "react-icons/bs";
import { PiUser } from "react-icons/pi";

interface HeaderComponentProps {
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  profileInfo?: any;
  error?: any;
}

export const HeaderComponent = ({
  hamburger,
  setHamburger,
  profileInfo = {},
  error = {},
}: HeaderComponentProps) => {
  const { token: access_token } = useAuth();
  const { initModal } = useModalProvider();
  const [bg, setBg] = useState("");

  useEffect(() => {
    let err: any = error;

    if (access_token && err?.data?.statusCode === 403) {
      initModal({ sessionExpired: true });
      err = null;
    }
  }, [error]);

  const listenScrollEvent = () => {
    if (window.scrollY > 34) {
      setBg("bg-header");
    } else {
      setBg("transparent");
    }
  };

  window.addEventListener("scroll", listenScrollEvent);

  return (
    <>
      <header className={`top-site-header transition-all ${bg}`}>
        <div className="header-container">
          <div className={`flex justify-between items-center px-2`}>
            <h1 className="font-extrabold text-2xl text-gray-500">RECETTES</h1>
            {/* User profile component */}
            <div className={`gap-4 flex flex-row items-center justify-around`}>
              <SearchBar width="280px" height="28px" />
              <div className="flex items-center gap-1">
                <div className="border-[1.5px] border-gray-500 text-sm rounded-2xl py-1 px-2">
                  LENOTRE - BASTILLE 4EME
                </div>
                <BsChevronDown />
              </div>
              <div className="flex flex-row items-center justify-between">
                <HStack
                  display={{ base: "flex" }}
                  alignItems="center"
                  spacing="20px"
                >
                  {/* <div className="auth-user"> */}
                  <Link
                    to="#"
                    className="text-decoration-none text-3xl text-gray-500"
                  >
                    <PiUser />
                  </Link>
                  <button>
                    <MdOutlineSettings className="text-3xl text-gray-500" />
                  </button>
                  <button>
                    <MdOutlineNotifications className="text-3xl text-gray-500" />
                  </button>
                  <button>
                    <MdOutlineDarkMode className="text-3xl text-gray-500" />
                  </button>
                  <button>
                    <BsPower className="text-3xl text-gray-500" />
                  </button>
                </HStack>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
