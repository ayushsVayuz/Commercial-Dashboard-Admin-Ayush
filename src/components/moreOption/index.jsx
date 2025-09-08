import React, { useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../functions/index";
import { RxCross2 } from "react-icons/rx";

export const MoreOption = ({ actionMenu, isFunctionMenu, row }) => {
  const [open, isOpen] = useState(false);

  const menuRef = useRef();

  const closeModal = () => {
    isOpen(false);
  };

  useOutsideClick(menuRef, closeModal);

  return (
    <div className="relative">
      <button
        className="p-1 rounded-full dark:text-white text-xl dark:hover:bg-gray-700 hover:bg-gray-200"
        onClick={() => isOpen(!open)}
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        type="button"
      >
        <IoMdMore />
      </button>
      {open && (
        <div
          ref={menuRef}
          id="dropdownHover"
          class="absolute top-4 right-4 overflow-hidden bg-white dark:bg-darkPrimary divide-y divide-gray-100 dark:divide-gray-700 border rounded-md shadow z-50 dark:border-gray-700"
        >
          <button className="hidden px-x py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <RxCross2 className="text-xl" />
          </button>
          {isFunctionMenu ? (
            <>
              <td className="text-center  whitespace-nowrap text-xs">
                {typeof row.id == Object
                  ? isFunctionMenu(row.id).map((action) => (
                      <>
                        {console.log(row, "huhuuuu")}
                        <Link
                          to={action.url}
                          key={action.label}
                          className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
                        >
                          {action.icon}
                          {action.label}
                        </Link>
                      </>
                    ))
                  : isFunctionMenu(row.id).map((action) => (
                      <Link
                        to={action.url}
                        key={action.label}
                        className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
                      >
                        {action.icon}
                        {action.label}
                      </Link>
                    ))}
              </td>
            </>
          ) : (
            <>
              {actionMenu?.map((data, index) => (
                <>
                  {data.type == "Children" ? (
                    <>{data.children}</>
                  ) : (
                    <Link
                      to={data.url}
                      key={index}
                      className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
                    >
                      {data.icon ? data.icon : null}
                      <p className="">{data.label}</p>
                    </Link>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
