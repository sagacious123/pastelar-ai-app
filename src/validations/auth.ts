import { number, object, ref, string } from "yup";

export const LoginValidationSchema = () => {
  return object({
    email: string().email().required().label("Email address"),
    password: string().required("Password is required"),
    // rememberMe: boolean(),
  });
};

export const RegisterValidationSchema = () => {
  return object({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    email: string().email("Enter a valid email address").required("Email Address is required"),
    password: string()
      .min(8, "Password must be minimum 8 characters long.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
      )
      .required("Password is required"),
    // confirmPassword: string()
    //   .required("Confirm Password is required")
    //   .oneOf([ref("password"), ""], "Passwords must match"),
    role: string().required("Category is required"),
  });
};

export const VerifyEmailValidationSchema = () => {
  return object({
    code: string().min(6, "Code is minimum of 6 digits").required("Code is required"),
  });
};

export const ForgotValidationSchema = () => {
  return object({
    email: string()
      .email("Invalid email address")
      .required("Email address is required")
      .label("Email address"),
  });
};

export const ResetPasswordValidationSchema = () => {
  return object({
    newPassword: string()
      .min(8, "Password must be minimum 8 characters long.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
      )
      .required("Password is required"),
    confirmPassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("newPassword"), ""], "Passwords must match"),
  });
};

export const ChangePasswordValidationSchema = () => {
  return object({
    password: string().required("Current Password is required"),

    newPassword: string()
      .min(8, "New Password must be minimum 8 characters long.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/,
        "New Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
      )
      .notOneOf([ref("currentPassword")], "New Password must be different from the Current Password.")
      .required("New Password is required"),

    confirmPassword: string()
      .required("Confirm New Password is required")
      .oneOf([ref("newPassword"), ""], "New Passwords must match"),
  });
};

export const AccountTypeValidationSchema = () => {
  return object({
    account_type: string().required("Email address is required").label("Account type"),
  });
};

export const PasswordValidationSchema = () => {
  return object({
    password: string().required("Password input is incorrect"),
  });
};

export const PhoneValidationSchema = () => {
  return object({
    phoneNumber: string()
      // .trim()
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .required("Phone number is required"),
  });
};

export const EmailValidationSchema = () => {
  return object({
    email: string()
      .email("Invalid email address")
      .required("Email address is required")
      .label("Email address"),
  });
};

export const CreatePinValidationSchema = () => {
  return object({
    pin: string()
      .matches(/^\d{4}$/, "PIN must be 4 numerical digits.")
      .required("PIN is required"),
    confirmPin: string()
      .required("Confirm PIN is required")
      .oneOf([ref("pin"), ""], "PINs must match"),
  });
};

export const AccountInfoValidationSchema = () => {
  return object({
    accountNumber: number()
      .required("Account Number is required")
      .integer("Account Number must be a valid number"),
    accountName: string()
      .required("Account Name is required")
      .matches(/^[^\d]*$/, "Account Name cannot contain numbers"),
  });
};
