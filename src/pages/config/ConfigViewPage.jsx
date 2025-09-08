import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { fetchDomainConfigs } from "../../redux/actions/config-actions";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { fetchActiveDomains } from "../../redux/actions/domain-action";
import { fetchActiveRegex } from "../../redux/actions/regex-actions";
import { decrypt } from "../../functions";

const ConfigViewPage = () => {
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const dispatch = useDispatch();
  const [domainName, setDomainName] = useState();
  const [regexName, setRegexName] = useState();
  const { configs, error, loading } = useSelector((state) => state.config);
  const { activeRegex: regexes, loading: regexLoading } = useSelector(
    (state) => state.regex
  );
  const { activeDomains, loading: domainLoading } = useSelector(
    (state) => state.domain
  );

  useEffect(() => {
    dispatch(
      fetchDomainConfigs([{ field: "domainSpecificConfigId", value: decryptedId }])
    );
    dispatch(fetchActiveDomains());
    dispatch(fetchActiveRegex());
  }, [decryptedId]);

  useEffect(() => {
    if (activeDomains.length > 0 && regexes.length > 0) {
      // console.log(activeDomains, regexes, configs);
      const selectedDomain = activeDomains.find(
        (obj) => obj._id === configs[0]?.domainId
      );
      const selectedRegex = regexes.find(
        (obj) => obj._id === configs[0]?.regexId
      );
      // console.log(selectedDomain, selectedRegex);
      setDomainName(selectedDomain?.domain);
      setRegexName(selectedRegex?.name);
    }
  }, [activeDomains, regexes, configs]);

  return (
    <>
      <section className="flex flex-col gap-4 dark:h-screen">
        <MetaTitle title={"Config View | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/config"
            parent="Config"
            mainTitle="Config View"
          />
        </div>

        {loading ? (
          <TableShimmer />
        ) : configs?.length > 0 ? (
          <div className="w-full md:w-[100%] flex flex-col">
            {/* Domain Details */}
            <div className="card bg-white dark:bg-slate-800 p-4 ">
              <div className="flex items-center justify-between">
                <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                  Config View{" "}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-3 gap-y-6">
                {RenderLableValue(
                  "Id",
                  <span>{configs[0].domainSpecificConfigId}</span>
                )}
                {RenderLableValue("Key", <span>{configs[0].key.key}</span>)}
                {RenderLableValue(
                  "Status",
                  <span>{configs[0].isActive ? "Active" : "Inactive"}</span>
                )}
                {RenderLableValue("Value", <span>{configs[0].value}</span>)}
                {configs[0].domainId &&
                  RenderLableValue("Domain", <span>{domainName}</span>)}
                {configs[0].regexId &&
                  RenderLableValue("regexId", <span>{regexName}</span>)}
              </div>
            </div>
          </div>
        ) : (
          <div>NO DATA FOUND</div>
        )}
      </section>

      {/* <MetaTitle title={"Config View | Anarock"} />
      {loading ? (
        <TableShimmer />
      ) : configs?.length > 0 ? (
        <div className="dark:text-white">
          <h1>Domain View Page</h1>
          <div>
            <h3>ID</h3>
            <span>{configs[0].domainSpecificConfigId}</span>
          </div>
          <div>
            <h3>Key</h3>
            <span>{configs[0].key.key}</span>
          </div>
          <div>
            <h3>Status</h3>
            <span>{configs[0].isActive ? "Active" : "Inactive"}</span>
          </div>
          <div>
            <h3>Value</h3>
            <span>{configs[0].value}</span>
          </div>
        </div>
      ) : (
        <div>NO DATA FOUND</div>
      )} */}
    </>
  );
};

export default ConfigViewPage;
