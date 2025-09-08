// src/pages/routeMF/RouteMFAddOrEdit.jsx
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { routeMFSchema } from "../../validation/routeMF-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  createMFMapping,
  fetchMFMappings,
  updateMFMapping,
} from "../../redux/actions/routeMF-actions";
import { fetchActiveDomains } from "../../redux/actions/domain-action";
import { Selector } from "../../components/select";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input"; // Import the custom Input component
import { fetchActiveHelper } from "../../redux/actions/helperMf-action";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import toast from "react-hot-toast";
import { decrypt } from "../../functions";

const RouteMFAddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  const isEditMode = location.pathname.includes("/edit");
  console.log(isEditMode);
  const [bundleLinks, setBundleLinks] = useState([]);
  // console.log(bundleLinks);
  const [mf, setMf] = useState(null);
  const [domainOptions, setDomainOptions] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(routeMFSchema(bundleLinks.length)),
    defaultValues: {
      route: "",
      containerId: "",
      domain: "",
    },
  });

  const { mfMappings, loading, error } = useSelector(
    (state) => state.mfMapping
  );
  const { activeDomains, loading: domainLoading } = useSelector(
    (state) => state.domain
  );
  const { helperData, loading: helperLoading } = useSelector(
    (state) => state.helper
  );
  console.log(mfMappings, "mfmapping");
  console.log(helperData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mfMappings[0]?.helperIds?.length > 0 && helperData?.length > 0) {
      if (isEditMode) {
        mfMappings[0]?.helperIds?.map((data) => {
          // console.log(data);
          setValue(data._id, true);
        });
      }
    }
  }, [mfMappings, isEditMode, helperData]);

  useEffect(() => {
    dispatch(fetchActiveDomains());
    dispatch(fetchActiveHelper());
  }, [dispatch]);

  useEffect(() => {
    if (activeDomains.length > 0) {
      // console.log(activeDomains);
      const options = activeDomains.map((obj) => ({
        label: obj.domain,
        value: obj._id,
      }));
      setDomainOptions(options);
    }
  }, [activeDomains]);

  useEffect(() => {
    if (isEditMode && decryptedId && mfMappings.length > 0) {
      const mfToSet =
        mfMappings.length > 1
          ? mfMappings.filter(
              (obj) => obj.routeMicroFrontendMappingId === decryptedId
            )
          : mfMappings;

      if (mfToSet.length > 0) {
        setMf(mfToSet[0]);
      }
    }
  }, [isEditMode, decryptedId, mfMappings]);

  useEffect(() => {
    if (isEditMode && mfMappings.length === 0) {
      dispatch(
        fetchMFMappings([
          { field: "routeMicroFrontendMappingId", value: decryptedId },
        ])
      );
    }
  }, [dispatch, isEditMode, decryptedId, mfMappings.length]);

  useEffect(() => {
    if (isEditMode && mf && domainOptions.length > 0) {
      const selectedDomain = domainOptions.find(
        (obj) => obj.value === mf.domainId
      );
      const existingRouteMF = {
        route: mf.route,
        containerId: mf.containerId,
        domain: selectedDomain,
        bundleLink: mf.bundleURLs.map((obj) => obj.url) || [""],
      };

      setValue("route", existingRouteMF.route);
      setValue("containerId", existingRouteMF.containerId);
      setValue("domain", existingRouteMF.domain);
      existingRouteMF.bundleLink.forEach((str, index) => {
        setValue(`bundleLink${index}`, str);
      });
      setBundleLinks(existingRouteMF.bundleLink);

      // if (mf.helperIds && Array.isArray(mf.helperIds)) {
      //   mf.helperIds.forEach((helperId) => {
      //     setValue(helperId, true); // assuming the checkbox name corresponds to the helper ID
      //   });
      // }
    }
  }, [isEditMode, mf, domainOptions, setValue]);

  useEffect(() => {
    if (!loading && isEditMode) {
      trigger();
    }
  }, [bundleLinks, mf, activeDomains, loading, isEditMode, trigger]);

  const onSubmit = async (data) => {
    try {
      let res;
      console.log(data, "data from on submit");
      const helperIds = Object.keys(data).filter((key) => {
        return helperData.some(
          (item) => item._id === key && data[key] === true
        );
      });
      console.log(helperIds, "helper id from on submit");
      const bundleURLsTemp = bundleLinks.map((str) => ({ url: str }));

      if (isEditMode) {
        res = await dispatch(
          updateMFMapping({
            mfMappingId: decryptedId,
            updatedData: {
              route: data.route,
              containerId: data.containerId,
              bundleURLs: bundleURLsTemp,
              domainId: data.domain.value,
              helperIds,
            },
          })
        );
      } else {
        res = await dispatch(
          createMFMapping({
            route: data.route,
            containerId: data.containerId,
            bundleURLs: bundleURLsTemp,
            domainId: data.domain.value,
            helperIds,
          })
        );
      }

      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate("/routeMF");
      } else if (res?.payload?.code === 500) {
        // Display a specific error message if available
        toast.error(
          res.payload.message || "An error occurred while submitting."
        );
      }
    } catch (error) {
      // Log the error and show the toast
      console.error("Submission error:", error);
      toast.error(
        "Submission error: " + error.message || "An unexpected error occurred."
      );
    }
  };
  const handleCancel = () => {
    reset();
    navigate("/routeMF");
  };

  const handleAddBundleLink = () => {
    setBundleLinks([...bundleLinks, ""]);
  };

  const handleBundleLinkChange = (index, value) => {
    const updatedLinks = [...bundleLinks];
    updatedLinks[index] = value;
    setBundleLinks(updatedLinks);
  };

  const handleDeleteBundleLink = (index) => {
    const updatedLinks = bundleLinks.filter((_, i) => i !== index);
    setBundleLinks(updatedLinks);
  };

  useEffect(() => {
    if (bundleLinks && bundleLinks.length > 0) {
      bundleLinks.forEach((str, index) => {
        setValue(`bundleLink${index}`, str);
      });
      trigger();
    }
  }, [bundleLinks, setValue]);

  return (
    <>
      <section className="dark:bg-gray-800 dark:h-screen">
        <MetaTitle
          title={`Route MF ${isEditMode ? "Edit" : "Add"} | Anarock`}
        />

        <Heading
          containerClassName={"my-4"}
          sectionLink="/routeMF"
          parent="Route MF Mapping"
          mainTitle={
            isEditMode ? "Edit Route MF Mapping" : "Create Route MF Mapping"
          }
        />
        <FormWrapper>
          {loading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <Controller
                    name="route"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Route"
                        type="text"
                        placeholder="Enter Route (e.g., /api/v1/users)"
                        errorContent={errors.route?.message}
                      />
                    )}
                  />
                </div>
                <div className="mb-4">
                  <Controller
                    name="containerId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Container ID"
                        type="text"
                        placeholder="Enter Container ID"
                        errorContent={errors.containerId?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Controller
                  name="domain"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      {...field}
                      label="Select Domain"
                      placeholder="Select Domain"
                      errorContent={errors.domain?.message}
                      options={domainOptions}
                      loading={domainLoading}
                    />
                  )}
                />
                <div className="flex flex-col my-4 gap-2 ">
                  <label className="text-base">
                    Attach Helper Micro Frontend
                  </label>
                  <div className="flex gap-4">
                    {helperData?.map((item) => (
                      <>
                        {/* {console.log(item._id)} */}
                        <Controller
                          key={item._id}
                          name={item._id}
                          control={control}
                          render={({ field }) => (
                            <label className="dark:text-white">
                              <input
                                type="checkbox"
                                {...field}
                                value={item._id}
                                defaultChecked={
                                  isEditMode &&
                                  mfMappings[0]?.helperIds?.some((data) => {
                                    return data._id === item._id;
                                  })
                                }
                                className="mr-2 dark:text-white"
                              />
                              {item.type.charAt(0).toUpperCase() +
                                item.type.slice(1)}
                            </label>
                          )}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6 ">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Bundle Links
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                  {bundleLinks.map((link, index) => (
                    <div key={index} className=" items-center mb-2">
                      <Controller
                        name={`bundleLink${index}`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={`Bundle Link ${index + 1}`}
                            type="text"
                            value={link}
                            onChange={(e) =>
                              handleBundleLinkChange(index, e.target.value)
                            }
                            errorContent={errors[`bundleLink${index}`]?.message}
                          />
                        )}
                      />
                      {bundleLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteBundleLink(index)}
                          className="ml-2 text-red-600 dark:text-red-400"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddBundleLink}
                  className="text-blue-600 dark:text-blue-400"
                >
                  + Add Another Link
                </button>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  outLine={true}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" mainPrimary={true} disabled={!isValid}>
                  {isEditMode ? "Update" : "Save"}
                </Button>
              </div>
            </form>
          )}
        </FormWrapper>
      </section>

      {/* <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <MetaTitle title={"Route MF Add/Edit | Anarock"} />
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          {isEditMode ? "Edit Route MF Mapping" : "Create Route MF Mapping"}
        </h2>
        {loading ? (
          <TableShimmer />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Controller
                name="route"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Route"
                    type="text"
                    placeholder="Enter Route (e.g., /api/v1/users)"
                    errorContent={errors.route?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="containerId"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Container ID"
                    type="text"
                    placeholder="Enter Container ID"
                    errorContent={errors.containerId?.message}
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
                  options={domainOptions}
                  loading={domainLoading}
                />
              )}
            />
            <div className="flex flex-col my-4 gap-2 ">
              <label className="text-xl">Attach Helper Micro Frontend</label>
              <div className="flex gap-4">
                {helperData?.map((item) => (
                  <Controller
                    key={item._id}
                    name={item._id}
                    control={control}
                    render={({ field }) => (
                      <label className="dark:text-white">
                        <input
                          type="checkbox"
                          {...field}
                          value={item._id}
                          className="mr-2 dark:text-white"
                        />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Bundle Links
              </label>
              {bundleLinks.map((link, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Controller
                    name={`bundleLink${index}`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={`Bundle Link ${index + 1}`}
                        type="text"
                        value={link}
                        onChange={(e) =>
                          handleBundleLinkChange(index, e.target.value)
                        }
                        errorContent={errors[`bundleLink${index}`]?.message}
                      />
                    )}
                  />
                  {bundleLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteBundleLink(index)}
                      className="ml-2 text-red-600 dark:text-red-400"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddBundleLink}
                className="text-blue-600 dark:text-blue-400"
              >
                + Add Another Link
              </button>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid}>
                Save
              </Button>
            </div>
          </form>
        )}
      </div> */}
    </>
  );
};

export default RouteMFAddOrEdit;
