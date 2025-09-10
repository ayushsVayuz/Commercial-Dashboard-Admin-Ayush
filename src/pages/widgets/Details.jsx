import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { decrypt } from "../../functions";
import { readSingleWidget } from "../../redux/actions/widgets-action";
import { CardWrapper } from "../../components/wrappers/card";

const WidgetDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleWidget, loading } = useSelector((state) => state.widget);

  useEffect(() => {
    dispatch(readSingleWidget({ id: id }));
  }, [id, dispatch]);

  // Log to check domain data
  console.log(singleWidget, "singleWidget data");

  return (
    <>
      <section className="flex flex-col">
        <MetaTitle title={"Widget Detail | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/section"
            parent="Widget"
            mainTitle="Widget Details"
          />
        </div>

        {loading ? (
          <TableShimmer />
        ) : singleWidget ? (
          <div className="w-full md:w-[100%] flex flex-col">
            <CardWrapper>
              <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
                {singleWidget?.name}
              </h5>
              <p className="font-medium text-base dark:text-gray-200">
                Widget Type - {singleWidget?.type}
              </p>
              <p className="font-medium text-base dark:text-gray-200">
                Section - {singleWidget?.section?.name}
              </p>
            </CardWrapper>

            <CardWrapper title="Position">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "X",
                  <span>{singleWidget?.position?.x}</span>
                )}
                {RenderLableValue(
                  "Y",
                  <span>{singleWidget?.position?.y}</span>
                )}
                {RenderLableValue(
                  "Width",
                  <span>{singleWidget?.position?.w}</span>
                )}
                {RenderLableValue(
                  "Height",
                  <span>{singleWidget?.position?.h}</span>
                )}
              </div>
            </CardWrapper>

            <CardWrapper title="Constraints">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Min Width",
                  <span>{singleWidget?.constraints?.minWidth}</span>
                )}
                {RenderLableValue(
                  "Max Width",
                  <span>{singleWidget?.constraints?.maxWidth}</span>
                )}
                {RenderLableValue(
                  "Draggable",
                  <span>
                    {singleWidget?.constraints?.draggable ? "Yes" : "No"}
                  </span>
                )}
              </div>
            </CardWrapper>

            <CardWrapper title="Configuration">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Chart Type",
                  <span>{singleWidget?.config?.chartType}</span>
                )}
                {RenderLableValue(
                  "Group ID",
                  <span>{singleWidget?.group_id}</span>
                )}
                {RenderLableValue(
                  "Data Field",
                  <span>{singleWidget?.response_mapping?.dataField}</span>
                )}
              </div>
            </CardWrapper>

            <CardWrapper title="Styling">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Border Color",
                  <span>{singleWidget?.styling?.borderColor}</span>
                )}
                {RenderLableValue(
                  "Background Color",
                  <span>{singleWidget?.styling?.backgroundColor}</span>
                )}
              </div>
            </CardWrapper>

            <CardWrapper title="Responsive Settings">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Mobile",
                  <span>
                    {Object.keys(singleWidget?.responsive?.mobile || {})
                      .length > 0
                      ? "Configured"
                      : "N/A"}
                  </span>
                )}
                {RenderLableValue(
                  "Tablet",
                  <span>
                    {Object.keys(singleWidget?.responsive?.tablet || {})
                      .length > 0
                      ? "Configured"
                      : "N/A"}
                  </span>
                )}
                {RenderLableValue(
                  "Desktop",
                  <span>
                    {Object.keys(singleWidget?.responsive?.desktop || {})
                      .length > 0
                      ? "Configured"
                      : "N/A"}
                  </span>
                )}
              </div>
            </CardWrapper>
          </div>
        ) : (
          <div>NO DATA FOUND</div>
        )}
      </section>
    </>
  );
};

export default WidgetDetails;
