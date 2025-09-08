import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Table } from "../../components/table";
import { TbEdit, TbEye } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { IoMdDownload } from "react-icons/io";
// import { FaDownload } from "react-icons/fa6";
import {
  createMasterConfig,
  downloadCSVFileApi,
  fetchMasterConfigs,
  updateMasterConfigStatus,
  uploadCSVFile,
} from "../../redux/actions/master-config-actions"; // Assuming actions are in this path
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Search } from "../../components/search";
import { decrypt, encrypt, titleCase } from "../../functions";
import { complex } from "framer-motion";
import Papa from "papaparse";
import { ConfirmationModal } from "../../components/modal/confirmationModal";
import { Heading } from "../../components/heading";

const MasterConfigPage = () => {
  const dispatch = useDispatch();
  const {
    masterConfigs,
    isToggleLoading,
    loading,
    totalPages,
    csvFileLoading,
    downloadCSVFile,
  } = useSelector((state) => state.masterConfig); // Access the state

  const [searchParams, setSearchParams] = useSearchParams();
  // const [csvFile, setCsvFile] = useState([]);
  const page = parseInt(decrypt(searchParams.get("page"))) || 0;
  const searchValue = decrypt(searchParams.get("search")) || "";
  // const [confirmationModal, setConfirmationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [csvFile, setCsvFile] = useState({ data: [] });
  const [showPreview, setShowPreview] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    setSearchParams({
      page: encrypt(currentPage.toString()),
      search: encrypt(searchValue),
    });
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setCurrentPage(0);
      dispatch(fetchMasterConfigs([{ field: "query", value: searchValue }])); // Dispatch with decrypted search value
    } else {
      dispatch(fetchMasterConfigs([{ field: "page", value: currentPage + 1 }])); // Dispatch with decrypted page
    }
  }, [currentPage, searchValue]);

  const headers = [
    "No.",
    "Key",
    "Value",
    "Added On",
    "Status",
    "Toggle Status",
    "Action",
  ];

  // Format the data coming from the API for the Table component
  const dataToPass = masterConfigs?.map((config, index) => ({
    id: config.masterConfigId,
    key: titleCase(config.key), // Key from the config
    value: titleCase(config.value), // Value from the config
    creationDate: new Date(config.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }), // Format date
    status: config.isActive ? "Active" : "Inactive",
  }));

  // Define actions for each row
  const getActionMenu = (id) => [
    {
      label: "Edit",
      url: `/masterConfig/edit/${encrypt(id)}`,
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: `/masterConfig-detail/${encrypt(id)}`,
      icon: <TbEye className="text-xl" />,
    },
  ];

  const onToggleChange = async (row) => {
    dispatch(
      updateMasterConfigStatus({
        masterConfigId: row.id,
        statusData: {
          isActive: row.status == "Active" ? false : true,
        },
      })
    );
  };

  // useEffect(() => {
  //   console.log(confirmationModal);
  //   setConfirmationModal(true);
  //   if (csvFile.data && csvFile.data.length > 0) {
  //     console.log(csvFile, "csv file data");
  //     dispatch(uploadCSVFile(csvFile));
  //     dispatch(fetchMasterConfigs([{ field: "page", value: currentPage + 1 }]));
  //   }
  // }, [csvFile]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file, "file");
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log(results);
        setCsvFile({ data: results.data });
        setShowPreview(true); // Open the preview modal
      },
    });
  };

  const handleConfirmUpload = () => {
    if (csvFile.data && csvFile.data.length > 0) {
      console.log(csvFile, "confirmed csv file data");
      dispatch(uploadCSVFile(csvFile));
      dispatch(fetchMasterConfigs([{ field: "page", value: currentPage + 1 }])); // Refresh data
      setShowPreview(false);
    }
  };
  const handleDownloadCSV = () => {
    dispatch(downloadCSVFileApi()); // Dispatch to initiate API call
  };

  useEffect(() => {
    if (downloadCSVFile?.length > 0) {
      console.log("Preparing CSV file for download");

      // Define the CSV headers based on object keys
      const csvHeaders = Object.keys(downloadCSVFile[0]);

      // Map the array of objects to CSV rows
      const csvRows = downloadCSVFile.map((row) =>
        csvHeaders.map((header) => row[header] || "").join(",")
      );

      // Combine headers and rows into a CSV string
      const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

      // Create a Blob from the CSV string
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      // Trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "master-config.csv"; // Specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the URL
    }
  }, [downloadCSVFile]);
  // Trigger effect when downloadCSVFile updates
  const Filter = () => {
    return (
      <div class="min-w-20 absolute top-4 right-4 overflow-hidden bg-white dark:bg-darkPrimary divide-y divide-gray-100 dark:divide-gray-700 border rounded-md shadow z-50 dark:border-gray-700">
        <p className="px-2 py-1 text-sm font-semibold whitespace-nowrap">
          Select Status
        </p>
        {filterMenu.map((item, index) => (
          <div
            className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
            key={index}
          >
            <Link href={item.url}>{item.label}</Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <MetaTitle title={"Master Config | Anarock"} />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <Heading
            sectionLink="/masterConfig"
            parent="Master Config"
            mainTitle="Master Config Listing"
          />
          <div className="flex gap-3">
            <button
              onClick={handleDownloadCSV}
              className=" bg-buttonBg text-white px-4 py-2 hover:bg-opacity-80 hover:text-white rounded"
            >
              <IoMdDownload />
            </button>
            <label className="bg-buttonBg text-white px-5 py-2 hover:bg-opacity-80 hover:text-white rounded cursor-pointer">
              Upload CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <Link
              className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
              to="/masterConfig/add"
            >
              Create Master Config
            </Link>
          </div>
        </div>
        <div className="flex sm:justify-end items-center gap-2">
          <Search
            containerClassName={"w-full sm:w-auto mb-2"}
            placeholder={"Search"}
            label="search"
            filter={<Filter />}
          />
        </div>
        {loading || csvFileLoading ? (
          <TableShimmer />
        ) : (
          <div className="card bg-themeDefault  dark:dark:bg-slate-800">
            <div className="card-body p-0">
              <Table
                module={"MasterConfig"}
                headers={headers}
                initialData={dataToPass}
                isAction={true}
                isFucntionAction={getActionMenu}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                isToggleLoading={isToggleLoading}
                currentPage={currentPage}
                rowPerPage={false}
                isStatus={true}
                onToggleChange={onToggleChange}
              />
            </div>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        {/* <MetaTitle title={"Master Config | Anarock"} /> */}
        {/* <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h1>Master Config Listing</h1>

          <Link
            className="w-fit bg-buttonBg text-white px-12 py-2 hover:bg-opacity-80 hover:text-white rounded"
            to="/masterConfig/add"
          >
            Create
          </Link> */}
        {/* </div> */}

        {/* <div className="card">
          <div className="ml-auto">
            <Search placeholder={"Search by Name"} />
          </div>
          {loading || csvFileLoading ? (
            <TableShimmer />
          ) : (
            <div className="card bg-themeDefault dark:dark:bg-slate-800">
              <div className="card-body p-0">
                <Table
                  module={"MasterConfig"}
                  headers={headers}
                  initialData={dataToPass}
                  isAction={true}
                  isFucntionAction={getActionMenu}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  isToggleLoading={isToggleLoading}
                  currentPage={currentPage}
                  rowPerPage={false}
                  isStatus={true}
                  onToggleChange={onToggleChange}
                />
              </div>
            </div>
          )}
        </div> */}
        <ConfirmationModal
          isOpen={showPreview}
          onConfirm={handleConfirmUpload}
          onClose={() => setShowPreview(false)}
        >
          <div>
            <h2>CSV Preview</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {csvFile.data.length > 0 &&
                    Object.keys(csvFile.data[0]).map((header) => (
                      <th key={header} className="py-2 px-4 border-b">
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {csvFile.data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="py-2 px-4 border-b">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ConfirmationModal>
      </section>
    </>
  );
};

export default MasterConfigPage;
