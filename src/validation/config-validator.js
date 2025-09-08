// src/validation/configValidator.js
import * as yup from "yup";

// Regular expression to validate domain names
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,11}?$/;

export const configSchema = yup.object().shape({
    key: yup
        .object(),
    // .string()
    // .required("Key is required")
    // .max(100, "Key cannot exceed 100 characters"),
    value: yup
        .string()
        .required("Value is required")
        .max(255, "Value cannot exceed 255 characters"),
    domain: yup
        .object(),
    // .string()
    // .required("Domain is required")
    // .matches(domainRegex, "Please enter a valid domain"),
    // regex: yup
    //     .string()
    //     .optional()
    //     .test(
    //         "is-valid-regex",
    //         "Please enter a valid regular expression",
    //         (value) => {
    //             if (!value) return true; // It's optional
    //             try {
    //                 new RegExp(value);
    //                 return true;
    //             } catch (e) {
    //                 return false;
    //             }
    //         }
    //     ),
});
