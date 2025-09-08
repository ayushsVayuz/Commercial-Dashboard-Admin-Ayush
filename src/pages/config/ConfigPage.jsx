import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDomainConfigs,
  updateDomainConfigStatus,
} from "../../redux/actions/config-actions";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { decrypt, encrypt, titleCase } from "../../functions";
import { Heading } from "../../components/heading";

const ConfigPage = () => {
  const dispatch = useDispatch();
  const {
    configs: configData,
    isToggleLoading,
    loading,
    totalPages,
  } = useSelector((state) => state.config);
  useEffect(() => {
    console.log(totalPages);
  }, [totalPages]);
  console.log(totalPages, "totalpages");
  // Selecting data from Redux state
  const [searchParams, setSearchParams] = useSearchParams();

  // Decrypt the values from URL parameters
  const page = parseInt(decrypt(searchParams.get("page"))) || 0;
  const searchValue = decrypt(searchParams.get("search")) || "";

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setSearchParams({
      page: encrypt(currentPage.toString()), // Encrypt the page number
      search: encrypt(searchValue), // Encrypt the search value
    });
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(fetchDomainConfigs([{ field: "query", value: searchValue }])); // Dispatch with decrypted search value
    } else {
      dispatch(fetchDomainConfigs([{ field: "page", value: currentPage + 1 }])); // Dispatch with decrypted page
    }
  }, [currentPage, searchValue]);

  const headers = [
    "No.",
    "Key",
    "Added On",
    "Status",
    "Toggle Status",
    "Action",
  ];

  // Transform the configsData into the desired format for the table
  const dataToPass = configData.map((config, index) => ({
    id: config.domainSpecificConfigId,
    key: titleCase(config?.key?.key),
    createdOn: new Date(config.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }), // Formatting creation date
    status: config.isActive ? "Active" : "Inactive",
  }));

  const getActionMenu = (id) => [
    {
      label: "Edit",
      url: `/config/edit/${encrypt(id)}`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/config-detail/${encrypt(id)}`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const onToggleChange = (row) => {
    dispatch(
      updateDomainConfigStatus({
        domainSpecificConfigId: row.id,
        statusData: { isActive: row.status === "Active" ? false : true },
      })
    );
  };
  const Filter = () => {
    return (
      <div class="min-w-20 absolute top-4 right-4 overflow-hidden bg-white dark:bg-darkPrimary divide-y divide-gray-100 dark:divide-gray-700 border rounded-md shadow z-50 dark:border-gray-700">
        <p className="px-2 py-1 text-sm font-semibold whitespace-nowrap">
          Select Status
        </p>
        {filterMenu.map((item, index) => (
          <div
            className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
            key={index}
          >
            <Link href={item.url}>{item.label}</Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <MetaTitle title={"Config | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/config"
            parent="Config Listing"
            mainTitle="Config Listing"
          />
          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            to="/config/add"
          >
            Create Config
          </Link>
        </div>
        <div className="flex sm:justify-end items-center gap-2">
          <Search
            containerClassName={"w-full sm:w-auto mb-2"}
            placeholder={"Search"}
            label="search"
            filter={<Filter />}
          />
        </div>
        {loading ? (
          <TableShimmer />
        ) : (
          <div className="card-body p-0">
            <Table
              module={"Config"}
              headers={headers}
              initialData={dataToPass}
              isAction={true}
              isFucntionAction={getActionMenu}
              isStatus={true}
              onToggleChange={onToggleChange}
              isToggleLoading={isToggleLoading}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              rowPerPage={false}
            />
          </div>
        )}
      </section>

      {/* <section className="flex flex-col gap-4">
      <MetaTitle title={"Config | Anarock"} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1>Config Listing</h1>
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/config/add"
        >
          Create Config
        </Link>
      </div>

      <div>
        <div className="card bg-themeDefault dark:dark:bg-slate-800">
          <div className="ml-auto">
            <Search placeholder={"Search by Name"} />
          </div>
          {loading ? (
            <TableShimmer />
          ) : (
            <div className="card-body p-0">
              <Table
                module={"Config"}
                headers={headers}
                initialData={dataToPass}
                isAction={true}
                isFucntionAction={getActionMenu}
                isStatus={true}
                onToggleChange={onToggleChange}
                isToggleLoading={isToggleLoading} 
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                rowPerPage={false}
              />
            </div>
          )}
        </div>
      </div>
    </section> */}
    </>
  );
};

export default ConfigPage;
