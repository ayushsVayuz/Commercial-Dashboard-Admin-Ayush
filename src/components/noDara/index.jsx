import { Link } from "react-router-dom";

export const NoData = ({ containerClassName, imageClassName }) => {
  return (
    <div
      className={`${containerClassName} px-4 w-full min-h-screen flex flex-col justify-center items-center text-center gap-6`}
    >
      <img
        className={`${imageClassName} w-80`}
        src={"/no-data-img.svg"}
        alt="No data available"
      />
      <h1 className="font-extrabold text-3xl text-gray-800 dark:text-gray-300">No Data Available</h1>
      <p className="text-lg text-gray-600">
        We couldn’t find any data to display at the moment.
        <br /> Please try again later or check back soon.
      </p>
      {/* <Link to={"/"} className="mt-4 text-primaryText hover:underline">
        Back to Homepage
      </Link> */}
    </div>
  );
};
