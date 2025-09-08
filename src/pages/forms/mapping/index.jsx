import { yupResolver } from "@hookform/resolvers/yup";
import { TableShimmer } from "../../../components/shimmers/tableShimmer";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { Selector } from "../../../components/select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveDomains } from "../../../redux/actions/domain-action";
import { fetchActiveMasterConfigs } from "../../../redux/actions/master-config-actions";
import { formMappingSchema } from "../../../validation/form-validation";
import {
  addDomainSpecificForm,
  fetchDomainSpecificForm,
  fetchMasterForm,
} from "../../../redux/actions/form-action";
import { MetaTitle } from "../../../components/metaTitle";
import { Heading } from "../../../components/heading";
import { FormWrapper } from "../../../components/wrappers/form";
import { Input } from "../../../components/inputs";
import { decrypt } from "../../../functions";

function FormMapping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  console.log(decryptedId, "----------------");
  const { masterForm, loading } = useSelector((state) => state.form);
  console.log(masterForm, "master form");
  // let loading = false;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formMappingSchema),
    defaultValues: {
      formId: "",
      domainId: [],
      keys: [{}],
    },
  });

  useEffect(() => {
    const func = async () => {
      // Check if masterForm is already populated to avoid redundant API calls
      if (!masterForm || masterForm.length === 0) {
        await dispatch(
          fetchMasterForm({ field: "masterFormId", value: decryptedId })
        );
      }

      // Ensure that masterForm has data to prevent errors
      if (masterForm && masterForm.length > 0) {
        setValue("formId", masterForm[0]._id);

        const keyOptionsFromKeyIds = masterForm[0]?.keyDetails?.map((key) => ({
          label: key.key,
          value: key.value,
          id: key._id,
        }));

        // Clear existing keys if needed
        setValue("keys", []);

        if (keyOptionsFromKeyIds) {
          keyOptionsFromKeyIds.forEach((keyOption) => {
            append({ key: keyOption });
          });
        }
        const selectedDomain = activeDomains.filter((domain) =>
          masterForm?.[0]?.domainConfigs?.some(
            (data) => data?.domainId == domain._id
          )
        );
        const domainOption = selectedDomain?.map((data) => ({
          label: data?.domain,
          value: data?._id,
        }));
        setValue("domainId", domainOption);
        console.log(domainOption, "domainoptions");
        console.log(selectedDomain, "selectedDomain");
      }
    };

    func();
  }, [dispatch, decryptedId, masterForm]); // Ensure masterForm is in the dependency array

  function setKeyWhenDomainIsUndefined() {
    const keyOptionsFromKeyIds = masterForm[0]?.keyIds?.map((key) => ({
      label: key.key,
      value: key.value,
      id: key._id,
    }));

    // Clear existing keys if needed
    setValue("keys", []);

    if (keyOptionsFromKeyIds) {
      keyOptionsFromKeyIds.forEach((keyOption) => {
        append({ key: keyOption });
      });
    }
  }

  const { activeDomains, loading: domainLoading } = useSelector(
    (state) => state.domain
  );

  const { activeMasterConfig, loading: configLoading } = useSelector(
    (state) => state.masterConfig
  );

  const { domainSpecificListing, loading: domainSpecificLoading } = useSelector(
    (state) => state.form
  );

  const domainsOptions = activeDomains?.map((obj) => ({
    label: obj.domain,
    value: obj._id,
  }));

  useEffect(() => {
    dispatch(fetchDomainSpecificForm());
    dispatch(fetchActiveDomains());
    dispatch(fetchActiveMasterConfigs());
  }, []);

  const domainId = watch("domainId");
  const formId = watch("formId");

  // useEffect(() => {
  //   if (formId) {
  //   }
  // }, [formId]);

  useEffect(() => {
    if (domainId?.value && formId) {
      const domainSpecificData = domainSpecificListing?.find((data) => {
        return (
          // data.masterFormId?._id == formId &&
          data.domainId?._id == domainId.value
        );
      });
      console.log(domainSpecificData, "-------------");

      if (
        domainSpecificData?.keyIds?.length == 0 ||
        domainSpecificData == undefined
      ) {
        setKeyWhenDomainIsUndefined();
        return;
      }
      const keyOptionsFromKeyIds = domainSpecificData?.keyIds.map((key) => ({
        label: key.key,
        value: key.value,
        id: key._id,
      }));
      setValue("keys", []); // Clear existing keys if needed

      // Append each option to the `keys` field
      keyOptionsFromKeyIds?.forEach((keyOption) => {
        append({ key: keyOption });
      });
    }
  }, [domainId, formId]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keys",
  });

  const keyOptions = activeMasterConfig?.map((obj) => ({
    label: obj.key,
    value: obj.value,
    id: obj._id,
  }));

  const isEditMode = location.pathname.includes("/edit");

  const selectedKeys = watch("keys");
  // console.log(selectedKeys, "selectedkeys");

  const getAvailableOptions = (selectedKeys) => {
    return keyOptions.filter((option) => {
      // console.log("Current Option:", option);
      const isSelected = selectedKeys.some((selected) => {
        // console.log("Checking Selected:", selected);
        return selected.key?.id === option.id;
      });
      return !isSelected;
    });
  };

  const onSubmit = (data) => {
    const keyIds = data.keys.map((key) => key.key.id);
    const domainIds = data?.domainId?.map((domain) => domain?.value);
    console.log(data, "data"); // Handle form submission
    const formData = {
      domainIds: domainIds,
      masterFormId: data.formId,
      keyIds: keyIds,
    };
    console.log(formData, "formdata 196");
    dispatch(addDomainSpecificForm(formData));
    navigate("/form");
  };

  return (
    <>
      <section className="dark:bg-gray-800">
        <MetaTitle title={"Master Form Mapping | Anarock"} />
        <Heading
          containerClassName={"my-4"}
          sectionLink="/form"
          parent="Form Mapping with Domain"
          mainTitle={
            isEditMode
              ? "Edit Form Mapping with Domain"
              : "Create Form Mapping with Domain"
          }
        />
        <FormWrapper>
          {loading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="friendlyName"
                    className="block text-gray-700 dark:text-gray-300 "
                  >
                    Form Id
                  </label>
                  <Controller
                    name="formId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="formId"
                        type="text"
                        placeholder="Enter Form Id"
                        // className={`w-full px-3 py-2 border ${
                        //   errors.formId
                        //     ? "border-red-500"
                        //     : "border-gray-300 dark:border-gray-600"
                        // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                      />
                    )}
                  />
                  {errors.formId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.formId.message}
                    </p>
                  )}
                </div>
                <div className="mb-6 w-full flex flex-col">
                  <div className="flex w-full items-center">
                    <div className="flex-grow">
                      <Controller
                        name="domainId"
                        control={control}
                        render={({ field }) => (
                          <Selector
                            {...field}
                            label="Select Domains"
                            placeholder="Select Domains"
                            errorContent={errors.domainId?.message}
                            options={domainsOptions}
                            isMulti={true}
                            loading={domainLoading}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {errors.domainId?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.domainId.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                {fields.map((field, index) => (
                  <div className="mb-6 w-full flex flex-col" key={field.id}>
                    <label
                      htmlFor={`key-${index}`}
                      className="block text-gray-700 dark:text-gray-300 mb-2 mr-2"
                    >
                      {`Key ${index + 1}`}
                    </label>
                    <div className=" w-full items-center">
                      <div className="flex-grow">
                        <Controller
                          name={`keys.${index}.key`}
                          control={control}
                          render={({ field: controllerField }) => (
                            <Selector
                              {...controllerField}
                              id={`key-${index}`}
                              placeholder="Select key"
                              options={getAvailableOptions(selectedKeys)} // Pass selectedKeys to the function
                              loading={configLoading}
                              errorContent={errors.keys?.[index]?.key?.message}
                            />
                          )}
                        />
                      </div>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => remove(index)}
                          aria-label={`Delete Key ${index + 1}`}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    {errors.keys?.[index]?.key && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.keys?.[index]?.key.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* <button
                type="button"
                className="text-blue-500"
                onClick={() => append({ key: "" })}
              >
                + Add More
              </button> */}

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  outLine={true}
                  // className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  mainPrimary={true}
                  // disabled={!isValid}
                  // className={`px-4 py-2 rounded-md ${
                  //   isValid
                  //     ? "bg-blue-600 text-white hover:bg-blue-700"
                  //     : "bg-blue-300 text-blue-100 cursor-not-allowed"
                  // }`}
                >
                  Create
                </Button>
              </div>
            </form>
          )}
        </FormWrapper>
      </section>

      {/* <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <MetaTitle title={"Master Form Mapping | Anarock"} />
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Form Mapping with Domain
        </h2>
        {loading ? (
          <TableShimmer />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="friendlyName"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Form Id
              </label>
              <Controller
                name="formId"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="formId"
                    type="text"
                    placeholder="Enter Form Id"
                    className={`w-full px-3 py-2 border ${
                      errors.formId
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                  />
                )}
              />
              {errors.formId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.formId.message}
                </p>
              )}
            </div>

            <div className="mb-6 w-full flex flex-col">
              <div className="flex w-full items-center">
                <div className="flex-grow">
                  <Controller
                    name="domainId"
                    control={control}
                    render={({ field }) => (
                      <Selector
                        {...field}
                        label="Select Domain"
                        placeholder="Select Domain"
                        errorContent={errors.domainId?.message}
                        options={domainsOptions}
                        loading={domainLoading}
                      />
                    )}
                  />
                </div>
              </div>
              {errors.domainId?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.domainId.message}
                </p>
              )}
            </div>

            <div>
              {fields.map((field, index) => (
                <div className="mb-6 w-full flex flex-col" key={field.id}>
                  <label
                    htmlFor={`key-${index}`}
                    className="block text-gray-700 dark:text-gray-300 mb-2 mr-2"
                  >
                    {`Key ${index + 1}`}
                  </label>
                  <div className="flex w-full items-center">
                    <div className="flex-grow">
                      <Controller
                        name={`keys.${index}.key`}
                        control={control}
                        render={({ field: controllerField }) => (
                          <Selector
                            {...controllerField}
                            id={`key-${index}`}
                            placeholder="Select key"
                            options={getAvailableOptions(selectedKeys)} // Pass selectedKeys to the function
                            loading={configLoading}
                            errorContent={errors.keys?.[index]?.key?.message}
                          />
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => remove(index)}
                        aria-label={`Delete Key ${index + 1}`}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {errors.keys?.[index]?.key && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.keys?.[index]?.key.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="text-blue-500"
              onClick={() => append({ key: "" })}
            >
              + Add More
            </button>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                mainPrimary={true}
                disabled={!isValid}
                className={`px-4 py-2 rounded-md ${
                  isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-300 text-blue-100 cursor-not-allowed"
                }`}
              >
                Create
              </Button>
            </div>
          </form>
        )}
      </div> */}
    </>
  );
}

export default FormMapping;
