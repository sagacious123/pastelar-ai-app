import { createContext, useContext, useState } from "react";
import { default as MaterialModalProvider } from "mui-modal-provider";

export type ModalAuthCategories = "exporter" | "backer";

export interface ModalViewStateProps {
  [x: string]: boolean | { payload?: { [x: string]: any } };
}

export type ModalViewStateKeys = keyof ModalViewStateProps;

type ModalProviderProps = {
  modal: ModalViewStateProps;
  initModal: React.Dispatch<
    React.SetStateAction<ModalViewStateProps | undefined>
  >;
  getModalPayload: (
    category: string,
    campaignId?: string,
    modal?: ModalViewStateProps
  ) => { [x: string]: any };
};

export const ModalProviderContext = createContext<ModalProviderProps>({
  modal: {},
  initModal: () => {},
  getModalPayload: () => ({}),
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [show, setShow] = useState<ModalViewStateProps | undefined>({
    // type: true,
  });

  const getModalPayload = (
    category: string,
    campaignId?: string,
    modal?: ModalViewStateProps
  ) => {
    const thisModal = modal ?? show;
    const returnData: { [x: string]: any } = {};
    if (thisModal && thisModal.hasOwnProperty(category)) {
      if (typeof thisModal[category] !== "boolean") {
        return (thisModal[category] as { payload: { [x: string]: any } })
          .payload;
      }
    }

    return returnData;
  };

  return (
    <ModalProviderContext.Provider
      value={{
        modal: show ?? {},
        initModal: setShow,
        getModalPayload,
      }}
    >
      <MaterialModalProvider>{children}</MaterialModalProvider>
    </ModalProviderContext.Provider>
  );
};

export const useModalProvider = () => useContext(ModalProviderContext);
