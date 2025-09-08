import { getMaxContractStartDate, periodToDays } from "../functions";
import * as Yup from "yup";

export const iconSize = 22



const selectOptionSchema = Yup.object().shape({
    value: Yup.number().required("Value is required"),
    label: Yup.string().required("Label is required"),
});

const ownersSchema = Yup.array().of(selectOptionSchema).min(1, "At least one owner is required");
const tenantsSchema = Yup.array().of(selectOptionSchema).min(1, "At least one tenant is required");

export const tenancySetupSchema = Yup.object().shape({
    community: selectOptionSchema.required("Property selection is required"),
    block: selectOptionSchema.required("Block selection is required"),
    ru: selectOptionSchema.required("Unit selection is required"),
    owner: ownersSchema.required("Owners selection is required"),
    tenants: tenantsSchema.required("Tenants selection is required"),
});

// Schema for currency validation
const currencySchema = Yup.object().shape({
    amount: Yup.string().required('Field is required'),
    currency: Yup.string().required('Currency is required')
});
const currencySchemaOptional = Yup.object().shape({
    amount: Yup.string().nullable()
        .default('0'),
    currency: Yup.string().nullable()
        .default('0'),
});

const periodSchema = Yup.number()
    .nullable()
    .default(0)
    .min(0, 'Value must be a non-negative number');

const periodSchemaContract = Yup.number()
    // .nullable()
    .required('Contract Months is Required')
    .min(0, 'Value must be a non-negative number');

// Schema for dates
const dateSchema = Yup.string().required("Date is required").nullable();

const isNumericString = (value) => /^[0-9]*$/.test(value);

// Main schema for lease details
export const leaseDetailsSchema = Yup.object().shape({
    leaseStartDate: dateSchema
        .required("Contract start date is required")
        .nullable()
        .test('max-date', 'Contract start date cannot be more than 8 months from today', (value) => {
            if (value) {
                const maxDate = getMaxContractStartDate();
                return new Date(value) <= maxDate;
            }
            return true;
        }),
    leaseEndDate: dateSchema,
    contractPeriod: periodSchemaContract.required("Contract period is required")
        .test('is-valid', 'Contract period must be less than or equal to 99', function (value) {
            return value <= 99; // Ensure value is within range
        }),
    noticePeriod: periodSchema
        .required("Notice period is required")
        .test('is-valid', 'Notice period must be less than contract period', function (value) {
            const { contractPeriod } = this.parent;
            return value < contractPeriod; // Ensure notice period is less than contract period
        })
        .test('value-range', 'Notice period must be less than or equal to 99', function (value) {
            return value <= 99;
        }),
    lockInPeriod: periodSchema
        .required("Lock-in period is required")
        .test('is-valid', 'Lock-in period must be less than contract period', function (value) {
            const { contractPeriod } = this.parent;
            return value < contractPeriod; // Ensure lock-in period is less than contract period
        })
        .test('value-range', 'Lock-in period must be less than or equal to 99', function (value) {
            return value <= 99;
        }),
    paymentTerm: selectOptionSchema.required("Payment term is required"),
    rentAmount: currencySchema.test('is-numeric', 'Rent amount must be a numeric string', value => isNumericString(value.amount)),
    depositAmount: currencySchemaOptional.test('is-numeric', 'Deposit amount must be a numeric string', value => isNumericString(value.amount)),
    tokenAmount: currencySchemaOptional.test('token-less-than-rent', 'Token amount must be less than rent amount', function (value) {
        const { rentAmount } = this.parent;
        const tokenAmount = value;
        if (rentAmount && tokenAmount) {
            const rent = parseFloat(rentAmount.amount);
            const token = parseFloat(tokenAmount.amount);
            if (isNaN(rent) || isNaN(token)) {
                return true;
            }
            return token < rent;
        }
        return true; // If either is missing, skip the validation
    })
        .test('is-numeric', 'Token amount must be a numeric string', value => isNumericString(value.amount)),
    rentHike: Yup.string().test('is-numeric', 'Rent hike must be a numeric string', value => isNumericString(value))
        .nullable().default('0') // Make rentHike nullable and default to '0'
});





