/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  MdOutlineHome,
  MdOutlineMan3,
  MdOutlineMan4,
  MdPeopleOutline,
} from "react-icons/md";
import { PiLeaf, PiShieldLight } from "react-icons/pi";
import {
  BsBarChart,
  BsBook,
  BsBox2,
  BsCalculator,
  BsCalendar2,
  BsFileEarmarkBinary,
  BsKey,
} from "react-icons/bs";

export const SideBarComponent = () => {
  const [coords, setCoords] = useState<any>("");

  useEffect(() => {
    const el: any = document.querySelector(".activee");
    setCoords(el.offsetTop);
  }, []);

  const getCoords = (e: any) => {
    setCoords(e.target.offsetTop);
  };

  return (
    <div className="w-[162px] h-[100vh] fixed top-0  left-0 border-r-[1.5px] border-solid border-gray-400">
      <span
        className="slide transition-all duration-1000"
        style={{ top: coords - 11 + "px" }}
      ></span>
      <div className="p-4 pr-3">
        <NavLink to="#">LOGO</NavLink>

        <div className="mt-10">
          <NavLink
            to="/home"
            onClick={getCoords}
            className={({ isActive }) =>
              isActive
                ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-5 relative translate-x-[25px] transition-all duration-1000 activee "
                : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-5 relative "
            }
          >
            Accueil <MdOutlineHome className="text-3xl" />
          </NavLink>
          <div className="mb-8">
            <h3 className="text-gray-400 font-bold text-sm mb-2">ECONOMAT</h3>
            <NavLink
              to="/ingredients"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Ingredients <PiLeaf className="text-3xl" />
            </NavLink>
            <NavLink
              to="/factures"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Factures <BsFileEarmarkBinary className="text-3xl" />
            </NavLink>
            <NavLink
              to="/fournisseurs"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Fournisseurs <MdOutlineMan3 className="text-3xl" />
            </NavLink>
          </div>
          <div className="mb-8">
            <h3 className="text-gray-400 font-bold text-sm mb-2">
              LABORATOIRE
            </h3>
            <NavLink
              to="/recipes"
              onClick={getCoords}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Recettes <BsBook className="text-3xl" />
            </NavLink>
            <NavLink
              to="/produits"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Produits <PiShieldLight className="text-3xl" />
            </NavLink>
          </div>
          <div className="mb-8">
            <h3 className="text-gray-400 font-bold text-sm mb-2">BOUTIQUE</h3>
            <NavLink
              to="/gammes"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Gammes <BsCalendar2 className="text-3xl" />
            </NavLink>
            <NavLink
              to="/Production"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Production <MdOutlineMan4 className="text-3xl" />
            </NavLink>
          </div>
          <div className="mb-8">
            <h3 className="text-gray-400 font-bold text-sm mb-2">BUREAU</h3>
            <NavLink
              to="/Equipe"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Equipe <MdPeopleOutline className="text-3xl" />
            </NavLink>
            <NavLink
              to="/Equipements"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Equipements <BsBox2 className="text-3xl" />
            </NavLink>
            <NavLink
              to="/Analyse"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Analyse <BsBarChart className="text-3xl" />
            </NavLink>
            <NavLink
              to="/Etiquetage"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Etiquetage <BsKey className="text-3xl" />
            </NavLink>
            <NavLink
              to="/Comptabilite"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative translate-x-[25px] transition-all duration-1000 activee "
                  : "text-gray-500 flex gap-3 w-full items-center justify-between font-medium text-base mb-4 relative "
              }
            >
              Comptabilite <BsCalculator className="text-3xl" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
