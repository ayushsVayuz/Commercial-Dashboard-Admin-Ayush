import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

export const CompanyDetails = ({ control, errors }) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Controller
        name="company.companyName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"Company Name"}
            type={"text"}
            placeholder={"Enter Company Name"}
            errorContent={errors.company?.companyName?.message}
          />
        )}
      />
      <Controller
        name="company.phoneNumber"
        control={control}
        render={({ field }) => (
          <PhoneNumberInput
            {...field}
            label={"Phone Number"}
            country={"in"}
            errorContent={errors.company?.phoneNumber?.message}
          />
        )}
      />
      <Controller
        name="company.companyAddress"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"Company Address"}
            type={"text"}
            placeholder={"Enter Company Address"}
            errorContent={errors.company?.companyAddress?.message}
          />
        )}
      />
      <Controller
        name="company.companyRegistrationNumber"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"Company Registration Number"}
            type={"text"}
            placeholder={"Enter Company Registration Number"}
            errorContent={errors.company?.companyRegistrationNumber?.message}
          />
        )}
      />
      <Controller
        name="company.taxName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"TAX Name"}
            type={"text"}
            placeholder={"Enter Tax Name"}
            errorContent={errors.company?.taxName?.message}
          />
        )}
      />
      <Controller
        name="company.taxNumber"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"TAX Number"}
            type={"text"}
            placeholder={"Enter TAX Number"}
            errorContent={errors.company?.taxNumber?.message}
          />
        )}
      />
    </div>
  );
};
