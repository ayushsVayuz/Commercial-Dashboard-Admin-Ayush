import React, { useEffect } from "react";
import { Heading } from "../../components/heading";
import { RenderLableValue } from "../../components/labels";
import { MetaTitle } from "../../components/metaTitle";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRegex } from "../../redux/actions/regex-actions";
import { decrypt } from "../../functions";

const RegexDetail = ({}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const { singleRegex, loading, error } = useSelector((state) => state.regex);
  useEffect(() => {
    dispatch(fetchSingleRegex(decryptedId));
  }, [decryptedId]);

  return (
    <>
      <section className="flex flex-col gap-4 dark:h-screen">
        <MetaTitle title={"Route Regex View | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading sectionLink="/regex" parent="Regex" mainTitle="Regex View" />
        </div>

        {loading ? (
          <TableShimmer />
        ) : singleRegex?.length > 0 ? (
          <div className="w-full md:w-[100%] flex flex-col">
            {/* Domain Details */}
            <div className="card bg-white dark:bg-slate-800 p-4 ">
              <div className="flex items-center justify-between">
                <p className="dark:text-gray-200 font-semibold text-lg mb-4">
                  Regex View{" "}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
                {RenderLableValue("Id", <span>{singleRegex[0].regexId}</span>)}

                {RenderLableValue("name", <span>{singleRegex[0].name}</span>)}
                {RenderLableValue(
                  "Status",
                  <span>{singleRegex[0].isActive ? "Active" : "Inactive"}</span>
                )}
                {RenderLableValue(
                  "Require",
                  <span>
                    {singleRegex[0].isRequired ? "Required" : "Not Required"}
                  </span>
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

export default RegexDetail;
