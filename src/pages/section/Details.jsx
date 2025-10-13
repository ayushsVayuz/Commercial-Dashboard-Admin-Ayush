import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { decrypt } from "../../functions";
import { readSingleSection } from "../../redux/actions/section-action";
import { CardWrapper } from "../../components/wrappers/card";
import DNDGridLayout from "./components/DNDGridLayout";

const SectionDetails = () => {
  const [widgetPositions, setWidgetPositions] = useState([]);

  const { singleSection, loading } = useSelector((state) => state.section);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readSingleSection({ id: id }));
  }, [id, dispatch]);

  return (
    <>
      <section className="flex flex-col">
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
            <CardWrapper>
              <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
                {singleSection?.name}
              </h5>
              {/* <p className="font-medium text-base dark:text-gray-200">
                Section Order - {singleSection?.order_index}
              </p> */}
            </CardWrapper>
            <CardWrapper title="Widgets">
              <DNDGridLayout
                data={singleSection?.widgets}
                widgetPositions={widgetPositions}
                setWidgetPositions={setWidgetPositions}
                isDraggable={false}
                isResizable={false}
              />
            </CardWrapper>
            {/* <CardWrapper title="General">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Is Collapsible",
                  <span>{singleSection?.is_collapsible ? "Yes" : "No"}</span>
                )}
                {RenderLableValue(
                  "Is Collapsed",
                  <span>{singleSection?.is_collapsed ? "Yes" : "No"}</span>
                )}
              </div>
            </CardWrapper> */}
            {/* <CardWrapper title="Configuration">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Padding",
                  <span>{singleSection?.section_config?.padding}</span>
                )}
                {RenderLableValue(
                  "Border Radius",
                  <span>{singleSection?.section_config?.borderRadius}</span>
                )}
                {RenderLableValue(
                  "Background Color",
                  <span>{singleSection?.section_config?.backgroundColor}</span>
                )}
              </div>
            </CardWrapper> */}
            {/* <CardWrapper title="API Configuration">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "API Endpoint",
                  <span>{singleSection?.api_endpoint}</span>
                )}
                {RenderLableValue(
                  "Method",
                  <span>{singleSection?.method}</span>
                )}
                {RenderLableValue(
                  "Response Type",
                  <span>{singleSection?.response_type ?? "N/A"}</span>
                )}
                {RenderLableValue(
                  "Refresh Interval",
                  <span>{singleSection?.refresh_interval}</span>
                )}
              </div>
            </CardWrapper> */}
          </div>
        ) : (
          <div>NO DATA FOUND</div>
        )}
      </section>
    </>
  );
};

export default SectionDetails;
