import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMFMappings,
  updateMFMappingStatus,
} from "../../redux/actions/routeMF-actions";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { decrypt, encrypt, titleCase } from "../../functions";
import { Heading } from "../../components/heading";

const RouteMFPage = () => {
  const dispatch = useDispatch();
  const { mfMappings, loading, totalPages, isToggleLoading } = useSelector(
    (state) => state.mfMapping
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(decrypt(searchParams.get("page"))) || 0;
  const searchValue = decrypt(searchParams.get("search")) || "";

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setSearchParams({
      page: encrypt(currentPage.toString()),
      search: encrypt(searchValue),
    });
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(fetchMFMappings([{ field: "query", value: searchValue }])); // Dispatch with decrypted search value
    } else {
      dispatch(fetchMFMappings([{ field: "page", value: currentPage + 1 }])); // Dispatch with decrypted page
    }
  }, [currentPage, searchValue]);

  const headers = [
    "Sr No.",
    "Key",
    "Added On",
    "Status",
    "Toggle Status",
    "Action",
  ];

  const dataToPass = mfMappings?.map((obj, index) => ({
    id: obj.routeMicroFrontendMappingId, // or any unique identifier you have
    key: titleCase(obj.containerId),
    createdOn: new Date(obj.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }), // Format the date
    status: obj.isActive ? "Active" : "Inactive",
  }));

  const getActionMenu = (id) => [
    {
      label: "Edit",
      url: `/routeMF/edit/${encrypt(id)}`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/routeMF-detail/${encrypt(id)}`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const onToggleChange = async (row) => {
    dispatch(
      updateMFMappingStatus({
        mfMappingId: row.id,
        statusData: {
          isActive: row.status == "Active" ? false : true,
        },
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
        <MetaTitle title={"Route MF | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/routeMF"
            parent="Route MF"
            mainTitle="Route Micro frontend mapping"
          />
          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            to="/routeMF/add"
          >
            Create Route MF
          </Link>
        </div>
        <div className="flex sm:justify-end items-center gap-2">
          <Search
            // containerClassName={"w-full sm:w-auto mb-2"}
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
              module={"RouteMF"}
              headers={headers}
              initialData={dataToPass}
              isAction={true}
              isFucntionAction={getActionMenu}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              rowPerPage={false}
              isStatus={true}
              onToggleChange={onToggleChange}
              isToggleLoading={isToggleLoading}
            />
          </div>
        )}
      </section>

      {/* <section className="flex flex-col gap-4">
      <MetaTitle title={"Route MF | Anarock"} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1>Route Micro frontend mapping</h1>
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/routeMF/add"
        >
          Create
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
                module={"RouteMF"}
                headers={headers}
                initialData={dataToPass}
                isAction={true}
                isFucntionAction={getActionMenu}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                rowPerPage={false}
                isStatus={true}
                onToggleChange={onToggleChange}
                isToggleLoading={isToggleLoading}
              />
            </div>
          )}
        </div>
      </div>
    </section> */}
    </>
  );
};

export default RouteMFPage;
