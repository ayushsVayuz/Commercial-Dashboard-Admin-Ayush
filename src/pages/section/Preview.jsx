import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../components/heading";
import { MetaTitle } from "../../components/metaTitle";
import { RenderLableValue } from "../../components/labels";
import { CardWrapper } from "../../components/wrappers/card";
import { Button } from "../../components/buttons";
import {
  createSection,
  updateSection,
} from "../../redux/actions/section-action";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import DNDGridLayout from "./components/DNDGridLayout";
import { useState } from "react";

const SectionPreview = () => {
  const [widgetPositions, setWidgetPositions] = useState([]);
  const { payload, loading } = useSelector((state) => state.section);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const isEditMode = id ? true : false;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (data) => {
    let { section_id, ...rest } = data;

    const updatedPayload = {
      ...rest,
      ...(id == null ? { section_id: data?.section_id?.value } : {}),
      // method: "GET",
      widgets: data.widgets.map((w) => ({
        widget_id: w.widget_id,
        position: w.position,
      })),
      // params: [],
    };

    try {
      let res;
      if (isEditMode) {
        res = await dispatch(
          updateSection({ sectionId: id, updatedData: updatedPayload })
        );
      } else {
        res = await dispatch(createSection(updatedPayload));
        
      }

      console.log(res, "response---");

      if (
        res?.payload?.statusCode === 200 ||
        res?.payload?.statusCode === 201
      ) {
        navigate("/section");
        toast.success(
          `Section ${isEditMode ? "Updated" : "Created"} Successfully`
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <section>
      <MetaTitle title={"Section Preview | Anarock"} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/section"
        parent="Section"
        mainTitle="Section Preview"
      />
      {loading ? (
        <TableShimmer />
      ) : payload ? (
        <div className="w-full md:w-[100%] flex flex-col">
          <CardWrapper>
            <h5 className="font-semibold !text-3xl text-[#884EA7] dark:text-white hover:text-[#884EA7]">
              {payload?.section_id?.label}
            </h5>
            {/* <p className="font-medium text-base dark:text-gray-200">
              Section Order - {payload?.order_index}
            </p> */}
          </CardWrapper>

          {/* <CardWrapper title="General">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "Is Collapsible",
                <span>{payload?.is_collapsible ? "Yes" : "No"}</span>
              )}
              {RenderLableValue(
                "Is Collapsed",
                <span>{payload?.is_collapsed ? "Yes" : "No"}</span>
              )}
            </div>
          </CardWrapper> */}

          {/* <CardWrapper title="Widgets">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Group ID</th>
                    <th className="px-4 py-2 border">X</th>
                    <th className="px-4 py-2 border">Y</th>
                    <th className="px-4 py-2 border">W</th>
                    <th className="px-4 py-2 border">H</th>
                  </tr>
                </thead>
                <tbody>
                  {payload?.widgets?.map((row, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 border">{row.type}</td>
                      <td className="px-4 py-2 border">{row.group_id}</td>
                      <td className="px-4 py-2 border">{row.X}</td>
                      <td className="px-4 py-2 border">{row.Y}</td>
                      <td className="px-4 py-2 border">{row.w}</td>
                      <td className="px-4 py-2 border">{row.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardWrapper> */}

          {/* <CardWrapper title="Configuration">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "Padding",
                <span>{payload?.section_config?.padding}</span>
              )}
              {RenderLableValue(
                "Border Radius",
                <span>{payload?.section_config?.borderRadius}</span>
              )}
              {RenderLableValue(
                "Background Color",
                <span>{payload?.section_config?.backgroundColor}</span>
              )}
            </div>
          </CardWrapper> */}

          <CardWrapper title="Widgets">
            <DNDGridLayout
              data={payload?.widgets}
              widgetPositions={widgetPositions}
              setWidgetPositions={setWidgetPositions}
              isDraggable={false}
              isResizable={false}
            />
          </CardWrapper>

          {/* <CardWrapper title="API Configuration">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "API Endpoint",
                <span>{payload?.api_endpoint}</span>
              )}
              {RenderLableValue("Method", <span>{payload?.method}</span>)}
              {RenderLableValue(
                "Response Type",
                <span>{payload?.response_type ?? "N/A"}</span>
              )}
              {RenderLableValue(
                "Refresh Interval",
                <span>{payload?.refresh_interval}</span>
              )}
            </div>
          </CardWrapper> */}
        </div>
      ) : (
        <div>NO DATA FOUND</div>
      )}
      <div className="mt-4 flex justify-end gap-4">
        <Button type="button" onClick={handleBack} outLine={true}>
          Back
        </Button>
        <Button
          onClick={() => handleSubmit(payload)}
          type="submit"
          mainPrimary={true}
          isLoading={loading}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </div>
    </section>
  );
};

export default SectionPreview;
