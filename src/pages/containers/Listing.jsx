import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { readContainer } from "../../redux/actions/containers-action";
import { MoreOption } from "../../components/moreOption";
import { Button } from "../../components/buttons";
import { resetContainerPayload } from "../../redux/slices/containerSlice";

const ContainersListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    containers: containersData,
    loading,
    totalCount,
  } = useSelector((state) => state.container);

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

    dispatch(readContainer(requestPayload));
  }, [currentPage, searchQuery, rowsPerPage]);

  const headers = ["Sr No.", "Container ID", "Description", "Action"];

  const getActionMenu = [
    {
      label: "Edit",
      url: `/containers/edit/`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/containers/view/`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const dataToPass = containersData?.map((container, index) => ({
    srNo: { content: currentPage * rowsPerPage + (index + 1) },
    containerID: { content: container?.container_id },
    description: { content: container?.description },
    actions: {
      component: (
        <MoreOption
          id={`${container?.container_id}`}
          actionMenu={getActionMenu}
        />
      ),
    },
  }));

  return (
    <section className="flex flex-col gap-4">
      <MetaTitle title={"Container | Anarock"} />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/container"
          parent="Container"
          mainTitle="Container Listing"
        />
        <Button
          className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          onClick={() => {
            navigate("/containers/add");
            dispatch(resetContainerPayload());
          }}
        >
          Add Container
        </Button>
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
        <div className="card-body bg-[#F9FAFC] dark:dark:bg-slate-800 p-0">
          <Table
            module="Container"
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

export default ContainersListing;
