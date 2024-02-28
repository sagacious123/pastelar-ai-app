import { object, string } from "yup";

export const CreateCollectionValidationSchema = () => {
  return object({
    name: string().required().label("Collection name is required"),
  });
};