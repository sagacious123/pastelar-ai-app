import { Notification } from "pages";
import React, { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import { Book } from "./book";

interface AddRecipeModalProps {
  close: any;
}

export const AddRecipeModal: FC<AddRecipeModalProps> = ({ close }) => {
  const [openBook, setOpenBook] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <div className="add-recipe-modal">
      <button onClick={close} className="absolute top-12 right-12">
        <MdClose className="text-4xl" />
      </button>
      <Book
        openBook={openBook}
        setOpenBook={setOpenBook}
        setSuccess={setSuccess}
        close={close}
      />
      {success && <Notification />}
    </div>
  );
};
