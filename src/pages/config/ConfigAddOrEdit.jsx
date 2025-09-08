import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/buttons";
import { configSchema } from "../../validation/config-validator";
import { useDispatch, useSelector } from "react-redux";
import {
  createDomainConfig,
  fetchDomainConfigs,
  updateDomainConfig,
} from "../../redux/actions/config-actions";
import { fetchMasterConfigs } from "../../redux/actions/master-config-actions";

import {
  fetchActiveDomains,
  fetchDomains,
} from "../../redux/actions/domain-action";
import {
  fetchActiveRegex,
  fetchRegex,
} from "../../redux/actions/regex-actions";
import { Selector } from "../../components/select";
import { Input } from "../../components/inputs/input"; // Import custom Input component
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { decrypt } from "../../functions";

const ConfigAddOrEdit = () => {
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
    resolver: yupResolver(configSchema),
    defaultValues: {
      key: "",
      value: "",
      domain: "",
      regex: "",
    },
  });

  const { masterConfigs, loading: masterConfigLoading } = useSelector(
    (state) => state.masterConfig
  );
  const {
    domains,
    activeDomains,
    loading: domainLoading,
  } = useSelector((state) => state.domain);
  const {
    configs,
    loading,
    error: sliceError,
  } = useSelector((state) => state.config);
  const { activeRegex: regexes, loading: regexLoading } = useSelector(
    (state) => state.regex
  );

  const [config, setConfig] = useState(null);

  console.log(regexes, " reer");

  useEffect(() => {
    if (isEditMode && decryptedId) {
      dispatch(
        fetchDomainConfigs([
          { field: "domainSpecificConfigId", value: decryptedId },
        ])
      );
    }
    dispatch(fetchMasterConfigs([]));
    dispatch(fetchActiveDomains());
    dispatch(fetchActiveRegex());
  }, [dispatch]);

  useEffect(() => {

    if (configs?.length > 0) {
      const selectedConfig = configs.find(
        (obj) => obj.domainSpecificConfigId === decryptedId
      );
      setConfig(selectedConfig);
    }
  }, [configs, decryptedId]);

  console.log(config, configs, decryptedId, 'issue');



  useEffect(() => {
    if (isEditMode && config && domainsOptions && regexOptions && keyOptions) {
      const selectedDomain = domainsOptions.find(
        (obj) => obj.value === config.domainId
      );
      const selectedKey = keyOptions.find(
        (obj) => obj.value === config.key._id
      );
      const selectedRegex = regexOptions.find(
        (obj) => obj.value === config.regexId
      );

      if (selectedKey) {
        setValue("key", selectedKey);
        setValue("value", config.value);
      }
      if (selectedDomain) {
        setValue("domain", selectedDomain);
      }
      if (selectedRegex) {
        setValue("regex", selectedRegex);
      }
    }
  }, [isEditMode, config, domains, masterConfigs, regexes, setValue]);

  const onSubmit = async (data) => {
    try {
      let res;
      const payload = {
        key: data.key.value,
        value: data.value,
        regexId: data.regex.value,
        domainId: data.domain.value,
      };

      if (isEditMode) {
        res = await dispatch(
          updateDomainConfig({
            domainSpecificConfigId: decryptedId,
            updatedData: payload,
          })
        );
      } else {
        res = await dispatch(createDomainConfig(payload));
      }

      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate("/config");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/config");
  };

  const keyOptions = masterConfigs?.map((obj) => ({
    label: obj.key,
    value: obj._id,
  }));
  const domainsOptions = activeDomains?.map((obj) => ({
    label: obj.domain,
    value: obj._id,
  }));
  const regexOptions = regexes?.map((obj) => ({
    label: obj.name,
    value: obj._id,
  }));

  return (
    <>
      <section className="dark:bg-gray-800 dark:h-screen">
        <MetaTitle title={`Config ${isEditMode ? "Edit" : "Add"} | Anarock`} />
        <Heading
          containerClassName={"my-4"}
          sectionLink="/config"
          parent="Config"
          mainTitle={isEditMode ? "Edit Config" : "Create Config"}
        />
        <FormWrapper>
          {loading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  name="key"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      {...field}
                      label="Select Key"
                      placeholder="Select Key"
                      errorContent={errors.key?.message}
                      options={keyOptions}
                      loading={masterConfigLoading}
                    />
                  )}
                />

                {/* Updated Input component for Value field */}
                <div className="mb-4">
                  <Controller
                    name="value"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Value"
                        type="text"
                        placeholder="Enter Value"
                        errorContent={errors.value?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                <Controller
                  name="domain"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      {...field}
                      label="Select Domain"
                      placeholder="Select Domain"
                      errorContent={errors.domain?.message}
                      options={domainsOptions}
                      loading={domainLoading}
                    />
                  )}
                />

                <Controller
                  name="regex"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      {...field}
                      label="Select Regex (*Optional)"
                      placeholder="Select Regex"
                      errorContent={errors.regex?.message}
                      options={regexOptions}
                      loading={regexLoading}
                    />
                  )}
                />
              </div>

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
                {sliceError && (
                  <p className="text-red-500 text-sm mt-1">{sliceError}</p>
                )}
              </div>
            </form>
          )}
        </FormWrapper>
      </section>

      {/* <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <MetaTitle title={"Config Add/Edit | Anarock"} />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {isEditMode ? "Edit Config" : "Create Config"}
      </h2>
      {loading ? (
        <TableShimmer />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="key"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Select Key"
                placeholder="Select Key"
                errorContent={errors.key?.message}
                options={keyOptions}
                loading={masterConfigLoading}
              />
            )}
          />

          <div className="mb-4">
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Value"
                  type="text"
                  placeholder="Enter Value"
                  errorContent={errors.value?.message}
                />
              )}
            />
          </div>

          <Controller
            name="domain"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Select Domain"
                placeholder="Select Domain"
                errorContent={errors.domain?.message}
                options={domainsOptions}
                loading={domainLoading}
              />
            )}
          />

          <Controller
            name="regex"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Select Regex (*Optional)"
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
            {sliceError && (
              <p className="text-red-500 text-sm mt-1">{sliceError}</p>
            )}
          </div>
        </form>
      )}
    </div> */}
    </>
  );
};

export default ConfigAddOrEdit;
