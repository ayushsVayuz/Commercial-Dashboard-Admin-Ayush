import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectionSchema } from "../../validation/section-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { readSingleSection } from "../../redux/actions/section-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { decrypt, encrypt } from "../../functions";
import { Selector } from "../../components/select";
import { Toggle } from "../../components/inputs/toogle";
import { sectionPayload } from "../../redux/slices/sectionSlice";

const SectionAddEdit = () => {
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
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(sectionSchema),
    defaultValues: {
      section: "",
      sectionOrder: "",
      isCollapsible: "",
      backgroundColor: "",
      padding: "",
      borderRadius: "",
      apiEndpoint: "",
      requestMethod: "",
      refreshInterval: "",
      params: [],
    },
  });

  useEffect(() => {
    if (isEditMode) {
      // if (sections?.length === 0) {
      dispatch(readSingleSection({ id: id }));
      // }
    }
  }, [isEditMode, id]);

  console.log(payload, "payload data from add");

  useEffect(() => {
    if (isEditMode && singleSection) {
      const section = singleSection;
      reset({
        sectionName: section.name || "",
        sectionOrder: section.order_index || "",
        isCollapsible: section.is_collapsible || false,
        backgroundColor: section.section_config?.backgroundColor || "",
        padding: section.section_config?.padding || "",
        borderRadius: section.section_config?.borderRadius || "",
        apiEndpoint: section.api_endpoint || "",
        requestMethod: section.method,
        refreshInterval: section.refresh_interval || 0,
        params: section.params || [],
      });
    } else {
      const section = payload;
      reset({
        sectionName: section.name || "",
        sectionOrder: section.order_index || "",
        isCollapsible: section.is_collapsible || false,
        backgroundColor: section.section_config?.backgroundColor || "",
        padding: section.section_config?.padding || "",
        borderRadius: section.section_config?.borderRadius || "",
        apiEndpoint: section.api_endpoint || "",
        requestMethod: section.method || {},
        refreshInterval: section.refresh_interval || 0,
        params: section.params || [],
      });
    }
  }, [isEditMode, singleSection, payload, reset]);

  const onSubmit = async (data) => {
    console.log(data, "form data");
    const payload = {
      dashboard_id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
      name: data?.sectionName,
      order_index: data?.sectionOrder,
      is_collapsible: data?.isCollapsible,
      is_collapsed: data?.isCollapsible,
      section_config: {
        backgroundColor: data?.backgroundColor,
        padding: data?.padding,
        borderRadius: data?.borderRadius,
      },
      api_endpoint: data?.apiEndpoint,
      method: data?.requestMethod?.value,
      refresh_interval: data?.refreshInterval,
      response_type: "json",
      params: [],
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
  ];

  console.log(errors, getValues(), "form errors");

  return (
    <>
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
            {/* Section Name Field */}
            <h5 className="mb-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
              General
            </h5>
            <div className="grid sm:grid-cols-2 gap-4">
              <Controller
                name="sectionName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Section Name"
                    type="text"
                    placeholder="Enter Section Name"
                    errorContent={errors?.sectionName?.message}
                  />
                )}
              />

              {/* Section Order */}
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
              />
              {/* Section Order */}
              {/* <Controller
                  name="isCollapsible"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      {...field}
                      label="Section Collapsible"
                      type="text"
                      placeholder="Enter Section Order"
                      errorContent={errors?.url?.message}
                      options={isCollapsibleOptions}
                    />
                  )}
                /> */}
            </div>
            <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
              Configurations
            </h5>
            <div className="my-4 flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <div>
                  <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                    Section Collapsable{" "}
                  </h6>
                  <p className="text-xs text-gray-500">
                    Enable this to make the section collapsable.
                  </p>
                </div>
                <Controller
                  name="isCollapsible"
                  control={control}
                  render={({ field }) => (
                    <Toggle {...field} name="isCollapsible" />
                  )}
                />
              </div>

              <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
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
            </div>

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
              <div className="flex justify-between items-center gap-2">
                <h6 className="!font-medium text-lg !text-[#4D4D4F] dark:text-gray-200">
                  Params
                </h6>

                <Controller
                  name="params"
                  control={control}
                  render={({ field }) => {
                    const selectedValues = Array.isArray(field.value)
                      ? field.value
                      : [];

                    return (
                      <div className="min-w-[210px]">
                        <Selector
                          {...field}
                          placeholder="Select Params"
                          options={paramsOptions}
                          isMulti={true}
                          value={paramsOptions?.filter((option) =>
                            selectedValues.includes(option.value)
                          )}
                          onChange={(selectedOptions) => {
                            const selectedValues =
                              selectedOptions?.map((opt) => opt.value) || [];
                            field.onChange(selectedValues);
                            trigger("params");
                          }}
                          errorContent={errors?.params?.message}
                        />
                      </div>
                    );
                  }}
                />
              </div>
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
    </>
  );
};

export default SectionAddEdit;
