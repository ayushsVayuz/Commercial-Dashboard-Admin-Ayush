import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { regexSchema } from "../../validation/regex-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  addRegex,
  fetchSingleRegex,
  updateRegex,
} from "../../redux/actions/regex-actions";
import toast from "react-hot-toast";
import { resetRegexState } from "../../redux/slices/regexSlice";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { Input } from "../../components/inputs/input";
import { decrypt } from "../../functions";

const RegexAddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const dispatch = useDispatch();

  const { singleRegex, loading, error, isToggleLoading } = useSelector(
    (state) => state.regex
  );

  const isEditMode = location.pathname.includes("/edit");

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(regexSchema),
    defaultValues: {
      name: "",
      type: "",
      maxLength: "",
      isRequired: false,
    },
  });

  useEffect(() => {
    if (isEditMode && decryptedId) {
      dispatch(fetchSingleRegex(decryptedId));
    }
  }, [isEditMode, decryptedId, dispatch]);

  useEffect(() => {
    if (singleRegex?.length > 0 && isEditMode) {
      setValue("name", singleRegex[0].name);
      setValue(
        "type",
        singleRegex[0].regex
          ? Object.keys(singleRegex[0].regex).find(
              (key) => singleRegex[0].regex[key]
            )
          : ""
      );
      setValue("maxLength", singleRegex[0].maxLength);
      setValue("isRequired", singleRegex[0].isRequired || false);
    }
  }, [singleRegex, setValue]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetRegexState());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    try {
      const regexBody = {
        name: data.name,
        regex: {
          ...(data.type.includes("email") ? { email: true } : {}),
          ...(data.type.includes("phoneNumber") ? { phoneNumber: true } : {}),
          ...(data.type.includes("text") ? { text: true } : {}),
        },
        maxLength: data.maxLength,
        isRequired: data.isRequired,
      };

      let res;
      if (isEditMode) {
        res = await dispatch(updateRegex({ regexId: decryptedId, regexBody }));
      } else {
        res = await dispatch(addRegex(regexBody));
      }

      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate("/regex");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/regex");
  };

  return (
    <>
      <section className="dark:bg-gray-800 dark:h-screen">
        <MetaTitle
          title={isEditMode ? "Edit Regex | Anarock" : "Add Regex | Anarock"}
        />
        <Heading
          containerClassName={"my-4"}
          sectionLink="/regex"
          parent="Regex"
          mainTitle={isEditMode ? "Edit Regex" : "Create Regex"}
        />
        <FormWrapper>
          {loading ? (
            <div className="w-full flex items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}

              <div className="grid sm:grid-cols-2 gap-4 ">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Enter Name"
                        // className={`w-full px-3 py-2 border ${
                        //   errors.name
                        //     ? "border-red-500"
                        //     : "border-gray-300 dark:border-gray-600"
                        // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Type Field (Radio Buttons) */}
                <div className="mb-4">
                  <span className="block text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </span>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-4">
                        {["email", "phoneNumber", "text"].map((type) => (
                          <label key={type} className="flex items-center">
                            <Input
                              type="radio"
                              value={type}
                              checked={field.value === type}
                              onChange={(e) => field.onChange(e.target.value)}
                              // className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Max Length Field */}
              <div className="grid sm:grid-cols-2 gap-4 ">
                <div className="mb-4">
                  <label
                    htmlFor="maxLength"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Max Length
                  </label>
                  <Controller
                    name="maxLength"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="maxLength"
                        type="number"
                        placeholder="Enter Max Length"
                        // className={`w-full px-3 py-2 border ${
                        //   errors.maxLength
                        //     ? "border-red-500"
                        //     : "border-gray-300 dark:border-gray-600"
                        // } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                      />
                    )}
                  />
                  {errors.maxLength && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.maxLength.message}
                    </p>
                  )}
                </div>

                {/* Is Required Field (Checkbox) */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <Controller
                      name="isRequired"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          // className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      )}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      Is Required
                    </span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={handleCancel}
                  outLine={true}
                  // className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  mainPrimary={true}
                  disabled={!isValid}
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

      {/* <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <MetaTitle
        title={isEditMode ? "Edit Regex | Anarock" : "Create Regex | Anarock"}
      />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {isEditMode ? "Edit Regex" : "Create Regex"}
      </h2>
      {loading ? (
        <div className="w-full flex items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  className={`w-full px-3 py-2 border ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <span className="block text-gray-700 dark:text-gray-300 mb-2">
              Type
            </span>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-4">
                  {["email", "phoneNumber", "text"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="maxLength"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Max Length
            </label>
            <Controller
              name="maxLength"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="maxLength"
                  type="number"
                  placeholder="Enter Max Length"
                  className={`w-full px-3 py-2 border ${
                    errors.maxLength
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-100`}
                />
              )}
            />
            {errors.maxLength && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxLength.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <Controller
                name="isRequired"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                )}
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Is Required
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              mainPrimary={true}
              disabled={!isValid || isToggleLoading}
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
};

export default RegexAddOrEdit;
