// Standard URL regex pattern for general URL validation
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

import * as yup from "yup";

export const sectionSchema = yup.object().shape({
  sectionName: yup.string().required("Section name is required"),
  sectionOrder: yup
    .number()
    .typeError("Section order must be a number")
    .required("Section order is required"),
  isCollapsible: yup.boolean().required(),
  backgroundColor: yup.string().nullable(),
  padding: yup.string().nullable(),
  borderRadius: yup.string().nullable(),
  apiEndpoint: yup.string().nullable(),
  requestMethod: yup
    .string()
    .oneOf(["GET", "POST"], "Invalid request method")
    .nullable(),
  refreshInterval: yup
    .number()
    .typeError("Refresh interval must be a number")
    .nullable(),
  params: yup.array().of(
    yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
  ).nullable(),
});
