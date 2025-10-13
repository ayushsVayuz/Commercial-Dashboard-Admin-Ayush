import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectionSchema } from "../../validation/section-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { readSingleWidget } from "../../redux/actions/widgets-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { decrypt, encrypt } from "../../functions";
import { Selector } from "../../components/select";
import { Toggle } from "../../components/inputs/toogle";
import toast from "react-hot-toast";
import { widgetPayload } from "../../redux/slices/widgetsSlice";
import { readSection } from "../../redux/actions/section-action";
import { widgetSchema } from "../../validation/widget-validator";

const WidgetAddEdit = () => {
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { payload, singleWidget, error, loading } = useSelector(
    (state) => state.widget
  );

  const isEditMode = location.pathname.includes("/edit");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(widgetSchema),
    defaultValues: {
      // General
      widgetName: "",
      widgetType: "",
      section: "",

      // Position
      posX: 0,
      posY: 0,
      width: 0,
      height: 0,

      // Constraints
      minWidth: 0,
      maxWidth: 0,
      draggable: false,

      // Configuration
      chartType: "",
      groupId: "",
      dataField: null,

      // Styling
      borderColor: "",
      backgroundColor: "",

      // Responsive
      mobile: "",
      tablet: "",
      desktop: "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      dispatch(readSingleWidget({ id }));
    }
  }, [isEditMode, id]);

  useEffect(() => {
    if (isEditMode && singleWidget) {
      reset({
        widgetName: singleWidget.name || "",
        widgetType: singleWidget.type || "",
        section: singleWidget.section
          ? { id: singleWidget.section.id, name: singleWidget.section.name }
          : null,

        posX: singleWidget.position?.x || 0,
        posY: singleWidget.position?.y || 0,
        width: singleWidget.position?.w || 0,
        height: singleWidget.position?.h || 0,

        minWidth: singleWidget.constraints?.minWidth || 0,
        maxWidth: singleWidget.constraints?.maxWidth || 0,
        draggable: singleWidget.constraints?.draggable || false,

        chartType: singleWidget.config?.chartType || "",
        groupId: singleWidget.group_id || "",
        dataField: null,

        borderColor: singleWidget.styling?.borderColor || "",
        backgroundColor: singleWidget.styling?.backgroundColor || "",

        mobile: JSON.stringify(singleWidget.responsive?.mobile || {}),
        tablet: JSON.stringify(singleWidget.responsive?.tablet || {}),
        desktop: JSON.stringify(singleWidget.responsive?.desktop || {}),
      });
    } else {
      const singleWidget = payload;
      reset({
        widgetName: singleWidget.name || "",
        widgetType: singleWidget.type || "",

        section: singleWidget.section
          ? { id: singleWidget.section.id, name: singleWidget.section.name }
          : null,

        posX: singleWidget.position?.x || 0,
        posY: singleWidget.position?.y || 0,
        width: singleWidget.position?.w || 0,
        height: singleWidget.position?.h || 0,

        minWidth: singleWidget.constraints?.minWidth || 0,
        maxWidth: singleWidget.constraints?.maxWidth || 0,
        draggable: singleWidget.constraints?.draggable || false,

        chartType: singleWidget.config?.chartType || "",
        groupId: singleWidget.group_id || "",
        dataField: null,

        borderColor: singleWidget.styling?.borderColor || "",
        backgroundColor: singleWidget.styling?.backgroundColor || "",

        mobile: JSON.stringify(singleWidget.responsive?.mobile || {}),
        tablet: JSON.stringify(singleWidget.responsive?.tablet || {}),
        desktop: JSON.stringify(singleWidget.responsive?.desktop || {}),
      });
    }
  }, [isEditMode, singleWidget, reset]);

  const onSubmit = (data) => {
    const payload = {
      name: data.widgetName,
      type: data.widgetType,
      section_id: data.section.id,
      position: {
        x: Number(data.posX),
        y: Number(data.posY),
        w: Number(data.width),
        h: Number(data.height),
      },
      constraints: {
        minWidth: Number(data.minWidth),
        maxWidth: Number(data.maxWidth),
        draggable: data.draggable,
      },
      config: {
        chartType: data.chartType,
      },
      group_id: data.groupId,
      response_mapping: {
        dataField: data.dataField,
      },
      styling: {
        borderColor: data.borderColor,
        backgroundColor: data.backgroundColor,
      },
      responsive: {
        mobile: JSON.parse(data.mobile || "{}"),
        tablet: JSON.parse(data.tablet || "{}"),
        desktop: JSON.parse(data.desktop || "{}"),
      },
    };

    dispatch(widgetPayload(payload));
    navigate(isEditMode ? `/widget/preview/${id}` : "/widget/preview");
  };

  const handleCancel = () => {
    reset();
    navigate("/widget");
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await dispatch(
          readSection({
            id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
            // queryArray: [{ field: "search", value: searchValue }],
          })
        );

        if (res?.payload) {
          const options = res.payload?.data?.map((s) => ({
            label: s.name,
            value: s.id,
          }));
          setSectionOptions(options);
        }
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, [dispatch]);

  return (
    <section className="dark:bg-gray-800 dark:h-screen">
      <MetaTitle title={`Widget ${isEditMode ? "Edit" : "Add"} | Anarock`} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/widget"
        parent="Widget"
        mainTitle={isEditMode ? "Edit Widget" : "Create Widget"}
      />
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* General */}
          <h5 className="mb-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            General
          </h5>
          <div className="grid sm:grid-cols-2 gap-4">
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <Selector
                  label="Section"
                  placeholder="Select Section"
                  options={sectionOptions}
                  value={
                    sectionOptions.find(
                      (opt) => opt.value === field.value?.id
                    ) || null
                  }
                  onChange={(selected) => {
                    field.onChange(
                      selected
                        ? { id: selected.value, name: selected.label }
                        : null
                    );
                  }}
                />
              )}
            />

            <Controller
              name="widgetName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Widget Name"
                  placeholder="Enter name"
                  errorContent={errors?.widgetName?.message}
                />
              )}
            />
            <Controller
              name="widgetType"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Widget Type"
                  placeholder="e.g., chart"
                  errorContent={errors?.widgetType?.message}
                />
              )}
            />
          </div>

          {/* Position */}
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            Position
          </h5>
          <div className="grid sm:grid-cols-4 gap-4">
            {["posX", "posY", "width", "height"].map((fieldName) => (
              <Controller
                key={fieldName}
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={fieldName.toUpperCase()}
                    type="number"
                    errorContent={errors?.[fieldName]?.message}
                  />
                )}
              />
            ))}
          </div>

          {/* Constraints */}
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            Constraints
          </h5>
          <div className="grid sm:grid-cols-3 gap-4">
            <Controller
              name="minWidth"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Min Width"
                  type="number"
                  errorContent={errors?.minWidth?.message}
                />
              )}
            />
            <Controller
              name="maxWidth"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Max Width"
                  type="number"
                  errorContent={errors?.maxWidth?.message}
                />
              )}
            />
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <div>
              <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                Widget Draggable{" "}
              </h6>
              <p className="text-xs text-gray-500">
                Enable this to make the widget draggable.
              </p>
            </div>
            <Controller
              name="draggable"
              control={control}
              render={({ field }) => <Toggle {...field} name="draggable" />}
            />
          </div>

          {/* Configuration */}
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            Configuration
          </h5>
          <div className="grid sm:grid-cols-3 gap-4">
            <Controller
              name="chartType"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Chart Type"
                  errorContent={errors?.chartType?.message}
                />
              )}
            />
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Group ID"
                  errorContent={errors?.groupId?.message}
                />
              )}
            />
            {/* <Controller
              name="dataField"
              control={control}
              render={({ field }) => <Input {...field} label="Data Field" />}
            /> */}
          </div>

          {/* Styling */}
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            Styling
          </h5>
          <div className="grid sm:grid-cols-2 gap-4">
            <Controller
              name="borderColor"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Border Color"
                  errorContent={errors?.borderColor?.message}
                />
              )}
            />
            <Controller
              name="backgroundColor"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Background Color"
                  errorContent={errors?.backgroundColor?.message}
                />
              )}
            />
          </div>

          {/* Responsive */}
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            Responsive Settings
          </h5>
          <div className="grid sm:grid-cols-3 gap-4">
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Mobile Config (JSON)"
                  errorContent={errors?.mobile?.message}
                />
              )}
            />
            <Controller
              name="tablet"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Tablet Config (JSON)"
                  errorContent={errors?.tablet?.message}
                />
              )}
            />
            <Controller
              name="desktop"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Desktop Config (JSON)"
                  errorContent={errors?.desktop?.message}
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
              Preview
            </Button>
          </div>
        </form>
        {error}
      </FormWrapper>
    </section>
  );
};

export default WidgetAddEdit;
