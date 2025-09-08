import { useState } from "react";
import Papa from "papaparse";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../buttons";
import { Heading } from "../heading";
import { useLocation, useNavigate } from "react-router-dom";

export const UploadBulkCSV = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvContent, setCsvContent] = useState("");
  
  // Navigation Functions
  const { pathname } = useLocation();
  const isProperty = pathname.includes("property");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        setIsModalOpen(true);
        setCsvContent(Papa.unparse(results.data));
      },
      error: (error) => {
        console.error(error);
        alert("Error parsing CSV file.");
      },
    });
  };

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "parsed_data.csv";
    link.click();
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Heading
          containerClassName={"my-4"}
          sectionLink={isProperty ? "/properties" : "/unit"}
          parent={isProperty ? "Property" : "Unit"}
          mainTitle={`Upload Bulk ${isProperty ? "Property" : "Unit"}`}
        />
      </div>
      <div className="w-full p-6 mt-4 rounded-lg shadow-md flex flex-col gap-4">
        <ol className="list-disc pl-5 flex flex-col gap-4">
          <li className="text-gray-600">
            Prepare your CSV file with the necessary columns and ensure it's
            saved with a <strong>.csv</strong> extension.
          </li>
          <li className="text-gray-600">
            Open the CSV file using a spreadsheet application or a text editor
            to verify its contents.
          </li>
          <li className="text-gray-600">
            Confirm that all required data is included and properly formatted
            according to the specifications.
          </li>
          <li className="text-gray-600">
            Save any changes you make to the CSV file and ensure it remains in
            the <strong>.csv</strong> format.
          </li>
          <li className="text-gray-600">
            Upload the CSV file to the designated system or platform as
            instructed.
          </li>
        </ol>
        <div className="w-fit">
          <p>Download sample file</p>
          <Button outLine={true} onClick={handleDownload}>
            Download
          </Button>
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full mb-4 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        <div className="flex justify-end gap-2">
          <Button outLine={true} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button mainPrimary={true} onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="w-full h-full bg-black bg-opacity-50 fixed top-0 bottom-0 left-0 right-0 z-[1005]"
        >
          <div
            className={`w-11/12 sm:w-8/12 lg:w-1/2 h-[90vh]
            bg-white dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 p-0 overflow-hidden rounded-lg shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1010] outline-none`}
          >
            <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <RxCross2 />
              </button>
              <h3 className="text-lg font-semibold mb-4">Preview CSV Data</h3>
              <div className="h-[65vh] overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {data[0] &&
                        Object.keys(data[0]).map((key) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, idx) => (
                          <td
                            key={idx}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                {/* <Button outLine={true} onClick={handleDownload}>
                  Download
                </Button> */}
                <Button mainPrimary={true}>Upload</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
