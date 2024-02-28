import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { initInterceptors } from "utilities";
import { RootNavigator } from "./navigations";
import { ChakraProviderLoader, GeneralAppProvider } from "./providers";

// initialize axios intercepetor, runs faster before any component is mounted
initInterceptors();

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
