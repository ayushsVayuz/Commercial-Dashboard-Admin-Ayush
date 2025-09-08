import * as Yup from "yup";

export const helperMfSchema = Yup.object().shape({
  containerId: Yup.string().required("Container Id is required"),
  type: Yup.object()
    .shape({
      label: Yup.string().required("Type label is required"),
      value: Yup.string().required("Type value is required"),
    })
    .nullable()
    .required("Type is required"),
  bundleURLs: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string()
          .url("Invalid URL format")
          .required("Bundle URL is required"),
      })
    )
    .min(1, "At least one bundle URL is required"),
});
