import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
// import { Selector } from "../../components/select";
import {
  readSingleWidget,
  updateWidgetCMS,
} from "../../redux/actions/widgets-action";
import { CardWrapper } from "../../components/wrappers/card";
import { readContainer } from "../../redux/actions/containers-action";
import { Input } from "../../components/inputs/input";
import { Selector } from "../../components/select";
import { clearSingleWidget } from "../../redux/slices/widgetsSlice";

const WidgetCMSAddEdit = () => {
  const [containers, setContainers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
const [containerValue, setContainerValue] = useState("");
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
    },
  });

  // useEffect(() => {
  //   dispatch(readSingleWidget({ id: id }));
  // }, []);
  useEffect(() => {
    
    dispatch(clearSingleWidget());
    setContainerValue("");
    reset({
      sectionId: "",
      widgetId: "",
      containerId: "",
    });
    
   
    dispatch(readSingleWidget({ id: id }));
  }, [id, reset]);

 useEffect(() => {
  if (singleWidget?.container_id) {
    console.log(singleWidget?.container_id, "in use effect ");
    setContainerValue(singleWidget.container_id);
    
    reset({
      sectionId: "",
      widgetId: "",
      containerId: singleWidget.container_id,
    });
  }
}, [singleWidget, reset]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          queryArray: [
            { field: "mapped", value: false },
            { field: "skip", value: 0 },
            { field: "limit", value: 1000 },
          ],
        };
        const res = await dispatch(readContainer(payload));
        const updatedObject = res?.payload?.data?.map((data) => ({
          label: data?.container_id,
          value: data?.container_id,
        }));
        setContainers(updatedObject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (data) => {
    const payload = {
      container_id: data.containerId,
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
    <section className="dark:bg-gray-800 min-h-screen bg-white">
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
            {/* <Controller
              name="containerId"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  options={containers}
                  label="Container Id"
                  // placeholder="e.g., FACI20"
                  errorContent={errors?.containerId?.message}
                  loading={loading}
                />
              )}
            /> */}
            <Controller
  name="containerId"
  control={control}
  render={({ field }) => (
    <Input
      {...field}
      label="Container Id"
      value={containerValue}
      onChange={(e) => {
        setContainerValue(e.target.value);
        field.onChange(e.target.value);
      }}
      errorContent={errors?.containerId?.message}
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
      </FormWrapper>
    </section>
  );
};

export default WidgetCMSAddEdit;
