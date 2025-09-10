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

const SectionPreview = () => {
  const { payload, loading } = useSelector((state) => state.section);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const isEditMode = id ? true : false;

  const handleBack = () => {
    navigate(-1);
  };

  console.log(payload, "preview payload data");

  const handleSubmit = async (data) => {
    console.log(data, "form data");
    try {
      let res;
      if (isEditMode) {
        res = await dispatch(
          updateSection({ sectionId: id, updatedData: data })
        );
      } else {
        res = await dispatch(createSection(data));
      }

      if (
        res?.payload?.statusCode === 200 ||
        res?.payload?.statusCode === 201
      ) {
        navigate("/section");
        toast.success(
          `Section ${isEditMode ? "Updated" : "Created"} Successfully`
        );
      }
      console.log("Submission response:", res);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };


  console.log(payload, "section preview payload data");

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
            <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
              {payload?.name}
            </h5>
            <p className="font-medium text-base dark:text-gray-200">
              Section Order - {payload?.order_index}
            </p>
          </CardWrapper>
          <CardWrapper title="General">
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
          </CardWrapper>
          <CardWrapper title="Configuration">
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
          </CardWrapper>
          <CardWrapper title="API Configuration">
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
          onClick={()=>handleSubmit(payload)}
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

export default SectionPreview;
