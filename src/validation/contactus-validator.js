import * as Yup from 'yup';
import { fieldValidation } from './fieldValidation';

export const contactusValidator = Yup.object({
    email: fieldValidation.email,
    name: fieldValidation.name,
    contact: fieldValidation.contact,
    query: fieldValidation.query,
    message: fieldValidation.message
})