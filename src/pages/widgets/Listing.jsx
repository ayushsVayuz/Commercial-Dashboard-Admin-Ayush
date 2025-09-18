import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import {
  changeStatusWidget,
  readWidget,
} from "../../redux/actions/widgets-action";
import { MoreOption } from "../../components/moreOption";
import { resetWidgetPayload } from "../../redux/slices/widgetsSlice";
import { Button } from "../../components/buttons";
import { LuLoaderCircle } from "react-icons/lu";
import { Toggle } from "../../components/inputs/toogle";

const WidgetsListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    widgets: widgetsData,
    loading,
    totalCount,
    statusLoading,
  } = useSelector((state) => state.widget);

  const [searchParams, setSearchParams] = useSearchParams();

  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get("limit")) || 10
  );
  const currentPageFromUrl = parseInt(searchParams.get("skip")) || 0;
  const searchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

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

    dispatch(readWidget(requestPayload));
  }, [currentPage, searchQuery, rowsPerPage]);

  const headers = [
    "Sr No.",
    "Name",
    // "Section",
    // "Type",
    "Status",
    // "Action",
  ];

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

  const dataToPass = widgetsData?.map((widget, index) => ({
    srNo: { content: currentPage * rowsPerPage + (index + 1) },
    name: {
      content: widget?.title,
      // link: `view/${widget?.widget_id}`
    },
    // section: {
    //   content: widget?.section?.name,
    //   link: `/section/view/${widget?.section?.id}`,
    // },
    // type: { content: widget?.type },
    status: {
      component: (
        <>
          {statusLoading == widget.widget_id ? (
            <div className="flex justify-center items-center">
              <LuLoaderCircle size={24} />
            </div>
          ) : (
            <Toggle
              value={widget.is_active == 1 ? true : false}
              onChange={() =>
                dispatch(changeStatusWidget({ widgetId: widget.widget_id }))
              }
            />
          )}
        </>
      ),
    },
    // actions: {
    //   component: <MoreOption id={widget?.widget_id} actionMenu={getActionMenu} />,
    // },
  }));

  return (
    <section className="flex flex-col gap-4">
      <MetaTitle title={"Widget | Anarock"} />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/widget"
          parent="Widget"
          mainTitle="Widget Listing"
        />
        {/* <Button
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          onClick={() => {
            navigate("/widget/add");
            dispatch(resetWidgetPayload());
          }}
        >
          Add Widget
        </Button> */}
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
            module="Widget"
            headers={headers}
            initialData={dataToPass}
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

export default WidgetsListing;
