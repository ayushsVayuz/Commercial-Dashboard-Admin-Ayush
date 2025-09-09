import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { decrypt } from "../../functions";
import { readSection } from "../../redux/actions/section-action";

const SectionDetails = () => {
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const dispatch = useDispatch();
  const { domains, loading } = useSelector((state) => state.domain);

  useEffect(() => {
    dispatch(readSection([{ field: "domainId", value: decryptedId }]));
  }, [decryptedId, dispatch]);

  // Log to check domain data
  console.log(domains, "domains data");

  return (
    <>
      <section className="flex flex-col gap-4 dark:h-screen">
        <MetaTitle title={"Domain View | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/domain"
            parent="Domain"
            mainTitle="Domain View Page"
          />
        </div>

        {loading ? (
          <TableShimmer />
        ) : domains?.length > 0 ? (
          <div className="w-full md:w-[100%] flex flex-col">
            {/* Domain Details */}
            <div className="card bg-white dark:bg-slate-800 p-4 ">
              <div className="flex items-center justify-between">
                <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                  Domain Details
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue("Id", <span>{domains[0]?.domainId}</span>)}
                {RenderLableValue("Domain", <span>{domains[0]?.domain}</span>)}
                {RenderLableValue(
                  "Status",
                  <span>{domains[0]?.isActive ? "Active" : "Inactive"}</span>
                )}
                {RenderLableValue(
                  "Link",
                  <span>{domains[0]?.domainLink}</span>
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

export default SectionDetails;
