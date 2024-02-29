import { HeaderComponent } from "pages/landingPage/components";
import { AuthVerifyContainer } from "pages/auth/components";
import { SideBarComponent } from "./sideBar";

export const DashboardContainer = () => {
  return (
    <div className="exporter-dashboard-container">
      {/*========== HEADER =========== */}
      <HeaderComponent />
      {/*========== END OF HEADER =========== */}

      <section className="bg-grey-50" style={{ minHeight: "100vh" }}>
        <div className="h-100 d-flex align-items-center">
          <SideBarComponent />
          <div
            className="right-dashboard bg-grey-50"
            style={{ minHeight: "100vh" }}
          >
            <div
              className="p-md-4 p-2 pb-0 bg-grey-50 h-100"
              style={{ minHeight: "100vh" }}
            >
              <div className="pt-2 h-100">
                <AuthVerifyContainer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
