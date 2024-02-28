import { Switch } from "@chakra-ui/react";
import { IngredientsList, Notification } from "pages";
import React, { FC, useState } from "react";
import { BsCaretRightFill, BsPlusCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";

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
      <div className="book h-[66vh] max-w-[960px] w-[90%] flex justify-end">
        <div
          className={`book-cover bg-white pl-16 pr-8 py-6 h-full w-[50%] rounded-3xl shadow-lg ${
            openBook ? "open" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <select
              name=""
              id=""
              className="bg-gray-200 rounded-2xl py-1 px-2 mb-14"
            >
              <option value="categorie">Categorie</option>
            </select>
            <input
              type="text"
              className="border-b border-solid border-gray-500 w-[70%]"
              placeholder="Nom"
            />
            <div className="flex items-center gap-3 my-10">
              <Switch colorScheme="green" id="toggle" />
              <label htmlFor="toggle" className="text-gray-400">
                Recette utilisee dans d'autres recettes
              </label>
            </div>
            <div>
              <label htmlFor="" className="text-gray-300">
                Conservation
              </label>
              <div className="flex justify-center gap-3 mb-6 mt-3">
                <input
                  type="number"
                  name=""
                  placeholder="3"
                  id=""
                  className=" w-5"
                />
                <select
                  name=""
                  id=""
                  className="bg-gray-200 rounded-2xl py-1 px-2"
                >
                  <option value="unite">Unite</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="notes">Notes</label>
              <textarea
                name=""
                id="notes"
                // cols={30}
                rows={6}
                className="w-full bg-gray-100 resize-none"
              ></textarea>
            </div>
            <button className="border-2 border-solid border-gray-500 rounded-2xl px-5 mt-6">
              Annuler
            </button>
          </div>
          <span className="flex justify-end mt-3">
            <button onClick={() => setOpenBook(!openBook)}>
              <BsCaretRightFill />
            </button>
          </span>
          <div className="cover-back-content relative pt-5">
            <div className="text-center">
              <h5>Ingredients</h5>
              <input
                type="text"
                className="bg-gray-100 w-[60%] rounded-2xl mt-2 px-4"
              />
            </div>
            <div className="mt-9 flex justify-center">
              <IngredientsList />
              <div>
                <h6 className="font-semibold text-gray-400 mb-3">Cout</h6>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-gray-300">0.23€</p>
                  <MdClose className="text-red-700" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 flex flex-col text-center justify-center items-center w-full">
              <p className="text-gray-400 font-medium text-sm">Cout au kg</p>
              <h6 className="text-gray-500 font-semibold text-sm">3.56€</h6>
            </div>
          </div>
        </div>
        <div className="book-content relative bg-white pl-16 pr-8 py-5 h-full w-[50%] rounded-3xl shadow-lg">
          <div className="text-center mb-4">
            <h5 className="font-semibold text-gray-500">Pate a choux</h5>
            <p>Procede</p>
          </div>
          <div>
            {["1", "2", "3", "4"].map((item) => (
              <div key={item} className="flex items-center w-full gap-2 mb-2">
                <label
                  htmlFor={item}
                  className="bg-gray-100 text-sm text-gray-500 h-6 w-6 rounded-full flex items-center justify-center"
                >
                  {item}
                </label>
                <input
                  type="text"
                  id={item}
                  className="bg-gray-100 h-8 rounded-2xl flex-grow px-4 text-sm"
                />
              </div>
            ))}
            <div className="flex justify-center mt-5">
              <button>
                <BsPlusCircle className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 flex items-center justify-center gap-7 w-full">
            <button className="border-2 border-solid border-gray-500 rounded-2xl px-5">
              Annuler
            </button>
            <button
              onClick={() => {
                setSuccess(true);
                setTimeout(() => {
                  setSuccess(false);
                  close();
                }, 2000);
              }}
              className="border-2 border-solid border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all rounded-2xl px-5"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
      {success && <Notification />}
    </div>
  );
};
