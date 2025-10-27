import { IconBox } from "../iconBox";
import { GoDotFill } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
// import "./sidebar.scss";
import { useState } from "react";
import {
  LuAlignJustify,
  LuDatabase,
  LuHouse,
  LuLayoutDashboard,
  LuPanelLeftClose,
  LuArrowRight,
  LuBuilding2,
} from "react-icons/lu";
import { iconSize } from "../../utils";

export const Sidebar = ({ className, collapse, setCollapse }) => {
  const initialSidebarItems = [
    {
      id: 0,
      title: "Dashboard",
      icon: <LuHouse size={iconSize} />,
      to: "/dashboard",
      isPinned: false,
    },
    {
      id: 2,
      title: "Communities",
      icon: <LuBuilding2 size={iconSize} />,
      to: "/communities",
      isPinned: false,
    },
    {
      id: 3,
      title: "My Data",
      icon: <LuDatabase size={iconSize} />,
      child: [
        // { title: "Container", to: "/containers", icon: <LuLayoutDashboard size={iconSize} />},
        {
          title: "Section",
          to: "/section",
          icon: <LuLayoutDashboard size={iconSize} />,
        },
        {
          title: "Widget",
          to: "/widget",
          icon: <LuLayoutDashboard size={iconSize} />,
        },
      ],
      isPinned: false,
    },
  ];
  const [items, setItems] = useState(initialSidebarItems);

  // Handler to toggle the pin status of an item
  const handlePinToggle = (title) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.title === title ? { ...item, isPinned: !item.isPinned } : item
      );

      // Separate pinned and non-pinned items
      const pinnedItems = updatedItems.filter((item) => item.isPinned);
      const nonPinnedItems = updatedItems.filter((item) => !item.isPinned);

      // Reinsert non-pinned items to their initial positions
      nonPinnedItems.sort((a, b) => a.id - b.id);

      return [...pinnedItems, ...nonPinnedItems];
    });
  };

  const handleSidebar = () => {
    setCollapse(!collapse);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ left: "-50%" }}
        animate={{ left: 0, transition: { duration: 0.3 } }}
        exit={{ left: "-50%", transition: { duration: 0.3 } }}
        className={`${
          className ? className : ""
        } shadow-sm dark:dark:bg-slate-900`}
      >
        <div
          className={`${
            collapse ? "flex justify-center items-center" : "pl-2"
          } pb-4`}
        >
          <button onClick={handleSidebar}>
            {!collapse ? (
              <LuPanelLeftClose
                className="text-black dark:text-white "
                size={iconSize}
              />
            ) : (
              <LuAlignJustify
                className="text-black dark:text-white"
                size={iconSize}
              />
            )}
          </button>
        </div>
        <div className=" ">
          {items?.map((item, index) => (
            <>
              <IconBox
                containerClassName="px-4 py-2"
                titleClassName={
                  item.to == null && "font-semibold !text-[#884ea7] uppercase "
                }
                className={item.className}
                item={item}
                key={index}
                to={item.to}
                icon={item.icon}
                title={!collapse ? item.title : ""}
                child={item.child}
                setPin={() => handlePinToggle(item.title)}
                collapse={collapse}
              />
            </>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
