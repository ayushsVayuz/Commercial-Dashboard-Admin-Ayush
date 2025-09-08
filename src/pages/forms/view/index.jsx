import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMasterForm } from "../../../redux/actions/form-action";
import { useEffect } from "react";
import { MetaTitle } from "../../../components/metaTitle";
import { Heading } from "../../../components/heading";
import { TableShimmer } from "../../../components/shimmers/tableShimmer";
import { RenderLableValue } from "../../../components/labels";
import { decrypt } from "../../../functions";

function MasterFormViewPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const { masterForm, loading } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(fetchMasterForm({ field: "masterFormId", value: decryptedId }));
  }, []);
  console.log(masterForm);

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
      ) : masterForm?.length > 0 ? (
        <div className="w-full md:w-[100%] flex flex-col">
          {/* Domain Details */}
          <div className="card bg-white dark:bg-slate-800 p-4 ">
            <div className="flex items-center justify-between">
              <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                RouteMF View{" "}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
              {RenderLableValue("Name", <span>{masterForm[0].name}</span>)}
              {RenderLableValue(
                "Unique Key",
                <span>{masterForm[0].uniqueKey}</span>
              )}
              {RenderLableValue(
                "Status",
                <span>{masterForm[0].isActive ? "Active" : "False"}</span>
              )}
            </div>
            {masterForm[0].keyDetails.map((data, index) => (
              <div key={index} className="mt-4">
                {RenderLableValue(
                  `key ${index + 1}`,
                  <span> {data.key}</span> // Assuming 'url' is the field inside 'data' that you want to display
                  //   <span>key: {data.key}</span> // Assuming 'url' is the field inside 'data' that you want to display
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

export default MasterFormViewPage;
