import { useDispatch, useSelector } from "react-redux";
import { TableShimmer } from "../../../components/shimmers/tableShimmer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Selector } from "../../../components/select";
import { Button } from "../../../components/buttons";
import {
  createHelper,
  fetchHelper,
  updateHelperData,
} from "../../../redux/actions/helperMf-action";
import { useEffect } from "react";
import { helperMfSchema } from "../../../validation/helperMf-validation";
import { MetaTitle } from "../../../components/metaTitle";
import { Heading } from "../../../components/heading";
import { FormWrapper } from "../../../components/wrappers/form";
import { Input } from "../../../components/inputs/input";
import toast from "react-hot-toast";
import { decrypt } from "../../../functions";

function HelperAddOrEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const isEditMode = location.pathname.includes("/edit");
  let loading = false;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(helperMfSchema),
    defaultValues: {
      containerId: "",
      type: "",
      bundleURLs: [{ url: "" }],
    },
  });

  const { helperData } = useSelector((state) => state.helper);
  console.log(helperData);

  const options = [
    { label: "Side Bar", value: "sidebar" },
    { label: "Header", value: "header" },
    { label: "Footer", value: "footer" },
  ];

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(
        fetchHelper([{ field: "helperMicroFrontendId", value: decryptedId }])
      );
    }
  }, [decryptedId, isEditMode, dispatch]);

  useEffect(() => {
    if (isEditMode && helperData) {
      const data = helperData[0];
      setValue("containerId", data?.containerId);
      const matchedOption = options.find(
        (option) => option.value === data?.type
      );
      setValue("type", matchedOption);
      setValue(
        "bundleURLs",
        data?.bundleURLs?.map((bundle) => ({ url: bundle.url }))
      );
    }
  }, [isEditMode, helperData, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bundleURLs",
  });

  const onSubmit = async (data) => {
    const formattedData = {
      containerId: data.containerId,
      type: data.type.value,
      bundleURLs: data.bundleURLs.map((bundle) => ({
        url: bundle.url,
      })),
    };
    let res;
    if (isEditMode) {
      // Update action if in edit mode
      res = await dispatch(updateHelperData({ formattedData, decryptedId }));
    } else {
      // Create action for new entry
      res = await dispatch(createHelper(formattedData));
    }
    console.log(res?.payload);
    if (res?.payload?.status != "Error") {
      toast.success(
        `Helper MF ${isEditMode ? "Update" : "Created"} successfully!!`
      );
      navigate("/helper");
    } else {
      toast.error(res?.payload?.message || "Some Error Occurred");
    }
    // navigate("/helper");
  };

  return (
    <>
      <section className="dark:bg-gray-800 dark:h-screen">
        <MetaTitle
          title={
            isEditMode ? "Helper MF Edit | Anarock" : "Helper MF Add | Anarock"
          }
        />

        <Heading
          containerClassName={"my-4"}
          sectionLink="/helperlisting"
          parent="Helper Micro Frontend"
          mainTitle={
            isEditMode
              ? "Edit Helper Micro Frontend"
              : "Create Helper Micro Frontend"
          }
        />
        <FormWrapper>
          {loading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="containerId"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Container Id
                  </label>
                  <Controller
                    name="containerId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="containerId"
                        type="text"
                        placeholder="Enter containerId"
                        // className={`w-full px-3 py-2 border ${
                        //   errors.containerId
                        //     ? "border-red-500"
                        //     : "border-gray-300 dark:border-gray-600"
                        // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                      />
                    )}
                  />
                  {errors.containerId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.containerId.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="type"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Type
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Selector
                        {...field}
                        id="type"
                        placeholder="Select type"
                        options={options}
                        errorContent={errors.type?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bundleURLs"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Bundle Links
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {fields.map((item, index) => (
                    <div key={item.id} className="mb-2 items-center">
                      <Controller
                        name={`bundleURLs.${index}.url`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id={`bundle-${index}`}
                            type="text"
                            placeholder="Enter Bundle Link"
                            // className={`w-full px-3 py-2 border ${
                            //   errors.bundleURLs?.[index]?.url
                            //     ? "border-red-500"
                            //     : "border-gray-300 dark:border-gray-600"
                            // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                          />
                        )}
                      />
                      {errors.bundleURLs?.[index]?.url && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.bundleURLs[index].url.message}
                        </p>
                      )}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500  px-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="text-blue-500"
                onClick={() => append({ url: "" })}
              >
                + Add More
              </button>

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
          isEditMode ? "Helper MF Edit | Anarock" : "Helper MF Add | Anarock"
        }
      />

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {isEditMode
          ? "Edit Helper Micro Frontend"
          : "Create Helper Micro Frontend"}
      </h2>
      {loading ? (
        <TableShimmer />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="containerId"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Container Id
            </label>
            <Controller
              name="containerId"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="containerId"
                  type="text"
                  placeholder="Enter containerId"
                  className={`w-full px-3 py-2 border ${
                    errors.containerId
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                />
              )}
            />
            {errors.containerId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.containerId.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="type"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  id="type"
                  placeholder="Select type"
                  options={options}
                  errorContent={errors.type?.message}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bundleURLs"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Bundle Links
            </label>
            {fields.map((item, index) => (
              <div key={item.id} className="mb-2 flex items-center">
                <Controller
                  name={`bundleURLs.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`bundle-${index}`}
                      type="text"
                      placeholder="Enter Bundle Link"
                      className={`w-full px-3 py-2 border ${
                        errors.bundleURLs?.[index]?.url
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                    />
                  )}
                />
                {errors.bundleURLs?.[index]?.url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bundleURLs[index].url.message}
                  </p>
                )}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500  px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="text-blue-500"
            onClick={() => append({ url: "" })}
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

export default HelperAddOrEdit;
