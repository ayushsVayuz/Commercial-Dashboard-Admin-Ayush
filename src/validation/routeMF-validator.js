// src/validation/routeMFValidator.js
import * as yup from "yup";

// Regular expression to validate domain names
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,11}?$/;

const generateBundleLinkSchema = (count) => {
    const schema = {};
    for (let i = 0; i < count; i++) {
        schema[`bundleLink${i}`] = yup.string().url().required(`Bundle Link ${i + 1} is required`);
    }
    return schema;
};

export const routeMFSchema = (bundleCount) => yup.object().shape({
    route: yup.string().required("Route is required"),
    containerId: yup.string().required("Container ID is required"),
    domain: yup.object().required("Domain is required").nullable(),
    ...generateBundleLinkSchema(bundleCount)
});

