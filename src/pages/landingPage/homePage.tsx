/* eslint-disable no-lone-blocks */
import { FooterComponent, HeaderComponent } from "./components";
import { PrimaryButton } from "components/buttons";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/recipes");
  }, [navigate]);

  return (
    <div style={{ paddingTop: "84px" }}>
      {/*========== HEADER =========== */}
      <HeaderComponent />
      {/*========== END OF HEADER =========== */}

      <section>
        <div className="container">
          <h3 className="my-4">HOME</h3>
          <PrimaryButton className="btn-lg primary-btn me-3">
            <Link to="/login">Log In</Link>
          </PrimaryButton>
        </div>
        <div className="row align-items-center justify-content-between"></div>
      </section>

      {/*========== FOOTER =========== */}
      <FooterComponent />
      {/*========== END OF FOOTER =========== */}
    </div>
  );
};