export const propertyOption = [
    { label: "Cedar Ridge Villas    ", value: 9 },
    { label: "Lakeside Haven    ", value: 8 },
    { label: "Hillcrest Meadows    ", value: 7 },
    { label: "Eagle's Nest Retreat    ", value: 6 },
    { label: "Maple Grove Condos    ", value: 5 },
    { label: "Silver Lake Apartments    ", value: 4 },
    { label: "Riverside Heights", value: 3 },
    { label: "Sunnybrook Estates ", value: 2 },
    { label: "Whispering Pines Residences", value: 1 },
    { label: "Oakwood Manor", value: 0 },
];
export const blockOption = [
    { label: "Lakeside Horizon", value: 9 },
    { label: "Lakeside Serenity ", value: 8 },
    { label: "Lakeside Vista   ", value: 7 },
    { label: "Lakeside Summit    ", value: 6 },
    { label: "Lakeside Crest   ", value: 5 },
    { label: "Lakeside Haven   ", value: 4 },
    { label: "Lakeside Reflection", value: 3 },
    { label: "Lakeside Harbor  ", value: 2 },
    { label: "Lakeside Mirage", value: 1 },
    { label: "Lakeside Pinnacle", value: 0 },
];
export const unitOption = [
    { label: "1210", value: 9 },
    { label: "1501", value: 8 },
    { label: "1201", value: 7 },
    { label: "2014", value: 6 },
    { label: "2013", value: 5 },
    { label: "2012", value: 4 },
    { label: "104", value: 3 },
    { label: "103", value: 2 },
    { label: "102", value: 1 },
    { label: "101", value: 0 },
];
export const ownerOption = [
    { label: "Amit Kumar    ", value: 9 },
    { label: "Sneha Patel", value: 8 },
    { label: "Rajesh Sharma", value: 7 },
    { label: "Priya Deshmukh", value: 6 },
    { label: "Ravi Singh", value: 5 },
    { label: "Anita Kapoor", value: 4 },
    { label: "Vikram Mehta", value: 3 },
    { label: "Neelam Agarwal", value: 2 },
    { label: "Rohit Jain", value: 1 },
    { label: "Pooja Rao", value: 0 },
];
export const tenantOption = [
    { label: "Rohit Agarwal", value: 0 },
    { label: "Aarti Sharma", value: 1 },
    { label: "Rajiv Kumar", value: 2 },
    { label: "Sunita Patel", value: 3 },
    { label: "Arjun Gupta", value: 4 },
    { label: "Neha Rao", value: 5 },
    { label: "Sanjay Mehta", value: 6 },
    { label: "Priya Deshmukh", value: 7 },
    { label: "Vikram Singh", value: 8 },
    { label: "Anita Kapoor", value: 9 },
];



