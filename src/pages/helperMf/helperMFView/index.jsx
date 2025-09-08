import { useEffect } from "react";
import { fetchHelper } from "../../../redux/actions/helperMf-action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../../components/metaTitle";
import { Heading } from "../../../components/heading";
import { RenderLableValue } from "../../../components/labels";
import { decrypt } from "../../../functions";

function HelperMFViewPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  console.log(id);
  const { helperData, loading } = useSelector((state) => state.helper);

  useEffect(() => {
    if (decryptedId) {
      dispatch(
        fetchHelper([{ field: "helperMicroFrontendId", value: decryptedId }])
      );
    }
  }, [decryptedId, dispatch]);

  console.log(helperData);
  return (
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
      ) : helperData?.length > 0 ? (
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
                "Container Id",
                <span>{helperData[0].containerId}</span>
              )}
              {RenderLableValue("Type", <span>{helperData[0].type}</span>)}
              {RenderLableValue(
                "Status",
                <span>{helperData[0].isActive ? "Active" : "False"}</span>
              )}
            </div>
            {helperData[0].bundleURLs.map((data, index) => (
              <div key={index} className="mt-3">
                {RenderLableValue(
                  `Bundle link ${index + 1}`,
                  <span>{data.url}</span> // Assuming 'url' is the field inside 'data' that you want to display
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>NO DATA FOUND</div>
      )}
    </section>
  );
}

export default HelperMFViewPage;
