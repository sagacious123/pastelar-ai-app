import { object, string } from "yup";

export const NewsletterSubscribeSchema = () => {
    return object({
        email: string().email().required("Email address is required").label('Email address'),
    });
}
