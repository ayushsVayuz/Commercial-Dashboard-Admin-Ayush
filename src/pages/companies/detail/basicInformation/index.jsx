import { Link } from "react-router-dom";
import { RenderLableValue } from "../../../../components/labels";
import { CardWrapper } from "../../../../components/wrappers/card";

export const BasicInformation = ({ company }) => {

  console.log(company, "dsafasdf");
  
  return (
    <div className="mb-12">
      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[25%]">
          <div className="card bg-white dark:bg-slate-800 p-4">
            <p className="mb-2 text-lg font-semibold dark:text-gray-200">
              Company Details
            </p>
            <Link
              to={`/unit-detail`}
              className="font-semibold text-2xl text-primaryText dark:text-white hover:text-primaryBg"
            >
              {company?.property || "Company Name"}
            </Link>
            <Link
              to={`/property-detail`}
              className="mt-2 font-medium text-base dark:text-gray-200"
            >
              {company?.type || "Company Type"}
            </Link>
            <div className="mt- flex items-start">
              <p className="dark:text-gray-400 text-sm">
                {company?.city || "Company Address"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[75%] flex flex-col">
          <CardWrapper title={"Company Description"}>
            <p class="text-[#6C6C6C]">{company?.description}</p>
          </CardWrapper>
          <CardWrapper title={"Company Address"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {RenderLableValue("Locality", company?.locality)}
              {RenderLableValue("City", company?.city)}
              {RenderLableValue("Address", company?.address)}
              {RenderLableValue("Country", company?.country)}
            </div>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};
