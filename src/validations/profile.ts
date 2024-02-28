import { array, mixed, object, string } from "yup";

export const CreatePersonalDetailsValidationSchema = () => {
  return object({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    email: string().email("Enter a valid email address").required("Email Address is required"),
    phoneNumber: string().required("Phone number is required").min(5),
    dateOfBirth: string(),
    sex: string(),
  });
};

export const CreateContactAddressValidationSchema = () => {
  return object({
    country: string().required("*Country of Residence is required"),
    state: string().required("*Your State is required"),
    city: string(),
    lga: string(),
    postalCode: string(),
    address: string().required("*Your home address is required"),
  });
};
export const ChangeProfileInfoValidationSchema = () => {
  return object({
    request: string().required(
      "Request must be one of the following values: name, dateOfBirth, gender, address, exportCertificate"
    ),
    reason: string().required(
      "Reason must be one of the following values: relocation, error during registration, legal change"
    ),
  });
};

export const VerifyIdentityValidationSchema = () => {
  return object({
    identificationMode: string(),
    // identificationUrl: string().required("ID card is required"),
    // utilityBillUrl: string().required("Utility bill is required"),
    bvn: string().required("BVN is required").min(11).max(11),
  });
};

export const CreateBusinessDetailsValidationSchema = () => {
  return object({
    exportGoodType: string().required("Type of good is required"),
    TIN: string().required("TIN is required").min(9).max(9),
    yearsInExport: string(),
    exportFrequency: string(),
    countriesOfExport: array(),
    CACRegNo: string()
      .label("CAC Registration Number")
      .required("CAC registration number is required")
      .matches(/^(BN|RC)-[0-9]{5,7}$/, "Invalid CAC registration number format"),
    businessName: string().required("Business Name is required").min(3),
    // exportRegCertificateUrl: string().required("ERC is required"),
  });
};

export const FileUploadSchema = object().shape({
  file: mixed().test("fileSize", "File size is too large", (value: any) => value && value.size <= 10485760),
});

export const EditPasswordValidationSchema = () => {
  return object({
    current_paasword: string().required().label("Current Password"),
    password: string().min(8, "Password must be minimum 8 characters long.").required().label("New Password"),
    confirm_password: string()
      .required()
      .label("Confirm Password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });
};

export const EditProfileValidationSchema = () => {
  return object({
    first_name: string().required().label("First Name"),
    last_name: string().required().label("Last Name"),
    username: string().min(5).label("Username"),
  });
};
