import * as yup from "yup";

export const masterConfigSchema = yup.object().shape({
    key: yup
        .string()
        .required("Key is required")
        .max(100, "Key cannot exceed 100 characters"),
    value: yup
        .string()
        .required("Value is required")
        .max(255, "Value cannot exceed 255 characters"),
    // regex: yup.object()
    // .string()
    // .optional()
    // .test("is-valid-regex", "Please enter a valid regular expression", (value) => {
    //     if (!value) return true; // It's optional
    //     try {
    //         new RegExp(value);
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // }),
});
