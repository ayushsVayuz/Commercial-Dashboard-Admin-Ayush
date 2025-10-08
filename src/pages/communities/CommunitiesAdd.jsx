import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { Search } from "../../components/search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  mapCommunities,
  readCommunities,
} from "../../redux/actions/communities-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { Table } from "../../components/table";
import toast from "react-hot-toast";

const CommunitiesAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    communities: communityData,
    loading,
    totalCount,
  } = useSelector((state) => state.communities);

  const [searchParams, setSearchParams] = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get("limit")) || 10
  );
  const currentPageFromUrl = parseInt(searchParams.get("skip")) || 0;
  const searchQuery = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  const [selectedIds, setSelectedIds] = useState([]);

  const totalPages = totalCount ? Math.ceil(totalCount / rowsPerPage) : 0;
  const sectionId = searchParams.get("section_id");

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

  useEffect(() => {
    const requestPayload = { queryArray: [] };

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
      requestPayload.queryArray.push({ field: "section_id", value: sectionId });
    }

    requestPayload.queryArray.push({ field: "enabled", value: false });
    dispatch(readCommunities(requestPayload));
  }, [currentPage, searchQuery, rowsPerPage, sectionId]);

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const headers = ["Sr No.", "Name", "Select"];
  const dataToPass = communityData?.map((community, index) => ({
    srNo: { content: currentPage * rowsPerPage + (index + 1) },
    name: { content: community?.name },
    select: {
      content: (
        <input
          type="checkbox"
          value={community?.id}
          checked={selectedIds.includes(community?.id)}
          onChange={(e) =>
            handleCheckboxChange(community?.id, e.target.checked)
          }
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
      ),
    },
  }));

  const handleMapCommunities = async () => {
    const result = await dispatch(
      mapCommunities({ communityIds: selectedIds })
    ).unwrap();
    if (result?.statusCode === 200) {
      toast.success("Communities updated successfully");
      navigate("/communities");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <MetaTitle title={"Communities | Anarock"} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/communities"
          parent="Communities"
          mainTitle="Add Communities"
        />
      </div>
      <div className="flex sm:justify-end items-center gap-2">
        {selectedIds.length > 0 && (
          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            onClick={() => handleMapCommunities()}
          >
            Map Communities
          </Link>
        )}
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

export default CommunitiesAdd;
