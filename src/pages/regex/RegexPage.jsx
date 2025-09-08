import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegex,
  updateRegexStatus,
} from "../../redux/actions/regex-actions";
import toast from "react-hot-toast";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { resetRegexState } from "../../redux/slices/regexSlice";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { encrypt, decrypt } from "../../functions"; // Import encrypt and decrypt functions
import { Heading } from "../../components/heading";

const RegexPage = () => {
  const dispatch = useDispatch();
  const { regexList, loading, error, totalPages, isToggleLoading } =
    useSelector((state) => state.regex);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(decrypt(searchParams.get("page"))) || 0; // Decrypt page number
  const searchValue = decrypt(searchParams.get("search")) || ""; // Decrypt search value
  const [currentPage, setCurrentPage] = useState(page);

  const headers = [
    "No.",
    "Regex Name",
    "Added On",
    "Status",
    "Toggle Status",
    "Action",
  ];

  useEffect(() => {
    setSearchParams({
      page: encrypt(currentPage.toString()), // Encrypt page number
      search: encrypt(searchValue), // Encrypt search value
    });
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(fetchRegex([{ field: "query", value: searchValue }]));
    } else {
      dispatch(fetchRegex([{ field: "page", value: currentPage + 1 }]));
    }
  }, [currentPage, searchValue, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetRegexState());
    }
  }, [error, dispatch]);

  const getActionMenu = (id) => [
    {
      label: "Edit",
      url: `/regex/edit/${encrypt(id)}`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/regex-detail/${encrypt(id)}`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const onToggleChange = (row) => {
    dispatch(
      updateRegexStatus({
        regexId: row.id,
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
        <MetaTitle title={"Regex | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/regex"
            parent="Regex Listing"
            mainTitle="Regex Listing"
          />
          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            to="/regex/add"
          >
            Create Regex Listing
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
          <div className="card bg-themeDefault dark:dark:bg-slate-800">
            <div className="card-body p-0">
              <Table
                headers={headers}
                initialData={regexList?.map((val, ind) => ({
                  id: val.regexId,
                  key: val.name,
                  creationDate: new Date(val.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  ),
                  status: val.isActive ? "Active" : "Inactive",
                }))}
                isAction={true}
                isFucntionAction={getActionMenu}
                isStatus={true}
                onToggleChange={onToggleChange}
                isToggleLoading={isToggleLoading}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                rowPerPage={false}
                module={"Regex"}
              />
            </div>
          </div>
        )}
      </section>

      {/* <section className="flex flex-col gap-4">
      <MetaTitle title={"Regex | Anarock"} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1>Regex Listing</h1>
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/regex/add"
        >
          Create
        </Link>
      </div>

      <div className="card">
        <div className="ml-auto">
          <Search placeholder={"Search by Name"} />
        </div>
        {loading ? (
          <TableShimmer />
        ) : (
          <div className="card bg-themeDefault dark:dark:bg-slate-800">
            <div className="card-body p-0">
              <Table
                headers={headers}
                initialData={regexList?.map((val, ind) => ({
                  id: val.regexId,
                  key: val.name,
                  creationDate: new Date(val.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  ),
                  status: val.isActive ? "active" : "inactive",
                }))}
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
          </div>
        )}
      </div>
    </section> */}
    </>
  );
};

export default RegexPage;
