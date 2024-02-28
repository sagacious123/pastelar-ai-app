import { PrimaryInputProp } from "components/inputs";
import { useState } from "react";
import { PrimaryInput } from "../inputs/default";
import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi";

export const CustomPasswordInput = ({ ...rest }: PrimaryInputProp) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PrimaryInput
      type={showPassword ? "text" : "password"}
      rightComponentProps={{
        className: "touchable text-muted h-auto py-0 password-input-icon",
      }}
      rightComponent={
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <PiEyeLight size={24} />
          ) : (
            <PiEyeClosedLight size={24} />
          )}
        </div>
      }
      {...rest}
    />
  );
};
