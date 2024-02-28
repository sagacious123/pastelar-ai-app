import { array, object, string } from "yup";

export const UpdateCreatorInfoSchema = () => {
    return object({
        // sample: string().required().label('Sample'),
        content_type: array().of(string().required().label('Context Type')),
        specialization: array().of(string().required().label('Specialization')),
        portfolio_url: string().label('Portfolio URL'),
    });
}
