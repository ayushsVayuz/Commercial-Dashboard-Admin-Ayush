import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { fetchMasterConfigs } from "../../redux/actions/master-config-actions";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { decrypt } from "../../functions";

const MasterConfigViewPage = () => {
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const dispatch = useDispatch();
  const { masterConfigs, error, loading } = useSelector(
    (state) => state.masterConfig
  );
  useEffect(() => {
    dispatch(
      fetchMasterConfigs([{ field: "masterConfigId", value: decryptedId }])
    );
  }, [decryptedId]);

  return (
    <>
      <>
        <section className="flex flex-col gap-4 dark:h-screen">
          <MetaTitle title={"Master View | Anarock"} />
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <Heading
              sectionLink="/masterConfig"
              parent="Master Config"
              mainTitle="Master Config"
            />
          </div>
          {loading ? (
            <TableShimmer />
          ) : masterConfigs?.length > 0 ? (
            <div className="w-full md:w-[100%] flex flex-col">
              {/* Domain Details */}
              <div className="card bg-white dark:bg-slate-800 p-4 ">
                <div className="flex items-center justify-between">
                  <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                    Master Config{" "}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 gap-x-3 gap-y-6">
                  {RenderLableValue(
                    "Id",
                    <span>{masterConfigs[0].masterConfigId}</span>
                  )}
                  {RenderLableValue("Key", <span>{masterConfigs[0].key}</span>)}
                  {RenderLableValue(
                    "Status",
                    <span>
                      {masterConfigs[0].isActive ? "Active" : "Inactive"}
                    </span>
                  )}
                  {RenderLableValue(
                    "Value",
                    <span>{masterConfigs[0].value}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>NO DATA FOUND</div>
          )}
        </section>
      </>

      {/* <MetaTitle title={"Master View | Anarock"} />
      {loading ? (
        <TableShimmer />
      ) : masterConfigs?.length > 0 ? (
        <div className="dark:text-white">
          <h1>Domain View Page</h1>
          <div>
            <h3>ID</h3>
            <span>{masterConfigs[0].masterConfigId}</span>
          </div>
          <div>
            <h3>Key</h3>
            <span>{masterConfigs[0].key}</span>
          </div>
          <div>
            <h3>Status</h3>
            <span>{masterConfigs[0].isActive ? "Active" : "False"}</span>
          </div>
          <div>
            <h3>Value</h3>
            <span>{masterConfigs[0].value}</span>
          </div>
        </div>
      ) : (
        <div>NO DATA FOUND</div>
      )} */}
    </>
  );
};

export default MasterConfigViewPage;
