import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { Selector } from "../../components/select";
import {
  readSingleWidget,
  updateWidgetCMS,
} from "../../redux/actions/widgets-action";
import { CardWrapper } from "../../components/wrappers/card";
import { TextArea } from "../../components/textarea";

const WidgetCMSAddEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleWidget, error, loading } = useSelector((state) => state.widget);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      sectionId: "",
      widgetId: "",
      containerId: "",
      description: "",
    },
  });

  useEffect(() => {
    dispatch(readSingleWidget({ id: id }));
  }, []);

  const onSubmit = (data) => {
    const payload = {
      container_id: data.containerId,
      description: data.description,
    };
    dispatch(
      updateWidgetCMS({
        widgetId: singleWidget?.widget_id,
        updatedData: payload,
      })
    );
    navigate(`/widget`);
  };

  const handleCancel = () => {
    reset();
    navigate("/widget");
  };

  return (
    <section className="dark:bg-gray-800 dark:h-screen">
      <MetaTitle title={`Widget Mapping | Anarock`} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/widget"
        parent="Widget"
        mainTitle={"Widget Mapping"}
      />
      <CardWrapper>
        <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
          {singleWidget?.title}
        </h5>
        <p className="font-medium text-base dark:text-gray-200">
          Section - {singleWidget?.section?.name}
        </p>
      </CardWrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* General */}
          <h5 className="mb-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            General
          </h5>
          <div className="grid sm:grid-cols-1 gap-4">
            <Controller
              name="containerId"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Container Id"
                  placeholder="e.g., FACI20"
                  errorContent={errors?.containerId?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label="Description"
                  placeholder="Description about widget"
                  errorContent={errors?.description?.message}
                />
              )}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex justify-end gap-4">
            <Button type="button" onClick={handleCancel} outLine={true}>
              Cancel
            </Button>
            <Button
              type="submit"
              mainPrimary={true}
              isLoading={loading}
              disabled={!isValid}
            >
              Map
            </Button>
          </div>
        </form>
        {error}
      </FormWrapper>
    </section>
  );
};

export default WidgetCMSAddEdit;
