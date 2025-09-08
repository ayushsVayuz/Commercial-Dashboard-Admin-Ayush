import { Link, useSearchParams } from "react-router-dom";
import { TableShimmer } from "../../../components/shimmers/tableShimmer";
import { Table } from "../../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchActiveFormListing,
  fetchAllFormListing,
  fetchMasterForm,
  updateMasterFormStatus,
} from "../../../redux/actions/form-action";
import { FaSitemap } from "react-icons/fa";
import { MetaTitle } from "../../../components/metaTitle";
import { Heading } from "../../../components/heading";
import { Search } from "../../../components/search";
import { decrypt, encrypt, titleCase } from "../../../functions";

function FormsListing() {
  const { allFormListing, loading, isToggleLoading, totalPages } = useSelector(
    (state) => state.form
  );

  const dispatch = useDispatch();
  // console.log(allFormListing);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(decrypt(searchParams.get("page"))) || 0;
  const searchValue = decrypt(searchParams.get("search")) || "";

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setSearchParams({
      page: encrypt(currentPage.toString()),
      search: encrypt(searchValue),
    });
  }, [currentPage]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(fetchAllFormListing([{ field: "query", value: searchValue }]));
    } else {
      dispatch(
        fetchAllFormListing([{ field: "page", value: currentPage + 1 }])
      );
    }
  }, [currentPage, searchValue]);

  const headers = [
    "No",
    "Friendly Name",
    "Form ID",
    "Created On",
    "Status",
    "Toggle Status",
    "Action",
  ];

  // useEffect(() => {
  //   dispatch(fetchAllFormListing([]));
  // }, []);

  const dataToPass = allFormListing?.map((data, i) => ({
    id: { masterFormId: data.masterFormId, _id: data._id },
    sno: i + 1,
    name: titleCase(data.name),
    formId: titleCase(data.masterFormId),
    createdOn: new Date(data.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    status: data.isActive ? "Active" : "Inactive",
  }));

  const getActionMenu = (id) => {
    console.log(id, "id from get action menu");
    return [
      {
        label: "Edit",
        url: `/form/edit/${encrypt(id.masterFormId)}`,
        icon: <TbEdit className="text-xl" />,
      },
      {
        label: "Form Mapping",
        url: `/form/formMapping/${encrypt(id.masterFormId)}`,
        icon: <FaSitemap className="text-xl" />,
      },
      {
        label: "View",
        url: `/form-detail/${encrypt(id.masterFormId)}`,
        icon: <TbEye className="text-xl" />,
      },
    ];
  };

  const onToggleChange = async (row) => {
    dispatch(
      updateMasterFormStatus({
        masterFormId: row.id,
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
        <MetaTitle title={"Master Form | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/form"
            parent="Master Form Listing"
            mainTitle="Master Form Listing"
          />
          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            to="/form/add"
          >
            Create Master Mf
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
              module={"Forms"}
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
            />
          </div>
        )}
      </section>

      {/* <section className="flex flex-col gap-4">
      <MetaTitle title={"Master Form | Anarock"} />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1>Form Listing</h1>
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/form/add"
        >
          Create
        </Link>
      </div>

      <div>
        <div className="card bg-themeDefault dark:dark:bg-slate-800">
          {loading ? (
            <TableShimmer />
          ) : (
            <div className="card-body p-0">
              <Table
                module={"Forms"}
                headers={headers}
                initialData={dataToPass}
                isAction={true}
                isFucntionAction={getActionMenu}
                // isStatus={true}
                // onToggleChange={onToggleChange}
                // isToggleLoading={isToggleLoading}
              />
            </div>
          )}
        </div>
      </div>
    </section> */}
    </>
  );
}

export default FormsListing;
