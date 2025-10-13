// import { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   useNavigate,
//   useLocation,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
// import { Button } from "../../components/buttons";
// import { useDispatch, useSelector } from "react-redux";
// import { MetaTitle } from "../../components/metaTitle";
// import { Heading } from "../../components/heading";
// import { FormWrapper } from "../../components/wrappers/form";
// import toast from "react-hot-toast";
// // import { Selector } from "../../components/select";
// import {
//   readSingleWidget,
//   updateWidgetCMS,
// } from "../../redux/actions/widgets-action";
// import { CardWrapper } from "../../components/wrappers/card";
// import { readContainer } from "../../redux/actions/containers-action";
// import { Input } from "../../components/inputs/input";
// import { Selector } from "../../components/select";
// import { clearSingleWidget } from "../../redux/slices/widgetsSlice";
// import { Loader } from "../../components/loader";
// import { getAllRoles } from "../../redux/actions/common-action";
// import { TableShimmer } from "../../components/shimmers/tableShimmer";
// import { Table } from "../../components/table";
// import { Search } from "../../components/search";
// const WidgetCMSAddEdit = () => {
//   const [containers, setContainers] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [containerValue, setContainerValue] = useState("");
//   const { singleWidget, error, loading, singleWidgetLoading } = useSelector(
//     (state) => state.widget
//   );
//   const { roles, rolesLoading, totalCount } = useSelector(
//     (state) => state.common
//   );

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//     reset,
//     trigger,
//   } = useForm({
//     mode: "onChange",
//     defaultValues: {
//       sectionId: "",
//       widgetId: "",
//       containerId: "",
//     },
//   });

//   // useEffect(() => {
//   //   dispatch(readSingleWidget({ id: id }));
//   // }, []);
//   useEffect(() => {
//     dispatch(clearSingleWidget());
//     setContainerValue("");
//     reset({
//       sectionId: "",
//       widgetId: "",
//       containerId: "",
//     });

//     dispatch(readSingleWidget({ id: id }));
//   }, [id, reset]);

//   useEffect(() => {
//     if (singleWidget?.container_id) {

//       setContainerValue(singleWidget.container_id);

//       reset({
//         sectionId: "",
//         widgetId: "",
//         containerId: singleWidget.container_id,
//       });
//     }
//   }, [singleWidget, reset]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const payload = {
//           queryArray: [
//             { field: "mapped", value: false },
//             { field: "skip", value: 0 },
//             { field: "limit", value: 1000 },
//           ],
//         };
//         const res = await dispatch(readContainer(payload));
//         const updatedContainers = res?.payload?.data?.map((data) => ({
//           label: data?.container_id,
//           value: data?.container_id,
//         }));
//         setContainers(updatedContainers);
//       } catch (error) {
//         console.error("Error fetching containers:", error);
//       }
//     };

//     const fetchRoles = async () => {
//       try {
//         const res = await dispatch(getAllRoles());
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       }
//     };

//     fetchData();
//     fetchRoles();
//   }, [dispatch]);

//   const onSubmit = async (data) => {
//     const payload = {
//       container_id: data.containerId,
//     };
//     try {
//       const response = await dispatch(
//         updateWidgetCMS({
//           widgetId: singleWidget?.widget_id,
//           updatedData: payload,
//         })
//       ).unwrap();

