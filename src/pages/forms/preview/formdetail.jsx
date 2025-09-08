import React from "react";
import { Heading } from "../../../components/heading";

const Formdetail = () => {
  return (
    <>
      <section className="flex flex-col gap-4 dark:h-screen">
        <MetaTitle title={"Route Master form View | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading sectionLink="/formlisting" parent="Master form view" mainTitle="Regex View" />
        </div>
        {loading ? (
          <TableShimmer />
        ) : regex?.length > 0 ? (
          <div className="w-full md:w-[100%] flex flex-col">
            {/* Domain Details */}
            <div className="card bg-white dark:bg-slate-800 p-4 ">
              <div className="flex items-center justify-between">
                <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                  Master form View{" "}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Id"
                  //   <span>{regex[0].routeMicroFrontendMappingId}</span>
                )}
                {RenderLableValue(
                  "Route"
                  // <span>{mfMappings[0].route}</span>
                )}
                {RenderLableValue(
                  "Status"
                  //   <span>{mfMappings[0].isActive ? "Active" : "False"}</span>
                )}
                {RenderLableValue(
                  "Container Id"
                  //   <span>{mfMappings[0].containerId}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>NO DATA FOUND</div>
        )}
      </section>
    </>
  );
};

export default Formdetail;