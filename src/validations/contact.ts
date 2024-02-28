import { object, string } from "yup";

export const ContactSupportSchema = () => {
    return object({
        category: string().required().label('Category'),
        message: string().required().label('Message'),
    });
}