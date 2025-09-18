import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectionSchema } from "../../validation/section-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  readSectionListing,
  readSingleSection,
} from "../../redux/actions/section-action";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { Selector } from "../../components/select";
import { Toggle } from "../../components/inputs/toogle";
import { sectionPayload } from "../../redux/slices/sectionSlice";
import { readWidget } from "../../redux/actions/widgets-action";
import WidgetGrid from "./components/WidgetGrid";

const SectionAddEdit = () => {
  const [sectionOptions, setSectionsOptions] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});

  const [widgetOptions, setWidgetOptions] = useState([]);
  const [widgetPositions, setWidgetPositions] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { payload, singleSection, error, loading } = useSelector(
    (state) => state.section
  );

  const isEditMode = location.pathname.includes("/edit");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
    getValues,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(sectionSchema),
    defaultValues: {
      section: "",
      // sectionOrder: "",
      isCollapsible: "",
      isCollapsed: "",
      // backgroundColor: "",
      // padding: "",
      // borderRadius: "",
      apiEndpoint: "",
      requestMethod: "",
      refreshInterval: "",
      // params: [],
      widgets: [],
    },
  });

  const sectionId = selectedSection?.value || null;

  const { fields, replace } = useFieldArray({
    control,
    // name: "widgets",
    name: "sectionName",
  });

  useEffect(() => {
    const requestPayload = {
      id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
      queryArray: [],
    };
    const fetchSections = async () => {
      try {
        const res = await dispatch(readSectionListing({}));
        if (res?.payload) {
          const options = res.payload?.data?.map((s) => ({
            label: s.name,
            value: s.section_id,
          }));
          setSectionsOptions(options);
          // options.push({ label: "Other", value: "other" });
        }
      } catch (err) {
        console.error("Error fetching widgets:", err);
      }
    };
    fetchSections();
  }, []);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
       
        const res = await dispatch(readWidget({ id: sectionId }));
        if (res?.payload) {
          const options = res.payload?.data?.map((w, index) => ({
            widget_name: w.widget_name || w.title,
            widget_id: w.widget_id,
            key_name: w.key_name,
            is_active: w.is_active,
            position: positions[index] || [0, 0, 2, 2],
          }));
          setWidgetPositions([])
          setWidgetOptions(options);
        }
      } catch (err) {
        console.error("Error fetching widgets:", err);
      }
    };
    if (sectionId !== null) {
      fetchWidgets();
    }
  }, [sectionId]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(readSingleSection({ id: id }));
    }
  }, [isEditMode, id]);

  useEffect(() => {
    if (isEditMode && singleSection) {
      const section = singleSection;

      const selectedOption =
        sectionOptions.find((opt) => opt.label === section.name) || null;

      if (section.widgets?.length > 0) {
        setWidgetOptions(section.widgets);
      }

      console.log(widgetOptions, "singleSection data in useEffect");

      reset({
        sectionName: selectedOption || "",
        // sectionOrder: section.order_index || "",
        isCollapsible: section.is_collapsible || false,
        isCollapsed: section.is_collapsed || false,
        // height: section?.section_config?.height || "",
        // backgroundColor: section.section_config?.backgroundColor || "",
        // padding: section.section_config?.padding || "",
        // borderRadius: section.section_config?.borderRadius || "",
        apiEndpoint: section.api_endpoint || "",
        requestMethod: section.method,
        refreshInterval: section.refresh_interval || 0,
        // params: section.params || [],
        widgets: section.widgets || [],
      });
    } else {
      const section = payload;

      console.log(widgetPositions, "payload data in useEffect");

      if (section.widgets?.length) {
        setWidgetPositions(section.widgets);
      }
      reset({
        sectionName: section.section_id || "",
        // sectionOrder: section.order_index || "",
        isCollapsible: section.is_collapsible || false,
        isCollapsed: section.is_collapsed || false,
        // height: section?.section_config?.height || "",
        // backgroundColor: section.section_config?.backgroundColor || "",
        // padding: section.section_config?.padding || "",
        // borderRadius: section.section_config?.borderRadius || "",
        apiEndpoint: section.api_endpoint || "",
        requestMethod: section.method || {},
        refreshInterval: section.refresh_interval || 0,
        // params: section.params || [],
        widgets: section.widgets || [],
      });
    }
  }, [isEditMode, singleSection, payload, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const payload = {
      dashboard_id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
      section_id: data?.sectionName,
      // order_index: data?.sectionOrder,
      is_collapsible: data?.isCollapsible,
      is_collapsed: data?.isCollapsible,
      // section_config: {
      //   height: data?.height,
      //   backgroundColor: data?.backgroundColor,
      //   padding: data?.padding,
      //   borderRadius: data?.borderRadius,
      // },
      api_endpoint: data?.apiEndpoint,
      method: data?.requestMethod,
      refresh_interval: data?.refreshInterval,
      response_type: "json",
      // params: data?.params || [],
      widgets: widgetPositions,
    };
    dispatch(sectionPayload(payload));
    if (isEditMode) {
      navigate(`/section/preview/${id}`);
    } else {
      navigate("/section/preview");
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/section");
  };

  const paramsOptions = [
    { label: "limit", value: "limit" },
    { label: "skip", value: "skip" },
    { label: "page", value: "page" },
    { label: "perPage", value: "perPage" },
    { label: "offset", value: "offset" },
    { label: "sort", value: "sort" },
    { label: "order", value: "order" },
    { label: "filter", value: "filter" },
    { label: "search", value: "search" },
    { label: "query", value: "query" },
    { label: "fields", value: "fields" },
    { label: "include", value: "include" },
    { label: "exclude", value: "exclude" },
    { label: "expand", value: "expand" },
    { label: "select", value: "select" },
    { label: "populate", value: "populate" },
    { label: "group", value: "group" },
    { label: "count", value: "count" },
    { label: "distinct", value: "distinct" },
  ];

  const methodOptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
    { label: "PATCH", value: "PATCH" },
  ];

  const positions = [
    [0, 0, 2, 2],
    [2, 0, 2, 2],
    [8, 0, 2, 2],
    [0, 2, 2, 2],
    [2, 2, 2, 2],
    [9, 2, 2, 2],
  ];

  console.log(widgetPositions, "widgets option");

  return (
    <section className="dark:bg-gray-800 dark:h-screen ">
      <MetaTitle title={`Section ${isEditMode ? "Edit" : "Add"} | Anarock`} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/section"
        parent="Section"
        mainTitle={isEditMode ? "Edit Section" : "Create Section"}
      />
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="mb-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            General
          </h5>
          <div className="grid sm:grid-cols-2 gap-4">
            <Controller
              name="sectionName"
              control={control}
              render={({ field }) => (
                <Selector
                  label="Section Name"
                  placeholder="Select Section"
                  options={sectionOptions}
                  isMulti={false}
                  value={field.value || null}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setSelectedSection(selectedOption);
                    // setSearchParams((prev) => {
                    //   const newParams = new URLSearchParams(prev);
                    //   if (selectedOption?.label) {
                    //     newParams.set("section_id", selectedOption.value);
                    //   } else {
                    //     newParams.delete("section_id");
                    //   }
                    //   return newParams;
                    // });
                  }}
                  errorContent={errors?.sectionName?.message}
                />
              )}
            />
{/* 
            <Controller
              name="sectionOrder"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Section Order"
                  type="text"
                  placeholder="Enter Section Order"
                  errorContent={errors?.sectionOrder?.message}
                />
              )}
            /> */}
          </div>
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            Widgets
          </h5>
          {widgetOptions?.length > 0 ? (
            <Controller
              name="widgets"
              control={control}
              render={({ field }) => (
                <WidgetGrid
                  data={widgetOptions}
                  widgetPositions={widgetPositions}
                  setWidgetPositions={setWidgetPositions}
                  value={widgetPositions}
                  onChange={(newLayout) => setWidgetPositions(newLayout)}
                  errorContent={errors?.widgets?.message}
                />
              )}
            />
          ) : (
            <div className="w-full h-[300px] flex justify-center items-center">
              No widgets to show
            </div>
          )}

          {/* <Controller
            name="widgets"
            control={control}
            render={({ field }) => {
              const selectedValues = fields.map((f) => f.widgetId);
              return (
                <Selector
                  placeholder="Select widgets"
                  options={widgetOptions}
                  isMulti={true}
                  value={widgetOptions?.filter((opt) =>
                    selectedValues.includes(opt.value)
                  )}
                  onChange={(selectedOptions) => {
                    const mapped = selectedOptions.map((opt) => ({
                      widgetId: opt.value, // only for payload
                      widgetName: opt.label, // only for UI
                      type: "",
                      groupId: "",
                      X: 0,
                      Y: 0,
                      w: 0,
                      h: 0,
                    }));
                    replace(mapped);
                  }}
                />
              );
            }}
          />

          {fields.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2">Widget Name</th>
                    <th className="border p-2">Widget Type</th>
                    <th className="border p-2">Group ID</th>
                    <th className="border p-2">Pos X</th>
                    <th className="border p-2">Pos Y</th>
                    <th className="border p-2">Width</th>
                    <th className="border p-2">Height</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <tr key={item.id}>
                     
                      <td className="border p-2">
                        <Controller
                          name={`widgets.${index}.widgetName`}
                          control={control}
                          render={({ field }) => <Input {...field} disabled />}
                        />
                        
                        <Controller
                          name={`widgets.${index}.widgetId`}
                          control={control}
                          render={({ field }) => (
                            <input type="hidden" {...field} />
                          )}
                        />
                      </td>

                      <td className="border p-2">
                        <Controller
                          name={`widgets.${index}.widgetType`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Type"
                              errorContent={
                                errors?.widgets?.[index]?.widgetType?.message
                              }
                            />
                          )}
                        />
                      </td>
                      <td className="border p-2">
                        <Controller
                          name={`widgets.${index}.groupId`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Group"
                              errorContent={
                                errors?.widgets?.[index]?.groupId?.message
                              }
                            />
                          )}
                        />
                      </td>
                      {["posX", "posY", "width", "height"].map((fName) => (
                        <td key={fName} className="border p-2">
                          <Controller
                            name={`widgets.${index}.${fName}`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                placeholder={fName}
                                errorContent={
                                  errors?.widgets?.[index]?.[fName]?.message
                                }
                              />
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}
          {/* Advance Configurations */}
          {/* <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
           Advance Configurations
          </h5>
          <div className="my-4 flex flex-col gap-4">
            <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                    Height
                  </h6>
                </div>
                <Controller
                  name="height"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter height of the Section"
                      errorContent={errors?.height?.message}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                    Background Color
                  </h6>
                </div>
                <Controller
                  name="backgroundColor"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Background Color of the Section"
                      errorContent={errors?.backgroundColor?.message}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                    Padding
                  </h6>
                </div>
                <Controller
                  name="padding"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Padding of the Section"
                      errorContent={errors?.padding?.message}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                    Border Radius
                  </h6>
                </div>
                <Controller
                  name="borderRadius"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Border Radius of the Section"
                      errorContent={errors?.borderRadius?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div> */}
          {/* API Configurations */}
          <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            API Configurations
          </h5>
          <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
            <div className="flex justify-between items-center gap-2">
              <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                API Endpoint
              </h6>
              <Controller
                name="apiEndpoint"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter API Endpoint of the Section"
                    errorContent={errors?.apiEndpoint?.message}
                  />
                )}
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                Request Method
              </h6>
              <Controller
                name="requestMethod"
                control={control}
                render={({ field }) => (
                  <div className="min-w-[210px]">
                    <Selector
                      {...field}
                      placeholder="Select Request Method"
                      options={methodOptions}
                      value={
                        methodOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value);
                        trigger("requestMethod");
                      }}
                      errorContent={errors?.requestMethod?.message}
                    />
                  </div>
                )}
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                Refresh Interval
              </h6>
              <Controller
                name="refreshInterval"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Refresh Interval of the Section"
                    errorContent={errors?.refreshInterval?.message}
                  />
                )}
              />
            </div>

            {/* Params Table */}
            {/* <div className="col-span-2">
              <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200 mb-2">
                Params
              </h6>
              <Controller
                name="params"
                control={control}
                render={({ field }) => {
                  const params = Array.isArray(field.value) ? field.value : [];

                  const handleAdd = () => {
                    field.onChange([...params, { key: "", value: "" }]);
                  };

                  const handleRemove = (index) => {
                    const updated = params?.filter((_, i) => i !== index);
                    field.onChange(updated);
                  };

                  const handleChange = (index, key, value) => {
                    const updated = [...params];
                    updated[index][key] = value;
                    field.onChange(updated);
                  };

                  return (
                    <div>
                      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">
                              Key
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">
                              Value
                            </th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b w-[80px]">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {params.map((param, index) => (
                            <tr
                              key={index}
                              className="border-b dark:border-gray-700"
                            >
                              <td className="px-4 py-2">
                                <input
                                  type="text"
                                  value={param.key}
                                  onChange={(e) =>
                                    handleChange(index, "key", e.target.value)
                                  }
                                  className="w-full border rounded px-2 py-1 text-sm"
                                  placeholder="Enter key"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input
                                  type="text"
                                  value={param.value}
                                  onChange={(e) =>
                                    handleChange(index, "value", e.target.value)
                                  }
                                  className="w-full border rounded px-2 py-1 text-sm"
                                  placeholder="Enter value"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <Button
                                  type="button"
                                  onClick={() => handleRemove(index)}
                                  outLine={true}
                                  className="!px-2 !py-1 text-xs"
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {params.length === 0 && (
                            <tr>
                              <td
                                colSpan={3}
                                className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm"
                              >
                                No params added
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      <div className="flex justify-end mt-3">
                        <button
                          type="button"
                          onClick={handleAdd}
                          className="!text-sm"
                        >
                          + Add Param
                        </button>
                      </div>

                      {errors?.params && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.params.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div> */}
          </div>

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
      </FormWrapper>
    </section>
  );
};

export default SectionAddEdit;
