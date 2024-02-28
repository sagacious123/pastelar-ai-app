import React from "react";
import { BsCheck2Circle } from "react-icons/bs";

export const Notification = () => {
  return (
    <div className="fixed notification-modal text-center h-full w-full flex flex-col items-center z-10 justify-center">
      {/* <div> */}
      <p className="mb-6 font-medium">Recette ajoutee avec succes</p>
      <BsCheck2Circle className="text-green-700 text-4xl" />
      {/* </div> */}
    </div>
  );
};
