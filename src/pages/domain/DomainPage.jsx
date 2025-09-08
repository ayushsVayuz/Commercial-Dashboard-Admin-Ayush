import { Link, Outlet, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchDomains,
  updateDomainStatus,
} from "../../redux/actions/domain-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import {
  convertDateToISOFormat,
  convertToDateObjectString,
  decrypt,
  encrypt,
  titleCase,
} from "../../functions";
import { Search } from "../../components/search";
import CryptoJS from "crypto-js";

const DomainPage = () => {
  const dispatch = useDispatch();
  const {
    domains: domainsData,
    isToggleLoading,
    loading,
    totalPages,
  } = useSelector((state) => state.domain);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(decrypt(searchParams.get("page"))) || 0;
  const searchValue = decrypt(searchParams.get("search")) || "";

  const [currentPage, setCurrentPage] = useState(page);
  console.log(page, "page-------");

  useEffect(() => {
    setSearchParams({
      page: encrypt(currentPage.toString()),
      search: encrypt(searchValue),
    });
  }, [currentPage]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(fetchDomains([{ field: "query", value: searchValue }]));
    } else {
      dispatch(fetchDomains([{ field: "page", value: currentPage + 1 }]));
    }
  }, [currentPage, searchValue]);

  const headers = [
    "Sr No.",
    "Domain Name",
    "Added On",
    "Status",
    "Toggle Status",
    "Action",
  ];

  const dataToPass = domainsData.map((domain) => ({
    id: domain.domainId,
    domain: titleCase(domain.domain),
    createdOn: new Date(domain.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    status: domain.isActive ? "Active" : "Inactive",
  }));

  const getActionMenu = (id) => [
    {
      label: "Edit",
      url: `/domain/edit/${encrypt(id)}`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/domain/view/${encrypt(id)}`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const onToggleChange = async (row) => {
    dispatch(
      updateDomainStatus({
        domainId: row.id,
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
        <MetaTitle title={"Domain | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/domain"
            parent="Domain"
            mainTitle="Domain Listing"
          />
          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            to="/domain/add"
          >
            Add Domain
          </Link>
        </div>
        <div className="flex sm:justify-end items-center gap-2">
          <Search
            containerClassName={"w-full sm:w-auto mb-2 rounded px "}
            placeholder={"Search"}
            label="search"
            filter={<Filter />}
          />
        </div>
        {loading ? (
          <TableShimmer />
        ) : (
          <div className="card-body dark:dark:bg-slate-800 p-0">
            <Table
              module={"Domain"}
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
      <MetaTitle title={"Domain | Anarock"} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1>Domain Listing</h1>
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/domain/add"
        >
          Create Domain
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
                module={"Domain"}
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

export default DomainPage;