export const tenantsArr = [
    {
        tenant_id: 0,
        id_proof_number: "9876543210",
        id_proof_attachment: "id_rohit.jpg",
        is_id_proof_verified: true,
        address_proof_number: "1234567890",
        address_proof_attachment: "address_rohit.jpg",
        is_address_proof_verified: true,
        passport_number: "P123456",
        passport_attachment: "passport_rohit.jpg",
        is_passport_verified: true,
        visa_number: "V12345",
        visa_attachment: "visa_rohit.jpg",
        is_visa_verified: true,
    },
    {
        tenant_id: 1,
        id_proof_number: "8765432109",
        id_proof_attachment: "id_aarti.jpg",
        is_id_proof_verified: true,
        address_proof_number: "2345678901",
        address_proof_attachment: "address_aarti.jpg",
        is_address_proof_verified: true,
        passport_number: "P234567",
        passport_attachment: "passport_aarti.jpg",
        is_passport_verified: true,
        visa_number: "V23456",
        visa_attachment: "visa_aarti.jpg",
        is_visa_verified: true,
    },
    {
        tenant_id: 2,
        id_proof_number: "7654321098",
        id_proof_attachment: "id_rajiv.jpg",
        is_id_proof_verified: false,
        address_proof_number: "3456789012",
        address_proof_attachment: "address_rajiv.jpg",
        is_address_proof_verified: false,
        passport_number: "P345678",
        passport_attachment: "passport_rajiv.jpg",
        is_passport_verified: false,
        visa_number: "V34567",
        visa_attachment: "visa_rajiv.jpg",
        is_visa_verified: false,
    },
    {
        tenant_id: 3,
        id_proof_number: "6543210987",
        id_proof_attachment: "id_sunita.jpg",
        is_id_proof_verified: true,
        address_proof_number: "4567890123",
        address_proof_attachment: "address_sunita.jpg",
        is_address_proof_verified: true,
        passport_number: "P456789",
        passport_attachment: "passport_sunita.jpg",
        is_passport_verified: true,
        visa_number: "V45678",
        visa_attachment: "visa_sunita.jpg",
        is_visa_verified: true,
    },
    {
        tenant_id: 4,
        id_proof_number: "5432109876",
        id_proof_attachment: "id_arjun.jpg",
        is_id_proof_verified: false,
        address_proof_number: "5678901234",
        address_proof_attachment: "address_arjun.jpg",
        is_address_proof_verified: false,
        passport_number: "P567890",
        passport_attachment: "passport_arjun.jpg",
        is_passport_verified: false,
        visa_number: "V56789",
        visa_attachment: "visa_arjun.jpg",
        is_visa_verified: false,
    },
    {
        tenant_id: 5,
        id_proof_number: "4321098765",
        id_proof_attachment: "id_neha.jpg",
        is_id_proof_verified: true,
        address_proof_number: "6789012345",
        address_proof_attachment: "address_neha.jpg",
        is_address_proof_verified: true,
        passport_number: "P678901",
        passport_attachment: "passport_neha.jpg",
        is_passport_verified: true,
        visa_number: "V67890",
        visa_attachment: "visa_neha.jpg",
        is_visa_verified: true,
    },
    {
        tenant_id: 6,
        id_proof_number: "3210987654",
        id_proof_attachment: "id_sanjay.jpg",
        is_id_proof_verified: false,
        address_proof_number: "7890123456",
        address_proof_attachment: "address_sanjay.jpg",
        is_address_proof_verified: false,
        passport_number: "P789012",
        passport_attachment: "passport_sanjay.jpg",
        is_passport_verified: false,
        visa_number: "V78901",
        visa_attachment: "visa_sanjay.jpg",
        is_visa_verified: false,
    },
    {
        tenant_id: 7,
        id_proof_number: "2109876543",
        id_proof_attachment: "id_priya.jpg",
        is_id_proof_verified: true,
        address_proof_number: "8901234567",
        address_proof_attachment: "address_priya.jpg",
        is_address_proof_verified: true,
        passport_number: "P890123",
        passport_attachment: "passport_priya.jpg",
        is_passport_verified: true,
        visa_number: "V89012",
        visa_attachment: "visa_priya.jpg",
        is_visa_verified: true,
    },
    {
        tenant_id: 8,
        id_proof_number: "1098765432",
        id_proof_attachment: "id_vikram.jpg",
        is_id_proof_verified: false,
        address_proof_number: "9012345678",
        address_proof_attachment: "address_vikram.jpg",
        is_address_proof_verified: false,
        passport_number: "P901234",
        passport_attachment: "passport_vikram.jpg",
        is_passport_verified: false,
        visa_number: "V90123",
        visa_attachment: "visa_vikram.jpg",
        is_visa_verified: false,
    },
    {
        tenant_id: 9,
        id_proof_number: "0987654321",
        id_proof_attachment: "id_anita.jpg",
        is_id_proof_verified: true,
        address_proof_number: "0123456789",
        address_proof_attachment: "address_anita.jpg",
        is_address_proof_verified: true,
        passport_number: "P012345",
        passport_attachment: "passport_anita.jpg",
        is_passport_verified: true,
        visa_number: "V01234",
        visa_attachment: "visa_anita.jpg",
        is_visa_verified: true,
    },
];