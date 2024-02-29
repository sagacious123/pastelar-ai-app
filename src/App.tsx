import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { RootNavigator } from "./navigations";
import { ChakraProviderLoader, GeneralAppProvider } from "./providers";

function App() {
  return (
    <ChakraProviderLoader>
      <GeneralAppProvider>
        <RootNavigator />
        <ToastContainer />
      </GeneralAppProvider>
    </ChakraProviderLoader>
  );
}

export default App;
