import React, { useEffect, useState } from "react";
import UserIcon from "assets/svg/profile-circle.svg";
import { Badge, Box, HStack, Icon, IconButton } from "@chakra-ui/react";
import { useGetProfileInformationQuery } from "store/profile";
import { PrimaryButton } from "components/buttons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { NotificationComponent } from "./notificationComponent";
import { useModalProvider } from "providers";
import { ReactComponent as HamburgerIcon } from "assets/svg/hamburger.svg";
import { useWindowWidth } from "utilities/windowWidth";
import { useGetActivityQuery } from "store/activityLogs";
import { SearchBar } from "components/custom/searchBar";
import {
  MdOutlineDarkMode,
  MdOutlineNotifications,
  MdOutlinePowerOff,
  MdOutlineSettings,
  MdPower,
  MdSettings,
} from "react-icons/md";
import { BsChevronDown, BsMenuDown, BsPower, BsSortDown } from "react-icons/bs";
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
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const { user, token: access_token } = useAuth();
  const { initModal } = useModalProvider();
  const profileImage = user?.image ?? profileInfo?.data?.image ?? UserIcon;
  const profile = profileInfo?.data || user;
  const [bg, setBg] = useState("");

  useEffect(() => {
    let err: any = error;

    if (access_token && err?.data?.statusCode === 403) {
      initModal({ sessionExpired: true });
      err = null;
    }
  }, [error]);

  const listenScrollEvent = () => {
    console.log(window.scrollY);

    if (window.scrollY > 34) {
      setBg("bg-header");
    } else {
      setBg("transparent");
    }
  };

  console.log(window.scrollY, "kjbkhg");

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
