import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { domainSchema } from "../../validation/domain-validator";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  createDomain,
  fetchDomains,
  updateDomain,
} from "../../redux/actions/domain-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import { decrypt, encrypt } from "../../functions";

const DomainAddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const decryptedId = decrypt(id);
  console.log(decryptedId);
  const isEditMode = location.pathname.includes("/edit");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(domainSchema),
    defaultValues: {
      domainName: "",
      url: "",
    },
  });

  const { domains, error, loading } = useSelector((state) => state.domain);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode) {
      if (domains?.length === 0) {
        console.log(domains, "domm22");
        dispatch(fetchDomains([{ field: "domainId", value: decryptedId }]));
      }
    }
  }, [isEditMode, dispatch, id, domains?.length]);

  useEffect(() => {
    if (isEditMode && domains?.length > 0) {
      const domainToSet = domains.find((obj) => obj.domainId === decryptedId);
      setSelectedDomain(domainToSet || null);
    }
  }, [domains, decryptedId, isEditMode]);

  useEffect(() => {
    console.log(isEditMode, selectedDomain, "domm");

    if (isEditMode && selectedDomain) {
      const existingDomainData = {
        domainName: selectedDomain?.domain,
        url: selectedDomain?.domainLink,
      };

      console.log(existingDomainData, "domm");

      setValue("domainName", existingDomainData.domainName);
      setValue("url", existingDomainData.url);
    }
  }, [isEditMode, selectedDomain, setValue]);

  const onSubmit = async (data) => {
    try {
      let res;
      if (isEditMode) {
        res = await dispatch(
          updateDomain({
            domainId: decryptedId,
            updatedData: {
              domain: data.domainName,
              domainLink: data.url,
            },
          })
        );
      } else {
        res = await dispatch(
          createDomain({
            domain: data.domainName,
            domainLink: data.url,
          })
        );
      }

      if (res?.payload?.code === 200 || res?.payload?.code === 201) {
        navigate("/domain");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/domain");
  };

  return (
    <>
      <section className="dark:bg-gray-800 dark:h-screen ">
        <MetaTitle title={`Domain ${isEditMode ? "Edit" : "Add"} | Anarock`} />
        <Heading
          containerClassName={"my-4"}
          sectionLink="/domain"
          parent="Domain"
          mainTitle={isEditMode ? "Edit Domain" : "Create Domain"}
        />
        <FormWrapper>
          {loading ? (
            <TableShimmer />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Domain Name Field */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="mb-4">
                  <Controller
                    name="domainName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Domain Name"
                        type="text"
                        placeholder="Enter Domain Name"
                        errorContent={errors?.domainName?.message}
                      />
                    )}
                  />
                </div>

                {/* URL Field */}
                <div className="mb-6">
                  <Controller
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="URL"
                        type="text"
                        placeholder="Enter URL"
                        errorContent={errors?.url?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" onClick={handleCancel} outLine={true}>
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
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </form>
          )}
        </FormWrapper>
      </section>

      {/* <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <MetaTitle title={"Domain Add or Edit | Anarock"} />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        {isEditMode ? "Edit Domain" : "Create Domain"}
      </h2>
      {loading ? (
        <TableShimmer />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-4">
            <Controller
              name="domainName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Domain Name"
                  type="text"
                  placeholder="Enter Domain Name"
                  errorContent={errors?.domainName?.message}
                />
              )}
            />
          </div>

         
          <div className="mb-6">
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="URL"
                  type="text"
                  placeholder="Enter URL"
                  errorContent={errors?.url?.message}
                />
              )}
            />
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
              mainPrimary={true} // Assuming `mainPrimary` applies primary styling
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
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </form>
      )}
    </div> */}
    </>
  );
};

export default DomainAddOrEdit;
