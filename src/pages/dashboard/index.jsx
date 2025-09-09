import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { fetchDashboardStats } from "../../redux/actions/dashboard-action";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { FaArrowRight } from "react-icons/fa"; // Import an icon for the button
import { Button } from "../../components/buttons";
import { MetaTitle } from "../../components/metaTitle";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <>
      <MetaTitle title={"DashBoard | Anarock"} />
      {loading ? (
        <TableShimmer />
      ) : (
        <div>
          <h1 className="!text-2xl font-semibold text-[#3d3d47] mb-6 dark:text-white">
            Dashboard Statistics
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Sections"
              stats={stats?.domains}
              onNavigate={() => navigate("/section")}
            />
            <Card
              title="Widgets"
              stats={stats?.masterConfig}
              onNavigate={() => navigate("/widget")}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Card = ({ title, stats, onNavigate }) => (
  <div className="bg-white  border rounded-lg shadow-md p-4 flex flex-col gap-2  dark:bg-gray-800 dark:border-[#36465e]">
    <h2 className="!text-base font-bold mb-2 dark:text-white">{title}</h2>
    <p className="text-gray-700 dark:text-white">Total: {stats?.total}</p>
    <p className="text-gray-700 dark:text-white">Active: {stats?.active}</p>

    <Button
      onClick={onNavigate}
      outLine={true}
      // className={"w-[60%]"}
      // className="mt-4 flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
    >
      <span>Go to {title}</span>
      <FaArrowRight className="ml-2" />
    </Button>
  </div>
);
