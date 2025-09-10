import { Link, Outlet, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { readSection } from "../../redux/actions/section-action";
import { MoreOption } from "../../components/moreOption";
import { resetSectionPayload } from "../../redux/slices/sectionSlice";

const SectionListing = () => {
  const dispatch = useDispatch();
  const {
    sections: sectionData,
    loading,
    totalCount,
    resetS,
  } = useSelector((state) => state.section);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 0;
  const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;
  const searchValue = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(page);
  console.log(totalCount, "totalPages");

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      search: searchValue,
    });
  }, [currentPage]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(
        readSection({
          id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
          queryArray: [{ field: "search", value: searchValue }],
        })
      );
    } else {
      dispatch(
        readSection({
          id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
          queryArray: [{ field: "page", value: currentPage + 1 }],
        })
      );
    }
  }, [currentPage, searchValue]);

  const headers = [
    "Sr No.",
    "Section Name",
    "Order",
    "Collapsible  ",
    "Collapsed",
    "Action",
  ];

  const getActionMenu = [
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

  const dataToPass = sectionData?.map((section, index) => ({
    id: { content: index + 1 },
    section: { content: section.name, link: `view/${section.id}` },
    order: { content: section.order_index?.toString() },
    collapsible: {
      content: section.is_collapsible ? "Yes" : "No",
      type: "status",
    },
    collapsed: {
      content: section.is_collapsed ? "Yes" : "No",
      type: "status",
    },
    actions: {
      component: <MoreOption id={section.id} actionMenu={getActionMenu} />,
    },
  }));

  const onToggleChange = async (row) => {
    // dispatch(
    //   updateDomainStatus({
    //     domainId: row.id,
    //     statusData: {
    //       isActive: row.status == "Active" ? false : true,
    //     },
    //   })
    // );
  };

  // const Filter = () => {
  //   return (
  //     <div class="min-w-20 absolute top-4 right-4 overflow-hidden bg-white dark:bg-darkPrimary divide-y divide-gray-100 dark:divide-gray-700 border rounded-md shadow z-50 dark:border-gray-700">
  //       <p className="px-2 py-1 text-sm font-semibold whitespace-nowrap">
  //         Select Status
  //       </p>
  //       {filterMenu.map((item, index) => (
  //         <div
  //           className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
  //           key={index}
  //         >
  //           <Link href={item.url}>{item.label}</Link>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <>
      <section className="flex flex-col gap-4">
        <MetaTitle title={"Section | Anarock"} />
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
            containerClassName={"w-full sm:w-auto mb-2 rounded px "}
            placeholder={"Search"}
            label="search"
            // filter={<Filter />}
          />
        </div>
        {loading ? (
          <TableShimmer />
        ) : (
          <div className="card-body dark:dark:bg-slate-800 p-0">
            <Table
              module={"Section"}
              headers={headers}
              initialData={dataToPass}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              rowPerPage={false}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default SectionListing;
