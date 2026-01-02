import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import {
  readSingleSection,
  updateSection,
  updateSectionCMS,
} from "../../redux/actions/section-action";
import { CardWrapper } from "../../components/wrappers/card";
import { readContainer } from "../../redux/actions/containers-action";
import { Input } from "../../components/inputs/input";
import { Loader } from "../../components/loader";
import { clearSingleSection } from "../../redux/slices/sectionSlice";
import { getAllRoles } from "../../redux/actions/common-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { Table } from "../../components/table";
import { Search } from "../../components/search";
import toast from "react-hot-toast";

const SectionCMSAddEdit = () => {
  const [containers, setContainers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleSection, loading, singleSectionLoading } = useSelector(
    (state) => state.section
  );

  console.log(singleSection, "singleSection");

  const { roles, rolesLoading, totalCount } = useSelector(
    (state) => state.common
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // ---------- Clear & Load Section ----------
  useEffect(() => {
    dispatch(clearSingleSection());
    reset({
      sectionId: "",
      widgetId: "",
      containerId: "",
    });

    dispatch(readSingleSection({ id }));
  }, [id, reset, dispatch]);

  // ---------- Prefill container ----------
  useEffect(() => {
    console.log(singleSection,"single657890");
    
    if (singleSection?.container_id) {
      // Reset form fields
      reset({
        sectionId: "",
        widgetId: "",
        containerId: singleSection.container_id,
      });

      // Pre-select roles
      const preSelectedRoleIds =
        singleSection.Roles?.map((role) => role.role_id) || [];
      setSelectedIds(preSelectedRoleIds);
    }
  }, [singleSection, reset]);

  // ---------- Pagination + Search setup ----------
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Initialize URL defaults on mount
  useEffect(() => {
    const hasParams =
      searchParams.has("skip") &&
      searchParams.has("limit") &&
      searchParams.has("search");

    // if (!hasParams) {
    //   setSearchParams({
    //     skip: "0",
    //     limit: "10",
    //     search: "",
    //   });
    // }
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get("limit")) || 10
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("skip")) || 0
  );
  // const [searchQuery, setSearchQuery] =
  //   useState(searchParams.get("search")) || "";

  // ---------- Fetch Containers ----------
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const payload = {
          queryArray: [
            { field: "mapped", value: false },
            { field: "skip", value: 0 },
            { field: "limit", value: 1000 },
          ],
        };
        const res = await dispatch(readContainer(payload));
        const updatedContainers = res?.payload?.data?.map((data) => ({
          label: data?.container_id,
          value: data?.container_id,
        }));
        setContainers(updatedContainers);
      } catch (error) {
        console.error("Error fetching containers:", error);
      }
    };

    fetchContainers();
  }, [dispatch]);

  // ---------- Fetch Roles (with search, skip, limit) ----------
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const payload = {
          search: searchParams.get("search") || "",
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage,
        };
        const res = await dispatch(getAllRoles(payload));
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();

    // ✅ Keep URL synced to pagination
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("skip", currentPage.toString());
      params.set("limit", rowsPerPage.toString());
      return params;
    });
  }, [dispatch, currentPage, rowsPerPage, searchParams.get("search")]);

  // ---------- Handle Search ----------
  // const handleSearchChange = (value) => {
  //   setSearchQuery(value);
  //   setCurrentPage(0);
  // };

  // ---------- Submit ----------
  const onSubmit = async (data) => {
    const payload = {
      role_ids: selectedIds,
      dashboard_id: singleSection?.dashboard_id,
    };
    console.log(payload, "payload");

    try {
      const response = await dispatch(
        updateSection({
          sectionId: singleSection?.section_id,
          updatedData: payload,
        })
      ).unwrap();
      console.log(response, "response");

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        navigate("/section");
        toast.success("Section updated successfully");
      }
    } catch (error) {
              console.log(error, "errorerrorerror");

    //   console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/section");
  };

  // ---------- Table ----------
  const [selectedIds, setSelectedIds] = useState([]);
  const totalPages = totalCount ? Math.ceil(totalCount / rowsPerPage) : 0;

  const handleCheckboxChange = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const headers = ["Sr No.", "Name", "Select"];
  const dataToPass = roles?.map((role, index) => ({
    srNo: { content: currentPage * rowsPerPage + (index + 1) },
    name: { content: role?.role_name },
    select: {
      content: (
        <input
          type="checkbox"
          value={role?.role_id}
          checked={selectedIds.includes(role?.role_id)}
          onChange={(e) =>
            handleCheckboxChange(role?.role_id, e.target.checked)
          }
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
      ),
    },
  }));

  return singleSectionLoading ? (
    <div className="flex justify-center items-center h-screen w-full">
      <Loader />
    </div>
  ) : (
    <section className="min-h-screen bg-[#F9FAFC] dark:bg-gray-800">
      <MetaTitle title={`Section Mapping | Anarock`} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/section"
        parent="Section"
        mainTitle={"Section Mapping"}
      />
      <CardWrapper>
        <h5 className="font-semibold !text-3xl text-[#884EA7] dark:text-white hover:text-[#884EA7]">
          {singleSection?.name}
        </h5>
        {/* <p className="font-medium text-base dark:text-gray-200">
          Section - {singleSection?.section?.name}
        </p> */}
      </CardWrapper>

      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Role Mapping */}
          <div className="flex items-center justify-between">
            <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
              Role Mapping
            </h5>
            <Search
              // containerClassName="w-full sm:w-auto"
              placeholder="Search roles"
              label="search"
            />
          </div>

          {rolesLoading ? (
            <TableShimmer />
          ) : (
            <div className="card-body dark:bg-slate-800 p-0">
              <Table
                module="Section"
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

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-4">
            <Button type="button" onClick={handleCancel} outLine={true}>
              Cancel
            </Button>
            <Button
              type="submit"
              mainPrimary={true}
              isLoading={loading}
              disabled={!isValid}
            >
              Map
            </Button>
          </div>
        </form>
      </FormWrapper>
    </section>
  );
};

export default SectionCMSAddEdit;
