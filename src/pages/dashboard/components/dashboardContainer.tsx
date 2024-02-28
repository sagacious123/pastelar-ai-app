import { HeaderComponent } from "pages/landingPage/components";
// import { CreatorSideBarComponent } from "../components";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthVerifyContainer } from "pages/auth/components";
import { useAuth } from "store/auth";
import { SideBarComponent } from "./sideBar";
import { useGetProfileInformationQuery } from "store/profile";

export const DashboardContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const match = useMatch("/exporter/*");
  const page = match ? match.params["*"] : undefined;
  const [active, setActive] = useState(false);
  const width = window.innerWidth;
  const { data: profileInfo, error } = useGetProfileInformationQuery();

  useEffect(() => {
    if (width > 1000) {
      setActive(false);
    }
  }, [width]);

  useEffect(() => {
    if (user?.role === "backer") {
      navigate("/backer/dashboard");
    }
  }, [navigate, user?.role]);

  return (
    <div className='exporter-dashboard-container'>
      {/*========== HEADER =========== */}
      <HeaderComponent hamburger={isOpen} setHamburger={setIsOpen} profileInfo={profileInfo} error={error} />
      {/*========== END OF HEADER =========== */}

      <section className='bg-grey-50' style={{ minHeight: "100vh" }}>
        <div className='h-100 d-flex align-items-center'>
          {/* <button
              onClick={() => setActive(!active)}
              className="exporter-menu-btn my-4"
            >
              <HiMenuAlt2 className="header-menu-icon" />
            </button> */}
          <SideBarComponent
            page={page}
            active={active}
            width={width}
            close={setIsOpen}
            className={`${!isOpen && "d-none d-md-block"}`}
            profileInfo={profileInfo}
          />
          {/* </div> */}
          <div className='right-dashboard bg-grey-50' style={{ minHeight: "100vh" }}>
            <div className='p-md-4 p-2 pb-0 bg-grey-50 h-100' style={{ minHeight: "100vh" }}>
              <div className='pt-2 h-100'>
                {/* <Outlet /> */}
                <AuthVerifyContainer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
