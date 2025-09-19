import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../components/heading";
import { MetaTitle } from "../../components/metaTitle";
import { RenderLableValue } from "../../components/labels";
import { CardWrapper } from "../../components/wrappers/card";
import { Button } from "../../components/buttons";
import {
  createContainer,
  updateContainer,
} from "../../redux/actions/containers-action";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";

const ContainerPreview = () => {
  const { payload, loading } = useSelector((state) => state.container);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const isEditMode = !!id;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (data) => {
    try {
      let res;
      if (isEditMode) {
        res = await dispatch(
          updateContainer({ containerId: id, updatedData: data })
        );
      } else {
        res = await dispatch(createContainer(data));
      }

      if (
        res?.payload?.statusCode === 200 ||
        res?.payload?.statusCode === 201
      ) {
        navigate("/containers");
        toast.success(
          `Container ${isEditMode ? "Updated" : "Created"} Successfully`
        );
      } else if (res?.payload?.statusCode === 500) {
        toast.error(res?.payload?.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <section>
      <MetaTitle title={"Container Preview | Anarock"} />
      <Heading
        containerClassName={"my-4"}
        WidgetLink="/container"
        parent="Container"
        mainTitle="Container Preview"
      />
      {loading ? (
        <TableShimmer />
      ) : payload ? (
        <div className="w-full md:w-[100%] flex flex-col">
          <CardWrapper>
            {RenderLableValue(
              "Container ID",
              <span>{payload?.container_id}</span>
            )}
            {RenderLableValue(
              "Description",
              <span>{payload?.description}</span>
            )}
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
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </div>
    </section>
  );
};

export default ContainerPreview;
