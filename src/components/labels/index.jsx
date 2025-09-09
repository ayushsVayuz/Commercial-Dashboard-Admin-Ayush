export const RenderLableValue = (label, value, file) => {
  console.log(file, "file1");
  const renderFilePreview = (file) => {
    console.log(file, "file");
    if (file) {
      // If the uploaded file is an image, show the preview of the image
      const isImageUrl = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file);
      const isPdfUrl = /\.pdf$/i.test(file);

      // If it's a local file and an image, show the preview of the image
      if (file?.type?.startsWith("image/") || isImageUrl) {
        return (
          <div className="max-w-32 lg:max-w-full h-32">
            <img
              src={isImageUrl ? file : URL.createObjectURL(file)}
              alt="File preview"
              className="object-cover max-w-full h-full"
            />
          </div>
        );
      }
      // If it's a PDF, display it inside an iframe
      else if (file?.type === "application/pdf" || isPdfUrl) {
        return (
          <iframe
            src={isPdfUrl ? file : URL.createObjectURL(file)}
            title="PDF Preview"
            className="w-32 lg:w-full h-40 border"
          />
        );
      } else {
        // If it's another file type, show the file name
        return <span>{file.name}</span>;
      }
    } else if (image) {
      // If no file is uploaded, show the image passed as a prop (initial image)
      return (
        <img
          src={image}
          alt="Initial preview"
          className="w-32 lg:w-full h-32"
        />
      );
    }
    return null;
  };
  return (
    <div className="flex flex-col gap-2">
      {file && (
        <div className="min-h-32 p-4 border dark:border-gray-600 flex justify-center items-center rounded overflow-hidden">
          {renderFilePreview(file)}
        </div>
      )}
      <p className="flex flex-col font-medium">
        <span className="text-[#6C6C6C] dark:text-gray-400 text-sm">
          {label}:
        </span>
        <span className="font-medium text-black dark:text-white text-base break-all capitalize">
          {value ? value : "--"}
        </span>
      </p>
    </div>
  );
};

export const RenderValue = (value, className) => (
  <p
    className={`${
      className && className
    } font-medium  text-black dark:text-white text-base break-all`}
  >
    {value}
  </p>
);
