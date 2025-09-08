import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { IoArrowUpOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MoreOption } from "../moreOption";
import { Link } from "react-router-dom";
import { TableShimmer } from "../shimmers/tableShimmer";
import { Toggle } from "../inputs/toogle";
import { NoData } from "../noDara";
import { LoaderIcon } from "react-hot-toast";

export const Table = ({
  module,
  loading,
  headers,
  initialData,
  isAction,
  isStatus,
  actionMenu,
  isFucntionAction,
  isRowComponent,
  RowComponent,
  length,
  selectedValue,
  setSelectedValue,
  currentPage,
  setCurrentPage,
  setSort,
  headersSort,
  onToggleChange,
  isToggleLoading,
  totalPages,
  rowPerPage,
}) => {
  const [data, setData] = useState(initialData);

  const [sorting, setSorting] = useState({
    column: null,
    direction: "asc", // "asc" or "desc"
  });

  // Handler for select change
  const handleChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Function to handle sorting
  const handleSort = (column) => {
    setSort((prev) => {
      return {
        column: headersSort[column],
        direction: prev.direction == "DESC" ? "ASC" : "DESC",
      };
    });

    if (sorting.column === column) {
      setSorting((prevSorting) => ({
        ...prevSorting,
        direction: prevSorting.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      setSorting({
        column,
        direction: "asc",
      });
    }
  };

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  let itemsPerPageCount = [];

  for (let i = 10; i <= 50; i++) {
    if (i % 10 == 0) {
      itemsPerPageCount.push(i);
    }
  }
  return (
    <>
      {loading ? (
        <TableShimmer />
      ) : (
        <>
          {initialData?.length > 0 ? (
            <>
              <div className="overflow-x-auto mx-auto w-full">
                <table className="min-w-full bg-white dark:bg-slate-800 table-striped">
                  <thead>
                    <tr className="w-full bg-[#F0F0F0] dark:bg-gray-900">
                      {headers?.map((header, index) => (
                        <th
                          key={index}
                          className="text-center py-4 px-4 font-normal text-xs whitespace-nowrap "
                        >
                          <div className="flex items-center justify-center text-[#121212] dark:text-gray-200 ">
                            {header}
                            <>
                              {/* {!headersSort &&
                                !header.toLowerCase().includes("action") && (
                                  <button
                                    className="ml-2"
                                    onClick={() => handleSort(index)}
                                  >
                                    <IoArrowUpOutline
                                      className={`${
                                        sorting.column === index &&
                                        sorting.direction === "asc"
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                )} */}
                              {headersSort &&
                                !header.toLowerCase().includes("action") &&
                                headersSort[index].length > 0 && (
                                  <button
                                    className="ml-2"
                                    onClick={() => handleSort(index)}
                                  >
                                    <IoArrowUpOutline
                                      className={`${
                                        sorting.column === index &&
                                        sorting.direction === "asc"
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                )}
                            </>
                            {/* {Object.entries(header).map(
                          ([key, cell], cellIndex) => (
                           
                          )
                        )} */}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={headers?.length}
                          className="text-center py-4 "
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      <>
                        {isRowComponent ? (
                          <RowComponent />
                        ) : (
                          data?.map((row, rowIndex) => (
                            <>
                              <tr
                                key={rowIndex}
                                className="border-b border-dashed border-gray-300 dark:border-gray-500 last:border-none"
                              >
                                {Object.entries(row).map(
                                  ([key, cell], cellIndex) => (
                                    <td
                                      key={cellIndex}
                                      className={`${
                                        key == "Property Name" ||
                                        key == "Tenant Name"
                                          ? "text-left"
                                          : "text-center"
                                      } ${
                                        module == "Forms" &&
                                        key == "id" &&
                                        "hidden"
                                      } py-4 px-1 whitespace-nowrap text-xs`}
                                    >
                                      {key == "id" ? (
                                        <Link
                                          to={`/${
                                            module == "Lease"
                                              ? "lease"
                                              : module == "Member"
                                              ? "member"
                                              : module == "Propery"
                                              ? "property"
                                              : module == "Company"
                                              ? "company"
                                              : module == "Unit"
                                              ? "unit"
                                              : module == "Domain"
                                              ? "domain"
                                              : module == "MasterConfig"
                                              ? "masterConfig"
                                              : module == "RouteMF"
                                              ? "routeMF"
                                              : module == "Config"
                                              ? "config"
                                              : module == "Regex"
                                              ? "regex"
                                              : module == "Forms"
                                              ? "forms"
                                              : ""
                                          }-detail/${cell}`}
                                          className="text-primaryText hover:underline font-semibold"
                                        >
                                          {currentPage * 10 + (rowIndex + 1)}
                                        </Link>
                                      ) : key === "totalUnit" ? (
                                        <Link
                                          to={`/unit`}
                                          className="text-primaryText hover:underline font-medium text-xs"
                                        >
                                          {cell}
                                        </Link>
                                      ) : key === "Community" ||
                                        key === "community" ? (
                                        <Link
                                          to={`/property-detail/${row.id}`}
                                          className="text-primaryText hover:underline font-medium text-xs"
                                        >
                                          {cell}
                                        </Link>
                                      ) : key === "unitOrBlock" ? (
                                        <Link
                                          to={`/unit-detail/${rowIndex}`}
                                          className="text-primaryText hover:underline font-medium text-xs"
                                        >
                                          {cell}
                                        </Link>
                                      ) : (
                                        <span
                                          className={`${
                                            cell === "Active" ||
                                            cell === "In progress"
                                              ? "bg-[#43b9b2]/[0.1] text-[#43b9b2] dark:text-green-300 px-3 py-1 rounded-full"
                                              : cell === "Reject" ||
                                                cell === "Under Notice" ||
                                                cell === "Occupied"
                                              ? "bg-[#fd7e40]/[0.1] text-[#C42A02] dark:text-red-300 px-3 py-1 rounded-full"
                                              : cell === "Pending" ||
                                                cell === "Under-Review" ||
                                                cell === "Inactive" ||
                                                cell === "Not leased"
                                              ? "bg-[#fd7e4033]/[0.2] text-[#fd7e40] dark:text-yellow-300 px-3 py-1 rounded-full"
                                              : cell === "Expired"
                                              ? "bg-[#2c2c31]/[0.2] text-[#2c2c31] dark:text-gray-300 px-3 py-1 rounded-full"
                                              : cell === "Modification-Required"
                                              ? " bg-[#c280d2]/[0.2] text-[#c280d2] dark:text-[#dda7eb] px-3 py-1 rounded-full"
                                              : cell === "Vacant"
                                              ? " bg-green-500/[0.2] text-green-900 dark:text-[#dda7eb] px-3 py-1 rounded-full"
                                              : "dark:text-white "
                                          }`}
                                        >
                                          {cell?.length > 30
                                            ? cell.slice(0, 30) + "..."
                                            : cell}
                                        </span>
                                      )}
                                    </td>
                                  )
                                )}
                                {isStatus && (
                                  <div className="text-center py-2 px-2 whitespace-nowrap text-xs justify-center items-center flex capitalize">
                                    {!(isToggleLoading == row.id) ? (
                                      <Toggle
                                        onChange={() => onToggleChange(row)}
                                        isChecked={
                                          row.status == "Active" ? true : false
                                        }
                                      />
                                    ) : (
                                      <LoaderIcon />
                                    )}
                                  </div>
                                )}
                                {isAction && (
                                  <td className="text-center py-2 px-2 whitespace-nowrap text-xs">
                                    <MoreOption
                                      actionMenu={actionMenu}
                                      isFunctionMenu={isFucntionAction}
                                      row={row}
                                    />
                                  </td>
                                )}
                              </tr>
                            </>
                          ))
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="px-2 my-4 flex flex-col sm:flex-row justify-start items-center gap-4">
                  <div className="flex items-center">
                    <p className="text-xs dark:text-white">Rows per page:</p>
                    <select
                      className="focus:outline-none text-xs px-2"
                      value={selectedValue}
                      onChange={handleChange}
                    >
                      {itemsPerPageCount?.map((i, k) => (
                        <option key={k} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <p className="text-xs dark:text-white">1-10 of 22</p> */}
                  <ReactPaginate
                    previousLabel={
                      <IoIosArrowBack className="text-xs dark:text-white" />
                    }
                    nextLabel={
                      <IoIosArrowForward className="text-xs dark:text-white" />
                    }
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={currentPage}
                    onPageChange={handlePageChange}
                    activeLinkClassName=" px-2"
                    containerClassName={
                      "pagination my-2 flex justify-center items-center gap-2 dark:text-white"
                    }
                    activeClassName={"active text-primaryText"}
                  />
                </div>
              )}
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  );
};
