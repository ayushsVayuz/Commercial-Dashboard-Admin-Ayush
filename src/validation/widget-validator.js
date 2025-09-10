import * as yup from "yup";

export const widgetSchema = yup.object().shape({
  // General
  widgetName: yup.string().required("Widget name is required"),
  widgetType: yup.string().required("Widget type is required"),
  section: yup.string().required("Section is required"),
  groupId: yup.string().required("Group ID is required"),

  // Position
  posX: yup
    .number()
    .typeError("X position must be a number")
    .min(0, "X cannot be negative")
    .nullable(),
  posY: yup
    .number()
    .typeError("Y position must be a number")
    .min(0, "Y cannot be negative")
    .nullable(),
  width: yup
    .number()
    .typeError("Width must be a number")
    .min(1, "Width must be at least 1")
    .max(12, "Width cannot exceed 12")
    .nullable(),
  height: yup
    .number()
    .typeError("Height must be a number")
    .min(1, "Height must be at least 1")
    .max(12, "Height cannot exceed 12")
    .nullable(),

  // Constraints
  minWidth: yup
    .number()
    .typeError("Min width must be a number")
    .min(0)
    .max(12)
    .nullable(),
  maxWidth: yup
    .number()
    .typeError("Max width must be a number")
    .min(yup.ref("minWidth"), "Max width must be greater than Min width")
    .max(12)
    .nullable(),
  draggable: yup.boolean().nullable(),

  // Config
  chartType: yup.string().nullable(),
  dataField: yup.string().nullable(),

  // Styling
  borderColor: yup
    .string()
    .nullable()
    .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, {
      message: "Border color must be a valid hex code",
      excludeEmptyString: true,
    }),
  backgroundColor: yup
    .string()
    .nullable()
    .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, {
      message: "Background color must be a valid hex code",
      excludeEmptyString: true,
    }),

  // Responsive (store as JSON string)
  mobile: yup.string().nullable(),
  tablet: yup.string().nullable(),
  desktop: yup.string().nullable(),
});