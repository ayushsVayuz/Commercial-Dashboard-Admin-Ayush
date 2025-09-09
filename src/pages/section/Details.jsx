import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { decrypt } from "../../functions";
import { readSingleSection } from "../../redux/actions/section-action";

const SectionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleSection, loading } = useSelector((state) => state.section);

  useEffect(() => {
    dispatch(readSingleSection({ id: id }));
  }, [id, dispatch]);

  // Log to check domain data
  console.log(singleSection, "singleSection data");

  return (
    <>
      <section className="flex flex-col gap-4 dark:h-screen">
        <MetaTitle title={"Section Detail | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/section"
            parent="Section"
            mainTitle="Section Details"
          />
        </div>

        {loading ? (
          <TableShimmer />
        ) : singleSection ? (
          <div className="w-full md:w-[100%] flex flex-col">
            {/* Domain Details */}
            <div className="card bg-white dark:bg-slate-800 p-4 ">
              <div className="flex items-center justify-between">
                <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                  Section Detail
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue("Section Name", <span>{singleSection?.name}</span>)}
                {RenderLableValue("Section Order", <span>{singleSection?.order_index}</span>)}
                {RenderLableValue(
                  "Status",
                  <span>{singleSection?.isActive ? "Active" : "Inactive"}</span>
                )}
                {RenderLableValue(
                  "Link",
                  <span>{singleSection?.domainLink}</span>
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
