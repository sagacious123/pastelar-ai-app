import { Outlet } from "react-router-dom";

export const AuthVerifyContainer = () => {
  return (
    <>
      <Outlet />
    </>
  );

  // return user ? (
  //   isLoading ? (
  //     <PrimaryLoader height={"90vh"} />
  //   ) : (
  //     <Outlet />
  //   )
  // ) : (
  //   <Navigate to="/login" state={{ from: window.location.pathname }} />
  // );
};
