import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { fetchMasterConfigs } from "../../redux/actions/master-config-actions";
import { fetchMFMappings } from "../../redux/actions/routeMF-actions";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { decrypt } from "../../functions";

const RouteMFViewPage = () => {
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const dispatch = useDispatch();
  const { mfMappings, error, loading } = useSelector(
    (state) => state.mfMapping
  );
  console.log(mfMappings);
  useEffect(() => {
    dispatch(
      fetchMFMappings([
        { field: "routeMicroFrontendMappingId", value: decryptedId },
      ])
    );
  }, [decryptedId]);

  return (
    <>
      <section className="flex flex-col gap-4 dark:h-screen">
        <MetaTitle title={"Route MF View | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/routemf"
            parent="RouteMF"
            mainTitle="RouteMF View"
          />
        </div>

        {loading ? (
          <TableShimmer />
        ) : mfMappings?.length > 0 ? (
          <div className="w-full md:w-[100%] flex flex-col">
            {/* Domain Details */}
            <div className="card bg-white dark:bg-slate-800 p-4 ">
              <div className="flex items-center justify-between">
                <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                  RouteMF View{" "}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Id",
                  <span>{mfMappings[0].routeMicroFrontendMappingId}</span>
                )}
                {RenderLableValue("Route", <span>{mfMappings[0].route}</span>)}
                {RenderLableValue(
                  "Status",
                  <span>{mfMappings[0].isActive ? "Active" : "False"}</span>
                )}
                {RenderLableValue(
                  "Container Id",
                  <span>{mfMappings[0].containerId}</span>
                )}
                {mfMappings[0].helperIds.length > 0 &&
                  mfMappings[0].helperIds.map((data, index) =>
                    RenderLableValue(
                      `Helper Id ${index + 1}`,
                      <span>{data.type}</span>
                    )
                  )}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {mfMappings[0].bundleURLs.length > 0 &&
                  mfMappings[0].bundleURLs.map((data, index) =>
                    RenderLableValue(
                      `Bundle Url ${index + 1}`,
                      <span>{data.url}</span>
                    )
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div>NO DATA FOUND</div>
        )}
      </section>

      {/* <MetaTitle title={"Route MF View | Anarock"} />
      {loading ? (
        <TableShimmer />
      ) : mfMappings?.length > 0 ? (
        <div>
          <h1>MF Mapping View Page</h1>
          <div>
            <h3>ID</h3>
            <span>{mfMappings[0].routeMicroFrontendMappingId}</span>
          </div>
          <div>
            <h3>Route</h3>
            <span>{mfMappings[0].route}</span>
          </div>
          <div>
            <h3>Status</h3>
            <span>{mfMappings[0].isActive ? "Active" : "False"}</span>
          </div>
          <div>
            <h3>Container ID</h3>
            <span>{mfMappings[0].containerId}</span>
          </div>
          <div>
            <h3>Bundle URLs</h3>
            {mfMappings[0].bundleURLs.map((obj) => (
              <>
                <p>Url</p>
                <span>{obj.url}</span>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div>NO DATA FOUND</div>
      )} */}
    </>
  );
};

export default RouteMFViewPage;
