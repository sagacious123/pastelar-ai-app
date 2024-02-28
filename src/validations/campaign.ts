import { number, object, string, date, bool } from "yup";

export const CampaignInformationValidationSchema = () => {
  return object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    exportingCountry: string().required("Exporting country is required"),
  });
};

export const CampaignGoalsValidationSchema = () => {
  return object({
    fundingGoal: string().required("Funding goal is required"),
    // minimumAmount: string().when("fundingGoal", (fundingGoal, schema) => {
    //   return schema.test({
    //     name: "lessThanFundingGoal",
    //     message: "Minimum amount must be less than funding goal",
    //     test: (value) => {
    //       const cleanMinimumAmount = Number(value?.replace(/,/g, ""));
    //       const cleanFundingGoal = Number(
    //         String(fundingGoal).replace(/,/g, "")
    //       );
    //       return cleanMinimumAmount < cleanFundingGoal;
    //     },
    //   });
    // }),
    interestRate: number()
      .min(3, "Interest rate must be at least 3")
      .max(15, "Interest rate must be at most 15")
      .required("Interest rate is required"),
    reward: string().required("Reward is required"),
    campaignEndDate: date().required("Campaign End Date is required"),
    termsAndConditions: bool()
      .oneOf([true], "")
      .required("You must agree with the terms and conditions"),
  });
};
