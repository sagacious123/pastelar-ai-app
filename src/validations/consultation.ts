import { object, string } from "yup";

export const CreateConsultationValidationSchema = () => {
  return object({
    name: string().required().label("Email address"),
  });
};