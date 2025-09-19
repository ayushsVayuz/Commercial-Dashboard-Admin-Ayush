import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { CardWrapper } from "../../components/wrappers/card";
import { readSingleContainer } from "../../redux/actions/containers-action";
import { setContainerPayload } from "../../redux/slices/containerSlice";
import { Input } from "../../components/inputs/input";
import { Button } from "../../components/buttons";

const ContainerAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleContainer, payload } = useSelector((state) => state.container);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      container_id: "",
      description: "",
    },
  });

  // Load container if editing
  useEffect(() => {
    if (id) {
      dispatch(readSingleContainer({ id }));
    }
  }, [id, dispatch]);

  // Prefill form
  useEffect(() => {
    if (id && singleContainer && Object.keys(singleContainer).length > 0) {
      // Edit mode → API response
      reset({
        container_id: singleContainer.id || "",
        description: singleContainer.description || "",
      });
    } else if (!id && payload && Object.keys(payload).length > 0) {
      // Add mode → coming back from preview
      reset(payload);
    }
  }, [id, payload, singleContainer, reset]);

  const onSubmit = (data) => {
    // Save form data for preview
    dispatch(setContainerPayload(data));

    // Go to preview page
    navigate(`/containers/preview${id ? `/${id}` : ""}`);
  };

  const handleCancel = () => {
    reset();
    navigate("/containers");
  };

  return (
    <section className="flex flex-col">
      <MetaTitle
        title={id ? "Edit Container | Anarock" : "Add Container | Anarock"}
      />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/container"
          parent="Container"
          mainTitle={id ? "Edit Container" : "Add Container"}
        />
      </div>

      <CardWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Container ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Container ID
            </label>
            <Controller
              name="container_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} type="text" />}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} type="text" />}
            />
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <Button type="button" onClick={handleCancel} outLine={true}>
              Cancel
            </Button>
            <Button mainPrimary type="submit">
              Preview
            </Button>
          </div>
        </form>
      </CardWrapper>
    </section>
  );
};

export default ContainerAddEdit;
