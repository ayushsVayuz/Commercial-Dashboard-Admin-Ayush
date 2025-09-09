import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectionSchema } from "../../validation/section-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  readSection,
  updateSection,
} from "../../redux/actions/section-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { decrypt, encrypt } from "../../functions";
import { Selector } from "../../components/select";
import { Toggle } from "../../components/inputs/toogle";

const SectionAddEdit = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = location.pathname.includes("/edit");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
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
      params: "",
    },
  });

  const { sections, error, loading } = useSelector((state) => state.section);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode) {
      if (sections?.length === 0) {
        console.log(sections, "domm22");
        dispatch(readSection([{ field: "domainId", value: id }]));
      }
    }
  }, [isEditMode, dispatch, id, sections?.length]);

  useEffect(() => {
    if (isEditMode && sections?.length > 0) {
      const domainToSet = sections.find((obj) => obj.domainId === id);
      setSelectedDomain(domainToSet || null);
    }
  }, [sections, id, isEditMode]);

  useEffect(() => {
    console.log(isEditMode, selectedDomain, "domm");

    if (isEditMode && selectedDomain) {
      const existingDomainData = {
        sectionName: selectedDomain?.section,
        url: selectedDomain?.domainLink,
      };

      console.log(existingDomainData, "domm");

      setValue("domainName", existingDomainData.domainName);
      setValue("url", existingDomainData.url);
    }
  }, [isEditMode, selectedDomain, setValue]);

  const onSubmit = async (data) => {
    console.log(data, "form data");
    try {
      const payload = {
        section: data?.sectionName,
        sectionOrder: data?.sectionOrder,
        isCollapsible: data?.isCollapsible,
        backgroundColor: data?.backgroundColor,
        padding: data?.padding,
        borderRadius: data?.borderRadius,
        apiEndpoint: data?.apiEndpoint,
        requestMethod: data?.requestMethod,
        refreshInterval: data?.refreshInterval,
        params: data?.params?.map((p) => p.value) || [],
      };

      let res;
      if (isEditMode) {
        res = await dispatch(
          updateSection({ sectionId: id, updatedData: payload })
        );
      } else {
        res = await dispatch(createSection(payload));
      }

      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate("/section");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/section");
  };

  const isCollapsibleOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

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
          {loading ? (
            <TableShimmer />
          ) : (
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
                          errorContent={errors?.url?.message}
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
                          errorContent={errors?.url?.message}
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
                          errorContent={errors?.url?.message}
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
                        errorContent={errors?.url?.message}
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
                          options={[
                            { label: "GET", value: "GET" },
                            { label: "POST", value: "POST" },
                          ]}
                          placeholder="Select Request Method"
                          errorContent={errors?.url?.message}
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
                        errorContent={errors?.url?.message}
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
                    render={({ field }) => (
                      <div className="min-w-[210px]">
                        <Selector
                          {...field}
                          options={[
                            { label: "GET", value: "GET" },
                            { label: "POST", value: "POST" },
                          ]}
                          placeholder="Select Params"
                          isMulti={true}
                          errorContent={errors?.url?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <Button type="button" onClick={handleCancel} outLine={true}>
                  Cancel
                </Button>
                <Button type="submit" mainPrimary={true} disabled={!isValid}>
                  {isEditMode ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          )}
        </FormWrapper>
      </section>
    </>
  );
};

export default SectionAddEdit;
