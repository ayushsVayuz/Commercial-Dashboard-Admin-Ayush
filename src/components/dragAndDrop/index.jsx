import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import ImagePreview from "../imagePreview";
import { useDispatch } from "react-redux";
import { FcGallery } from "react-icons/fc";

export const DragAndDrop = ({
  className,
  folder,
  text,
  images,
  handleDelete,
  handleUpload,
  errorContent,
  isDocument = false, // Add isDocument prop with default value false
}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [onDrag, setOnDrag] = useState(false);

  const handleDrop = async (files) => {
    setLoading(true); //disable loading if upload in progress
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", folder);
      formData.append("folder", `Images/${text}`);
      //formData.append("api_key", process.env.CLOUDINARY_API_KEY); // Replace with your actual API key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading(true);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const url = data.secure_url;
          const publicId = data.public_id;
          handleUpload({ url, publicId });
        });
    });

    axios.all(uploaders).then(() => {
      setLoading(false);
      // Add any additional logic to be executed after all uploads are complete
    });
  };

  return (
    <div
      className={`${className && className} ${onDrag ? "border-primary" : ""} ${
        errorContent ? "border-error" : "border-[#D6D6D6]"
      } p-5 border dark:border-gray-600 rounded-lg flex flex-col gap-2 justify-center items-center`}
    >
      <Dropzone
        onDrop={handleDrop}
        onDragEnter={() => {
          setOnDrag(true);
        }}
        onDragLeave={() => {
          setOnDrag(false);
        }}
        accept={
          isDocument
            ? {
                // Accept only document types
                "application/pdf": [".pdf"],
                "application/msword": [".doc", ".docx"],
                "text/plain": [".txt"],
              }
            : {
                // Accept only image types
                "image/png": [".png"],
                "image/jpeg": [".jpeg", ".jpg"],
              }
        }
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center text-center gap-2">
                <svg
                  className="mt-2 w-10 h-10 mx-auto text-gray-400 dark:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <span className="mt-2 block text-sm text-gray-800 dark:text-gray-200">
                  Browse your device or{" "}
                  <span className="group-hover:text-blue-700 text-blue-600">
                    drag &apos;n drop&apos;
                  </span>
                  <span className="ml-1">to select files for {text}</span>
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  Maximum file size is 2 MB
                </span>
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="h-1 mb-2">
        {errorContent && <p className=" text-error text-xs">{errorContent}</p>}
      </div>

      <ImagePreview images={images} handleDelete={handleDelete}></ImagePreview>
    </div>
  );
};
