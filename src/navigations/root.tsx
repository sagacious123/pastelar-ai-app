// import { AuthBoxedContainer, DashboardBaseViewContainer } from 'containers';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Pages from "pages";
import ScrollToTop from "./ScrollToTop";

export const RootNavigator = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route index path="/" element={<Pages.HomePage />} />

          {/* Auth Routes  */}
          <Route path="/">
            <Route path="login" element={<Pages.LoginPage />} />
          </Route>

          {/* Dashboard Routes  */}
          <Route path="/" element={<Pages.DashboardContainer />}>
            <Route path="home" element={<Pages.DashboardHomePage />} />
            <Route path="recipes" element={<Pages.RecipePage />} />
          </Route>
        </Routes>

        {/* </Suspense> */}
      </ScrollToTop>
    </BrowserRouter>
  );
};