//       if (response?.statusCode === 200 || response?.statusCode === 201) {
//         navigate("/widget");
//       }
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   const handleCancel = () => {
//     reset();
//     navigate("/widget");
//   };

//   const [searchParams, setSearchParams] = useSearchParams();
//   const [rowsPerPage, setRowsPerPage] = useState(
//     parseInt(searchParams.get("limit")) || 10
//   );
//   const currentPageFromUrl = parseInt(searchParams.get("skip")) || 0;
//   const searchQuery = searchParams.get("search") || "";
//   const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

//   const [selectedIds, setSelectedIds] = useState([]);

//   const totalPages = totalCount ? Math.ceil(totalCount / rowsPerPage) : 0;
//   const handleCheckboxChange = (id, checked) => {
//   };
//   const headers = ["Sr No.", "Name", "Select"];
//   const dataToPass = roles?.map((role, index) => ({
//     srNo: { content: currentPage * rowsPerPage + (index + 1) },
//     name: { content: role?.role_name },
//     select: {
//       content: (
//         <input
//           type="checkbox"
//           value={role?.role_id}
//           checked={selectedIds.includes(role?.role_id)}
//           onChange={(e) =>
//             handleCheckboxChange(role?.role_id, e.target.checked)
//           }
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
//         />
//       ),
//     },
//   }));

//   return singleWidgetLoading ? (
//     <div className="flex justify-center items-center h-screen w-full">
//       <Loader />
//     </div>
//   ) : (
//     <section className=" min-h-screen bg-[#F9FAFC] dark:bg-gray-800">
//       <MetaTitle title={`Widget Mapping | Anarock`} />
//       <Heading
//         containerClassName={"my-4"}
//         sectionLink="/widget"
//         parent="Widget"
//         mainTitle={"Widget Mapping"}
//       />
//       <CardWrapper>
//         <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
//           {singleWidget?.title}
//         </h5>
//         <p className="font-medium text-base dark:text-gray-200">
//           Section - {singleWidget?.section?.name}
//         </p>
//       </CardWrapper>
//       <FormWrapper>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* General */}
//           <h5 className="mb-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
//             General
//           </h5>
//           <div className="grid sm:grid-cols-1 gap-4">
//             {/* <Controller
//               name="containerId"
//               control={control}
//               render={({ field }) => (
//                 <Selector
//                   {...field}
//                   options={containers}
//                   label="Container Id"
//                   // placeholder="e.g., FACI20"
//                   errorContent={errors?.containerId?.message}
//                   loading={loading}
//                 />
//               )}
//             /> */}
//             <Controller
//               name="containerId"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="Container Id"
//                   value={containerValue}
//                   onChange={(e) => {
//                     setContainerValue(e.target.value);
//                     field.onChange(e.target.value);
//                   }}
//                   errorContent={errors?.containerId?.message}
//                 />
//               )}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
//               Role Mapping
//             </h5>
//             <Search
//               containerClassName="w-full sm:w-auto rounded p-2"
//               placeholder="Search"
//               label="search"
//             />
//           </div>

//           {rolesLoading ? (
//             <TableShimmer />
//           ) : (
//             <div className="card-body dark:dark:bg-slate-800 p-0">
//               <Table
//                 module="Widget"
//                 headers={headers}
//                 initialData={dataToPass}
//                 totalPages={totalPages}
//                 setCurrentPage={setCurrentPage}
//                 currentPage={currentPage}
//                 rowPerPage={true}
//                 selectedValue={rowsPerPage}
//                 setSelectedValue={setRowsPerPage}
//               />
//             </div>
//           )}

//           {/* Action buttons */}
//           <div className="mt-4 flex justify-end gap-4">
//             <Button type="button" onClick={handleCancel} outLine={true}>
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               mainPrimary={true}
//               isLoading={loading}
//               disabled={!isValid}
//             >
//               Map
//             </Button>
//           </div>
//         </form>
//       </FormWrapper>
//     </section>
//   );
// };

// export default WidgetCMSAddEdit;

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { FormWrapper } from "../../components/wrappers/form";
import {
  readSingleWidget,
  updateWidgetCMS,
} from "../../redux/actions/widgets-action";
import { CardWrapper } from "../../components/wrappers/card";
import { readContainer } from "../../redux/actions/containers-action";
import { Input } from "../../components/inputs/input";
import { clearSingleWidget } from "../../redux/slices/widgetsSlice";
import { Loader } from "../../components/loader";
import { getAllRoles } from "../../redux/actions/common-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { Table } from "../../components/table";
import { Search } from "../../components/search";

const WidgetCMSAddEdit = () => {
  const [containers, setContainers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [containerValue, setContainerValue] = useState("");

  const { singleWidget, loading, singleWidgetLoading } = useSelector(
    (state) => state.widget
  );
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
    defaultValues: {
      sectionId: "",
      widgetId: "",
      containerId: "",
    },
  });

  // ---------- Clear & Load Widget ----------
  useEffect(() => {
    dispatch(clearSingleWidget());
    setContainerValue("");
    reset({
      sectionId: "",
      widgetId: "",
      containerId: "",
    });

    dispatch(readSingleWidget({ id }));
  }, [id, reset, dispatch]);

  // ---------- Prefill container ----------
  useEffect(() => {
    if (singleWidget?.container_id) {
      // Set container value
      setContainerValue(singleWidget.container_id);

      // Reset form fields
      reset({
        sectionId: "",
        widgetId: "",
        containerId: singleWidget.container_id,
      });

      // Pre-select roles
      const preSelectedRoleIds =
        singleWidget.Roles?.map((role) => role.role_id) || [];
      setSelectedIds(preSelectedRoleIds);
    }
  }, [singleWidget, reset]);

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
      container_id: data.containerId,
      role_ids: selectedIds,
    };
    try {
      const response = await dispatch(
        updateWidgetCMS({
          widgetId: singleWidget?.widget_id,
          updatedData: payload,
        })
      ).unwrap();

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        navigate("/widget");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/widget");
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

  return singleWidgetLoading ? (
    <div className="flex justify-center items-center h-screen w-full">
      <Loader />
    </div>
  ) : (
    <section className="min-h-screen bg-[#F9FAFC] dark:bg-gray-800">
      <MetaTitle title={`Widget Mapping | Anarock`} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/widget"
        parent="Widget"
        mainTitle={"Widget Mapping"}
      />
      <CardWrapper>
        <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
          {singleWidget?.title}
        </h5>
        {/* <p className="font-medium text-base dark:text-gray-200">
          Section - {singleWidget?.section?.name}
        </p> */}
      </CardWrapper>

      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* General */}
          <h5 className="mb-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
            General
          </h5>
          <div className="grid sm:grid-cols-1 gap-4">
            <Controller
              name="containerId"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Container Id"
                  value={containerValue}
                  onChange={(e) => {
                    setContainerValue(e.target.value);
                    field.onChange(e.target.value);
                  }}
                  errorContent={errors?.containerId?.message}
                />
              )}
            />
          </div>

          {/* Role Mapping */}
          <div className="flex items-center justify-between">
            <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
              Role Mapping
            </h5>
            <Search
              containerClassName="w-full sm:w-auto rounded p-2"
              placeholder="Search roles"
              label="search"
            />
          </div>

          {rolesLoading ? (
            <TableShimmer />
          ) : (
            <div className="card-body dark:bg-slate-800 p-0">
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

export default WidgetCMSAddEdit;
