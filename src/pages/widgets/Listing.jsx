import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { readWidget } from "../../redux/actions/widgets-action";
import { MoreOption } from "../../components/moreOption";
import { resetWidgetPayload } from "../../redux/slices/widgetsSlice";
import { Button } from "../../components/buttons";

const WidgetsListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    widgets: widgetsData,
    isToggleLoading,
    loading,
    totalPages,
  } = useSelector((state) => state.widget);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 0;
  const searchValue = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(page);
  console.log(widgetsData, "widget data");

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
        readWidget({
          // id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
          queryArray: [{ field: "search", value: searchValue }],
        })
      );
    } else {
      dispatch(
        readWidget({
          // id: "1689fab9-9c56-426a-bd15-368b9da4ce33",
          queryArray: [{ field: "page", value: currentPage + 1 }],
        })
      );
    }
  }, [currentPage, searchValue]);

  const headers = ["Sr No.", "Widget", "Section", "Type", "Action"];

  const getActionMenu = [
    {
      label: "Edit",
      url: `/widget/edit/`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/widget/view/`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  console.log(widgetsData, "widget dataaa");

  const dataToPass = widgetsData?.map((widget, index) => ({
    id: { content: index + 1 },
    widget: { content: widget?.name, link: `view/${widget?.id}` },
    section: {
      content: widget?.section?.name,
      link: `/section/view/${widget?.section?.id}`,
    },
    type: { content: widget?.type },

    actions: {
      component: <MoreOption id={widget?.id} actionMenu={getActionMenu} />,
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
      <widget className="flex flex-col gap-4">
        <MetaTitle title={"Widget | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/widget"
            parent="Widget"
            mainTitle="Widget Listing"
          />
          <Button
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            onClick={() => {
              navigate("/widget/add");
              dispatch(resetWidgetPayload());
            }}
          >
            Add Widget
          </Button>
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
              module={"Widget"}
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
      </widget>

      {/* <widget className="flex flex-col gap-4">
      <MetaTitle title={"Widget | Anarock"} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1>Widget Listing</h1>
        <Link
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/widget/add"
        >
          Create Widget
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
                module={"Widget"}
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
    </widget> */}
    </>
  );
};

export default WidgetsListing;
