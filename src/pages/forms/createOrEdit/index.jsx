import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TableShimmer } from "../../../components/shimmers/tableShimmer";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/buttons";
import { Selector } from "../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { formSchema } from "../../../validation/form-validation";
import {
  addFormData,
  fetchMasterForm,
  updateFormData,
} from "../../../redux/actions/form-action";
import { fetchMasterConfigs } from "../../../redux/actions/master-config-actions";
import { MetaTitle } from "../../../components/metaTitle";
import { Heading } from "../../../components/heading";
import { FormWrapper } from "../../../components/wrappers/form";
import { Input } from "../../../components/inputs/input";
import toast from "react-hot-toast";
import { decrypt } from "../../../functions";

function FormCreateOrEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const { masterForm, loading, error } = useSelector((state) => state.form);
  const isEditMode = location.pathname.includes("/edit");
  console.log(error, "error from create");
  const { masterConfigs, loading: keyLoading } = useSelector(
    (state) => state.masterConfig
  );

  useEffect(() => {
    dispatch(fetchMasterConfigs([]));
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues: {
      friendlyName: "",
      uniqueId: "",
      keys: [{}],
    },
  });

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchMasterForm({ field: "masterFormId", value: decryptedId }));
    }
  }, [isEditMode, dispatch, decryptedId]);

  useEffect(() => {
    if (isEditMode && masterForm) {
      const form = masterForm[0];
      console.log(form);
      const newKeyIds = form?.keyDetails.map((key) => ({
        key: {
          id: key._id,
          label: key.key,
          value: key.value,
        },
      }));
      setValue("friendlyName", form?.name);
      setValue("uniqueId", form?.uniqueKey);
      setValue("keys", newKeyIds);
    }
  }, [masterForm, isEditMode, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keys",
  });

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  // Ensure keyOptions are coming from masterConfigs
  const keyOptions = masterConfigs?.map((obj) => ({
    label: obj.key,
    value: obj.value,
    id: obj._id,
  }));

  const getAvailableOptions = (fields, currentIndex) => {
    const selectedKeys = fields
      .map((field, index) => (index !== currentIndex ? field.key?.id : null))
      .filter(Boolean);

    return keyOptions.filter((option) => !selectedKeys.includes(option.id));
  };

  const onSubmit = async (data) => {
    const keyIds = data.keys.map((key) => key.key.id);

    const formattedData = {
      name: data.friendlyName,
      uniqueId: data.uniqueId,
      keyIds: keyIds,
    };
    console.log(formattedData);
    let res;
    if (isEditMode) {
      console.log(decryptedId, "decryptedId");
      res = await dispatch(updateFormData({ formattedData, id: decryptedId }));
    } else {
      res = await dispatch(addFormData(formattedData));
    }

    // console.log(error, "++++++++++");
    // if (error) {
    //   toast.error(error);
    //   return;
    // }
    // navigate("/form");
    if (res?.payload?.status != "Error") {
      toast.success(`Form ${isEditMode ? "Update" : "Created"} successfully!!`);
      navigate("/form");
    } else {
      toast.error(res?.payload?.message || "Some Error Occurred");
    }
  };

  return (
    <>
      {/* {error && toast.error(error)} */}
      <section className="dark:bg-gray-800 dark:h-screen">
        <MetaTitle
          title={
            isEditMode
              ? "Master Form Edit | Anarock"
              : "Master Form Add | Anarock"
          }
        />

        <Heading
          containerClassName={"my-4"}
          sectionLink="/form"
          parent="Form Listing"
          mainTitle={isEditMode ? "Edit Form" : "Create Form"}
        />
        <FormWrapper>
          {keyLoading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="friendlyName"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Friendly Name
                  </label>
                  <Controller
                    name="friendlyName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="friendlyName"
                        type="text"
                        placeholder="Enter Friendly Name"
                        // className={`w-full px-3 py-2 border ${
                        //   errors.friendlyName
                        //     ? "border-red-500"
                        //     : "border-gray-300 dark:border-gray-600"
                        // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                      />
                    )}
                  />
                  {errors.friendlyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.friendlyName.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="uniqueId"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Unique Id
                  </label>
                  <Controller
                    name="uniqueId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="uniqueId"
                        type="text"
                        placeholder="Enter Unique Id"
                        // className={`w-full px-3 py-2 border ${
                        //   errors.uniqueId
                        //     ? "border-red-500"
                        //     : "border-gray-300 dark:border-gray-600"
                        // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                      />
                    )}
                  />
                  {errors.uniqueId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.uniqueId.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div className="">
                    <div className="mb-6 w-full flex flex-col " key={field.id}>
                      <label
                        htmlFor={`key-${index}`}
                        className="block text-gray-700 dark:text-gray-300 mb-2 mr-2"
                      >
                        {`Key ${index + 1}`}
                      </label>
                      <div className="mb-2 w-full items-center">
                        <div className="flex-grow mb-2">
                          <Controller
                            name={`keys.${index}.key`}
                            control={control}
                            render={({ field: controllerField }) => (
                              <Selector
                                {...controllerField}
                                id={`key-${index}`}
                                placeholder="Select key"
                                options={getAvailableOptions(fields, index)}
                                loading={keyLoading}
                                errorContent={
                                  errors.keys?.[index]?.key?.message
                                }
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
                  outLine={true}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
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
                  {isEditMode ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          )}
        </FormWrapper>
      </section>

      {/* <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <MetaTitle
        title={
          isEditMode
            ? "Master Form Edit | Anarock"
            : "Master form Add | Anarock"
        }
      />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {isEditMode ? "Edit Form" : "Create Form"}
      </h2>
      {keyLoading ? (
        <TableShimmer />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="friendlyName"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Friendly Name
            </label>
            <Controller
              name="friendlyName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="friendlyName"
                  type="text"
                  placeholder="Enter Friendly Name"
                  className={`w-full px-3 py-2 border ${
                    errors.friendlyName
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                />
              )}
            />
            {errors.friendlyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.friendlyName.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="uniqueId"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Unique Id
            </label>
            <Controller
              name="uniqueId"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="uniqueId"
                  type="text"
                  placeholder="Enter Unique Id"
                  className={`w-full px-3 py-2 border ${
                    errors.uniqueId
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                />
              )}
            />
            {errors.uniqueId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.uniqueId.message}
              </p>
            )}
          </div>

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
                        options={getAvailableOptions(fields, index)}
                        loading={keyLoading}
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
                    delete
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
              {isEditMode ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      )}
    </div> */}
    </>
  );
}

export default FormCreateOrEdit;
