import { createContext, useContext, useState } from "react";
import Loading from "react-fullscreen-loading";
import { PageNotificationProvider } from "./pageNotificationProvider";
import { ModalProvider } from "./modalProvider";

export type CurrentDahboardType = "exporter" | "backer";

type GeneralAppProviderProv = {
  currentDashboard: CurrentDahboardType;
  setCurrentDashboard: (currentDashboard: CurrentDahboardType) => void;
  setFullScreenLoading: (status: boolean) => void;
  setTransparentScreenLoading: (status: boolean) => void;
  primaryLoading: boolean;
  setPrimaryLoading: (status: boolean) => void;
};

export const GeneralAppProviderContext = createContext<GeneralAppProviderProv>({
  currentDashboard: "exporter",
  setCurrentDashboard: () => {},
  setFullScreenLoading: () => {},
  setTransparentScreenLoading: () => {},
  primaryLoading: false,
  setPrimaryLoading: () => {},
});

export const GeneralAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDashboard, setCurrentDashboard] = useState<CurrentDahboardType>("exporter");
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const [transparentScreenLoading, setTransparentScreenLoading] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  return (
    <GeneralAppProviderContext.Provider
      value={{
        currentDashboard,
        setCurrentDashboard,
        setFullScreenLoading,
        setTransparentScreenLoading,
        primaryLoading,
        setPrimaryLoading,
      }}
    >
      <PageNotificationProvider>
        <ModalProvider>
          <Loading
            loading={fullScreenLoading}
            background='#fff'
            loaderColor='#2f8132'
            style={{ zIndex: 999999, height: "100vh" }}
            zIndex={99999}
          />
          <Loading
            loading={transparentScreenLoading}
            background='rgba(0, 0, 0, 0.4)'
            loaderColor='#2f8132'
            style={{ zIndex: 999999, height: "100vh" }}
          />
          {children}
        </ModalProvider>
      </PageNotificationProvider>
    </GeneralAppProviderContext.Provider>
  );
};

export const useGeneralAppProvider = () => useContext(GeneralAppProviderContext);
