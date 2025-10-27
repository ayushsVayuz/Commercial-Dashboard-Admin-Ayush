import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../../components/heading";
import { Table } from "../../components/table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { LuLoaderCircle } from "react-icons/lu";
import { Toggle } from "../../components/inputs/toogle";
import {
  changeStatusCommunity,
  mapCommunities,
  readCommunities,
} from "../../redux/actions/communities-action";
import toast from "react-hot-toast";

const CommunitiesListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    communities: communityData,
    loading,
    totalCount,
    statusLoading,
  } = useSelector((state) => state.communities);

  const [searchParams, setSearchParams] = useSearchParams();

  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get("limit")) || 10
  );
  const currentPageFromUrl = parseInt(searchParams.get("skip")) || 0;
  const searchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  const totalPages = totalCount ? Math.ceil(totalCount / rowsPerPage) : 0;

  const sectionId = searchParams.get("section_id");

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

    if (sectionId) {
      requestPayload.queryArray.push({
        field: "section_id",
        value: sectionId,
      });
    }
    requestPayload.queryArray.push({
      field: "enabled",
      value: true,
    });

    dispatch(readCommunities(requestPayload));
  }, [currentPage, searchQuery, rowsPerPage, sectionId]);

  const handleCommunityStatus = async (community) => {
    try {
      const response = await dispatch(
        mapCommunities({ communityIds: [community.id] })
      ).unwrap();

      if (response?.statusCode === 200) {
        toast.success("Community status updated successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update community status");
    }
  };

  const headers = ["Sr No.", "Name", "Status"];

  const dataToPass = communityData?.map((community, index) => ({
    srNo: { content: currentPage * rowsPerPage + (index + 1) },
    name: {
      content: community?.name,
      // link: `view/${widget?.widget_id}`
    },

    status: {
      component: (
        <>
          {statusLoading == community.id ? (
            <div className="flex justify-center items-center">
              <LuLoaderCircle size={24} />
            </div>
          ) : (
            <Toggle
              value={community.status == 1 ? true : false}
              onChange={() => handleCommunityStatus(community)}
            />
          )}
        </>
      ),
    },
  }));

  return (
    <section className="flex flex-col gap-4">
      <MetaTitle title={"Widget | Anarock"} />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/communities"
          parent="Communities"
          mainTitle="Communities"
        />
        {/* <Button
          className="w-fit bg-[#884EA7] text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          onClick={() => {
            navigate("/widget/add");
            dispatch(resetWidgetPayload());
          }}
        >
          Add Widget
        </Button> */}
        <Link
          className="w-fit bg-[#884EA7] text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/communities/add"
        >
          Add Community
        </Link>
      </div>

      <div className="flex sm:justify-end items-center gap-2">
        <Search
          containerClassName="w-full sm:w-auto mb-2 rounded px"
          placeholder="Search"
          label="search"
          // filter={
          //   <Filter
          //     filterMenu={filterMenu}
          //     setFilterMenu={setFilterMenu}
          //     filters={[
          //       {
          //         type: "select",
          //         key: "section_id",
          //         placeholder: "Select Communities",
          //         options: sectionOptions,
          //       },
          //     ]}
          //   />
          // }
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

export default CommunitiesListing;
