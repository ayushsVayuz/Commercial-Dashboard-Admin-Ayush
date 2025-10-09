export const Unauthorized = (containerClassName, imageClassName) => {
  return (
    <div
      className={`${containerClassName} fixed inset-0 size-full px-4 bg-white dark:bg-slate-800 flex flex-col justify-center items-center text-center gap-6`}
    >
      <img
        className={`${imageClassName} w-80`}
        src={"/no-data-img.svg"}
        alt="No data available"
      />
      <h1 className="font-extrabold text-3xl  text-gray-800 dark:text-gray-300">
        🚫 Unauthorized Access
      </h1>
      <p className="text-lg text-gray-600">
        You do not have permission to view this page.
      </p>
      {/* <Link to={"/"} className="mt-4 text-primaryText hover:underline">
        Back to Homepage
      </Link> */}
    </div>
  );
};
