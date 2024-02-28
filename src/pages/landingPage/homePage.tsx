/* eslint-disable no-lone-blocks */
import { FooterComponent, HeaderComponent } from "./components";
import { PrimaryButton } from "components/buttons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [hamburger, setHamburger] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/recipes");
  }, [navigate]);

  return (
    <div style={{ paddingTop: "84px" }}>
      {/*========== HEADER =========== */}
      <HeaderComponent hamburger={hamburger} setHamburger={setHamburger} />
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

{
  /* <PrimaryInput
  // disabled={d}
  type="email"
  leftAddon={"http://"}
  leftAddonProps={{
    className: `primary-input-addon ${d ? "disabled-input" : ""}`,
  }}
  // error={d}
  // leftComponent={<Icon />}
  // leftComponentProps={{
  //   className: "primary-input-component",
  // }}
  rightComponent={<BsFillCalendar2Fill />}
  rightComponentProps={{
    className: "primary-input-component",
  }}
/>; */
}
