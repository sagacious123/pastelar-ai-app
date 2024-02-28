import { object, string } from "yup";

export const UpdateBillingInfoSchema = () => {
    return object({
        country: string().required().label('Country'),
        state: string().required().label('State'),
        city: string().required().label('City'),
        address: string().required().label('Address'),
    });
}
