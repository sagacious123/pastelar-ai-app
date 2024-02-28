import { number, object, string } from "yup";

export const AddTemplateRatingSchema = () => {
    return object({
        template: string().required().label('Templete'),
        rating: number().required().label('Rating'),
        review: string().label('Review'),
    });
}
