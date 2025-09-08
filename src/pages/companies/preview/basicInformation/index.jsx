export const BasicInformation = ({ company }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex flex-col gap-1">
        {RenderLableValue("Company Name", company.companyName)}
        {RenderLableValue("Phone Number", company.phoneNumber)}
        {RenderLableValue("Company Address", company.companyAddress)}
        {RenderLableValue(
          "Company Registration Number",
          company.companyRegistrationNumber
        )}
        {RenderLableValue("TAX Name", company.taxName)}
        {RenderLableValue("TAX Number", company.taxNumber)}
      </div>
    </div>
  );
};

export const RenderLableValue = (label, value) => (
  <p className="font-medium">
    <span className="text-[#6C6C6C]">{label}:</span>{" "}
    <span className="text-[#271E4A]">{value}</span>
  </p>
);
