import * as Yup from 'yup';

// Standard URL regex pattern for general URL validation
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export const domainSchema = Yup.object().shape({
    domainName: Yup.string()
        .required("Domain Name is required")
        .max(100, "Domain Name cannot exceed 100 characters")
        .matches(/^[a-zA-Z0-9.-]+$/, "Domain Name can only contain letters, numbers, dots, and hyphens"),

    url: Yup.string()
        .required("URL is required")
        .matches(urlRegex, "URL must be a valid format (e.g., https://example.com)"),
});
