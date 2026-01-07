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
import {
  resetSectionPayload,
  resetSectionWidgetPosition,
} from "../../redux/slices/sectionSlice";
import { Toggle } from "../../components/inputs/toogle";
import { LuCircuitBoard, LuLoaderCircle } from "react-icons/lu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateSectionOrder } from "../../redux/actions/dashboard-action";
import toast from "react-hot-toast";

const modernAnimationStyles = `
  .table-row {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }
  
  .row-moving-up {
    transform: translateY(-100%) scale(1.02);
    
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    z-index: 10;
    position: relative;
  }
  
  .row-moving-down {
    transform: translateY(100%) scale(1.02);
   
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    z-index: 10;
    position: relative;
  }
  
  .row-highlight {
    background: linear-gradient(90deg, #4caf50, #81c784);
    color: white;
    transform: scale(1.01);
    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  }
  
  @keyframes success-pulse {
    0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
  }
  
  .success-animation {
    animation: success-pulse 1s ease-out;
  }
`;

const SectionListing = () => {
  const dispatch = useDispatch();

  const [isAnimating, setIsAnimating] = useState(false);
  const [movingRows, setMovingRows] = useState({});
  const { sections, statusLoading, loading, totalCount } = useSelector(
    (state) => state.section
  );
  const [localSections, setLocalSections] = useState([]);
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

  //   useEffect(() => {
  //   setLocalSections(sections || []);
  // }, [sections]);

  useEffect(() => {
    if (sections && sections.length > 0) {
      // Preserve the order if localSections was reordered
      if (localSections.length === sections.length) {
        const updatedLocal = localSections.map((localSection) => {
          const updatedSection = sections.find(
            (s) => s.section_id === localSection.section_id
          );
          return updatedSection
            ? { ...localSection, status: updatedSection.status }
            : localSection;
        });
        setLocalSections(updatedLocal);
      } else {
        setLocalSections(sections);
      }
    }
  }, [sections]);

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
    "Move",
    "Sr No.",
    "Section Name",
    "Order",
    // "Collapsible",
    // "Collapsed",

    "Status",
    "Action",
  ];

  const actionMenu = [
    {
      label: "Container Mapping",
      url: `/section/cms/`,
      icon: <LuCircuitBoard className="text-xl" />,
    },

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

  const moveSection = (index, direction) => {
    if (isAnimating) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= localSections.length) return;

    setIsAnimating(true);

    // Apply animation classes
    setMovingRows({
      [index]: direction === "up" ? "row-moving-up" : "row-moving-down",
      [newIndex]: direction === "up" ? "row-moving-down" : "row-moving-up",
    });

    // Listen for transition end
    const handleTransitionEnd = () => {
      const reordered = [...localSections];
      [reordered[index], reordered[newIndex]] = [
        reordered[newIndex],
        reordered[index],
      ];

      const updated = reordered.map((s, idx) => ({
        ...s,
        order_index: idx + 1,
      }));

      setLocalSections(updated);
      setMovingRows({});
      setIsAnimating(false);

      // Save backend
      const payload = updated.map((s) => ({
        id: s?.section_id,
        order_index: s?.order_index,
      }));

      dispatch(updateSectionOrder({ sections: payload }));

      // Cleanup
      document.removeEventListener("transitionend", handleTransitionEnd);
    };

    // Attach listener (fires only once)
    document.addEventListener("transitionend", handleTransitionEnd, {
      once: true,
    });
  };

  const handleSectionStatus = async (section) => {
    try {
      const response = await dispatch(
        changeStatusSection({ sectionId: section.section_id })
      ).unwrap();

      if (response?.statusCode === 200) {
        toast.success("Section status updated successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update section status");
    }
  };

  const tableData = localSections?.map((section, index) => ({
    move: {
      component: (
        <div className="flex gap-1 justify-center items-center">
          <button
            onClick={() => moveSection(index, "up")}
            disabled={index === 0 || isAnimating}
            className="group p-2 rounded-full hover:bg-blue-50 disabled:opacity-30 
                   disabled:cursor-not-allowed transition-all duration-200 
                   hover:scale-110 active:scale-95"
          >
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 14l5-5 5 5"
              />
            </svg>
          </button>

          <button
            onClick={() => moveSection(index, "down")}
            disabled={index === localSections.length - 1 || isAnimating}
            className="group p-2 rounded-full hover:bg-blue-50 disabled:opacity-30 
                   disabled:cursor-not-allowed transition-all duration-200 
                   hover:scale-110 active:scale-95"
          >
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10l5 5 5-5"
              />
            </svg>
          </button>
        </div>
      ),
    },
    srNo: { content: currentPage * rowsPerPage + (index + 1) },

    name: { content: section.section_name, link: `view/${section.section_id}` },
    order: { content: section.order_index?.toString() },
    // isCollapsible: {
    //   content: section.is_collapsible ? "Yes" : "No",
    //   type: "status",
    // },
    // isCollapsed: {
    //   content: section.is_collapsed ? "Yes" : "No",
    //   type: "status",
    // },

    status: {
      component: (
        <>
          {statusLoading == section.section_id ? (
            <div className="flex justify-center items-center">
              <LuLoaderCircle size={24} />
            </div>
          ) : (
            <Toggle
              value={section.status == 1 ? true : false}
              onChange={() => handleSectionStatus(section)}
            />
          )}
        </>
      ),
    },
    actions: {
      component: <MoreOption id={section.section_id} actionMenu={actionMenu} />,
    },

    // move: {
    //   component: (
    //     <div className="flex gap-1 justify-center items-center">
    //       <button
    //         onClick={() => moveSection(index, "up")}
    //         disabled={index === 0 || isAnimating}
    //         className="group p-2 rounded-full hover:bg-blue-50 disabled:opacity-30
    //                disabled:cursor-not-allowed transition-all duration-200
    //                hover:scale-110 active:scale-95"
    //       >
    //         <svg
    //           className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M7 14l5-5 5 5"
    //           />
    //         </svg>
    //       </button>

    //       <button
    //         onClick={() => moveSection(index, "down")}
    //         disabled={index === localSections.length - 1 || isAnimating}
    //         className="group p-2 rounded-full hover:bg-blue-50 disabled:opacity-30
    //                disabled:cursor-not-allowed transition-all duration-200
    //                hover:scale-110 active:scale-95"
    //       >
    //         <svg
    //           className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M7 10l5 5 5-5"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //   ),
    // },
    // className: "transition-all duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700"
  }));

  return (
    <section className="flex flex-col gap-4">
      <style>{modernAnimationStyles}</style>
      <MetaTitle title="Section | Anarock" />

      <div className="flex  sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/section"
          parent="Section"
          mainTitle="Section Listing"
        />
        <Link
          className="w-fit bg-[#884EA7] text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
          to="/section/add"
          onClick={() =>
            dispatch(
              resetSectionPayload(),
              dispatch(resetSectionWidgetPosition())
            )
          }
        >
          Add Section
        </Link>
      </div>

      <div className="flex flex-row justify-end">
        <div className="flex justify-end items-center gap-2 w-fit">
          <Search
            containerClassName="w-full sm:w-auto mb-2 rounded px"
            placeholder="Search"
            label="search"
          />
        </div>

      </div>



      {/* {loading ? (
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
      )} */}

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
            movingRows={movingRows}
          />
        </div>
      )}
    </section>
  );
};

export default SectionListing;
