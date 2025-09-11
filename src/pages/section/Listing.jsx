import { Link, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import {
  changeStatusSection,
  readSection,
} from "../../redux/actions/section-action";
import { MoreOption } from "../../components/moreOption";
import { resetSectionPayload } from "../../redux/slices/sectionSlice";
import { Toggle } from "../../components/inputs/toogle";
import { LuLoaderCircle } from "react-icons/lu";

const SectionListing = () => {
  const dispatch = useDispatch();
  const { sections, statusLoading, loading, totalCount } = useSelector(
    (state) => state.section
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get("limit")) || 10
  );

  const currentPageFromUrl = parseInt(searchParams.get("skip")) || 0;
  const searchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  // totalPages now respects rowsPerPage
  const totalPages = totalCount ? Math.ceil(totalCount / rowsPerPage) : 0;

  // keep URL params in sync
  useEffect(() => {
    const newParams = {
      skip: currentPage.toString(),
      limit: rowsPerPage.toString(),
      search: searchQuery,
    };

    const existingParams = Object.fromEntries([...searchParams]);

    const hasChanged = Object.entries(newParams).some(
      ([key, value]) => existingParams[key] !== value
    );

    if (hasChanged) {
      setSearchParams(newParams);
    }
  }, [currentPage, rowsPerPage, searchQuery]);

  // fetch data on change
  useEffect(() => {
    const requestPayload = {
      id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
      queryArray: [],
    };

    if (searchQuery?.length > 0) {
      setCurrentPage(0);
      requestPayload.queryArray.push({ field: "search", value: searchQuery });
    } else {
      requestPayload.queryArray.push(
        { field: "skip", value: currentPage * rowsPerPage },
        { field: "limit", value: rowsPerPage }
      );
    }

    dispatch(readSection(requestPayload));
  }, [currentPage, searchQuery, rowsPerPage]);

  const tableHeaders = [
    "Sr No.",
    "Section Name",
    "Order",
    "Collapsible",
    "Collapsed",
    "Status",
    "Action",
  ];

  const actionMenu = [
    {
      label: "Edit",
      url: `/section/edit/`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/section/view/`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const tableData = sections?.map((section, index) => ({
    srNo: { content: currentPage * rowsPerPage + (index + 1) },
    name: { content: section.name, link: `view/${section.id}` },
    order: { content: section.order_index?.toString() },
    isCollapsible: {
      content: section.is_collapsible ? "Yes" : "No",
      type: "status",
    },
    isCollapsed: {
      content: section.is_collapsed ? "Yes" : "No",
      type: "status",
    },
    status: {
      component: (
        <>
          {statusLoading == section.id ? (
            <div className="flex justify-center items-center">
              <LuLoaderCircle size={24} />
            </div>
          ) : (
            <Toggle
              value={section.status == 1 ? true : false}
              onChange={() =>
                dispatch(changeStatusSection({ sectionId: section.id }))
              }
            />
          )}
        </>
      ),
    },
    actions: {
      component: <MoreOption id={section.id} actionMenu={actionMenu} />,
    },
  }));

  return (
    <section className="flex flex-col gap-4">
      <MetaTitle title="Section | Anarock" />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/section"
          parent="Section"
          mainTitle="Section Listing"
        />
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/section/add"
          onClick={() => dispatch(resetSectionPayload())}
        >
          Add Section
        </Link>
      </div>

      <div className="flex sm:justify-end items-center gap-2">
        <Search
          containerClassName="w-full sm:w-auto mb-2 rounded px"
          placeholder="Search"
          label="search"
        />
      </div>

      {loading ? (
        <TableShimmer />
      ) : (
        <div className="card-body dark:dark:bg-slate-800 p-0">
          <Table
            module="Section"
            headers={tableHeaders}
            initialData={tableData}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            rowPerPage={true}
            selectedValue={rowsPerPage}
            setSelectedValue={setRowsPerPage}
          />
        </div>
      )}
    </section>
  );
};

export default SectionListing;
