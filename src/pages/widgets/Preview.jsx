import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../components/heading";
import { MetaTitle } from "../../components/metaTitle";
import { RenderLableValue } from "../../components/labels";
import { CardWrapper } from "../../components/wrappers/card";
import { Button } from "../../components/buttons";
import { createWidget, updateWidget } from "../../redux/actions/widgets-action";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";

const WidgetPreview = () => {
  const { payload, loading } = useSelector((state) => state.widget);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const isEditMode = id ? true : false;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (data) => {
    try {
      let res;
      if (isEditMode) {
        res = await dispatch(updateWidget({ widgetId: id, updatedData: data }));
      } else {
        res = await dispatch(createWidget(data));
      }

      if (
        res?.payload?.statusCode === 200 ||
        res?.payload?.statusCode === 201
      ) {
        navigate("/widget");
        toast.success(
          `Widget ${isEditMode ? "Updated" : "Created"} Successfully`
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <section>
      <MetaTitle title={"Widget Preview | Anarock"} />
      <Heading
        containerClassName={"my-4"}
        WidgetLink="/Widget"
        parent="Widget"
        mainTitle="Widget Preview"
      />
      {loading ? (
        <TableShimmer />
      ) : payload ? (
        <div className="w-full md:w-[100%] flex flex-col">
          <CardWrapper>
            <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
              {payload?.name}
            </h5>
            <p className="font-medium text-base dark:text-gray-200">
              Widget Type - {payload?.type}
            </p>
            <p className="font-medium text-base dark:text-gray-200">
              Section - {payload?.widget?.name}
            </p>
          </CardWrapper>

          <CardWrapper title="Position">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue("X", <span>{payload?.position?.x}</span>)}
              {RenderLableValue("Y", <span>{payload?.position?.y}</span>)}
              {RenderLableValue("Width", <span>{payload?.position?.w}</span>)}
              {RenderLableValue("Height", <span>{payload?.position?.h}</span>)}
            </div>
          </CardWrapper>

          <CardWrapper title="Constraints">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "Min Width",
                <span>{payload?.constraints?.minWidth}</span>
              )}
              {RenderLableValue(
                "Max Width",
                <span>{payload?.constraints?.maxWidth}</span>
              )}
              {RenderLableValue(
                "Draggable",
                <span>{payload?.constraints?.draggable ? "Yes" : "No"}</span>
              )}
            </div>
          </CardWrapper>

          <CardWrapper title="Configuration">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "Chart Type",
                <span>{payload?.config?.chartType}</span>
              )}
              {RenderLableValue("Group ID", <span>{payload?.group_id}</span>)}
              {RenderLableValue(
                "Data Field",
                <span>{payload?.response_mapping?.dataField}</span>
              )}
            </div>
          </CardWrapper>

          <CardWrapper title="Styling">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "Border Color",
                <span>{payload?.styling?.borderColor}</span>
              )}
              {RenderLableValue(
                "Background Color",
                <span>{payload?.styling?.backgroundColor}</span>
              )}
            </div>
          </CardWrapper>

          <CardWrapper title="Responsive Settings">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
              {RenderLableValue(
                "Mobile",
                <span>
                  {Object.keys(payload?.responsive?.mobile || {}).length > 0
                    ? "Configured"
                    : "N/A"}
                </span>
              )}
              {RenderLableValue(
                "Tablet",
                <span>
                  {Object.keys(payload?.responsive?.tablet || {}).length > 0
                    ? "Configured"
                    : "N/A"}
                </span>
              )}
              {RenderLableValue(
                "Desktop",
                <span>
                  {Object.keys(payload?.responsive?.desktop || {}).length > 0
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
      <div className="mt-4 flex justify-end gap-4">
        <Button type="button" onClick={handleBack} outLine={true}>
          Back
        </Button>
        <Button
          onClick={() => handleSubmit(payload)}
          type="submit"
          mainPrimary={true}
          isLoading={loading}
          //  disabled={!isValid}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </div>
    </section>
  );
};

export default WidgetPreview;
