import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { masterConfigSchema } from "../../validation/masterConfig-validator";
import { Button } from "../../components/buttons";
import { Input } from "../../components/inputs/input"; // <-- Import your custom Input component
import { useDispatch, useSelector } from "react-redux";
import {
  createMasterConfig,
  fetchMasterConfigs,
  updateMasterConfig,
} from "../../redux/actions/master-config-actions";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import {
  fetchActiveRegex,
  fetchRegex,
} from "../../redux/actions/regex-actions";
import { Selector } from "../../components/select";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { decrypt } from "../../functions";

const MasterConfigAddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const decryptedId = decrypt(id);

  const isEditMode = location.pathname.includes("/edit");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(masterConfigSchema),
    defaultValues: {
      key: "",
      value: "",
      regex: "",
    },
  });

  const { masterConfigs, loading: configLoading } = useSelector(
    (state) => state.masterConfig
  );
  const { activeRegex: regexes, loading: regexLoading } = useSelector(
    (state) => state.regex
  );

  const [masterConfig, setMasterConfig] = useState(null);
  const [regexOptions, setRegexOptions] = useState([]);

  console.log(regexes, "rere");

  useEffect(() => {
    if (isEditMode && decryptedId) {
      dispatch(
        fetchMasterConfigs([{ field: "masterConfigId", value: decryptedId }])
      );
    }
    dispatch(fetchActiveRegex());
    // dispatch(fetchRegex([]));
  }, [dispatch, isEditMode, decryptedId]);

  useEffect(() => {
    if (isEditMode && masterConfigs.length > 0) {
      const selectedConfig = masterConfigs.find(
        (obj) => obj.masterConfigId === decryptedId
      );
      setMasterConfig(selectedConfig);
    }
  }, [isEditMode, masterConfigs, decryptedId]);

  useEffect(() => {
    if (regexes?.length > 0) {
      const options = regexes?.map((obj) => ({
        label: obj.name,
        value: obj._id,
      }));
      setRegexOptions(options);
    }
  }, [regexes]);

  useEffect(() => {
    if (isEditMode && masterConfig && regexOptions.length > 0) {
      const selectedRegex = regexOptions.find(
        (opt) => opt.value === masterConfig.regexId
      );
      const existingConfig = {
        key: masterConfig.key,
        value: masterConfig.value,
        regex: selectedRegex || null,
      };
      setValue("key", existingConfig.key);
      setValue("value", existingConfig.value);
      setValue("regex", existingConfig.regex);
    }
  }, [isEditMode, masterConfig, regexOptions, setValue]);

  const onSubmit = async (data) => {
    try {
      let res;
      const payload = {
        key: data.key,
        value: data.value,
        regexId: data.regex?.value,
      };

      if (isEditMode) {
        res = await dispatch(
          updateMasterConfig({
            masterConfigId: decryptedId,
            updatedData: payload,
          })
        );
      } else {
        res = await dispatch(createMasterConfig(payload));
      }

      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate("/masterConfig");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/masterConfig");
  };

  return (
    <>
      <section className="dark:bg-gray-800 dark:h-screen">
        <MetaTitle
          title={`Master Config ${isEditMode ? "Edit" : "Add"} | Anarock`}
        />
        <Heading
          containerClassName={"my-4"}
          sectionLink="/masterConfig"
          parent="Master Config"
          mainTitle={isEditMode ? "Edit Master Config" : "Create Master Config"}
        />
        <FormWrapper>
          {configLoading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid sm:grid-cols-2 grid-cols-1  gap-4 ">
                {/* Key Field */}
                <Controller
                  name="key"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Key"
                      placeholder="Enter Key"
                      errorContent={errors.key?.message}
                    />
                  )}
                />

                {/* Value Field */}
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Value"
                      placeholder="Enter Value"
                      errorContent={errors.value?.message}
                    />
                  )}
                />
              </div>

              {/* Regex Selector */}
              <div className="grid sm:grid-cols-2">
                <Controller
                  name="regex"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      {...field}
                      label="Select Regex (Optional)"
                      placeholder="Select Regex"
                      errorContent={errors.regex?.message}
                      options={regexOptions}
                      loading={regexLoading}
                    />
                  )}
                />
              </div>

              {/* Action Buttons */}
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
      <MetaTitle title={"Master Config | Anarock"} />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {isEditMode ? "Edit Master Config" : "Create Master Config"}
      </h2>
      {configLoading ? (
        <TableShimmer />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="key"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Key"
                placeholder="Enter Key"
                errorContent={errors.key?.message}
              />
            )}
          />

          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Value"
                placeholder="Enter Value"
                errorContent={errors.value?.message}
              />
            )}
          />

          <Controller
            name="regex"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Select Regex (Optional)"
                placeholder="Select Regex"
                errorContent={errors.regex?.message}
                options={regexOptions}
                loading={regexLoading}
              />
            )}
          />

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
};

export default MasterConfigAddOrEdit;
