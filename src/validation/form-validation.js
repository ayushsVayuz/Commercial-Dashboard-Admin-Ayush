import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  friendlyName: Yup.string()
    .required("Friendly Name is required")
    .max(50, "Friendly Name cannot exceed 50 characters")
    .matches(
      /^(?!.* {2})[a-zA-Z0-9.-]+( [a-zA-Z0-9.-]+)*$/,
      "Friendly Name can only contain letters, numbers, dots, hyphens, and a single space between words"
    ),

  uniqueId: Yup.string()
    .required("Unique ID is required")
    .max(20, "Unique ID cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Unique ID can only contain letters, numbers, and underscores"
    ), // Alphanumeric characters only

  keys: Yup.array().min(1, "At least one key is required"),
});

export const formMappingSchema = Yup.object().shape({
  formId: Yup.string().required("form Id is required"),
  domainId: Yup.array(),
  keys: Yup.array().min(1, "At least one key is required"),
});
