import { useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../functions/index";
import { RxCross2 } from "react-icons/rx";

export const MoreOption = ({ id, actionMenu }) => {
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
          class="absolute top-6 right-16 overflow-hidden bg-white dark:bg-darkPrimary divide-y divide-gray-100 dark:divide-gray-700 border rounded-md shadow z-50 dark:border-gray-700"
        >
          <button className="hidden px-x py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <RxCross2 className="text-xl" />
          </button>
          {actionMenu?.map((data, index) => (
            <>
              <Link
                to={`${data.url || ""}${id || ""}`}
                // onClick={(event) => {
                //   if (data.onClick) {
                //     data.onClick(event); 
                //   }
                //   event.preventDefault(); 
                // }}
                key={index}
                className="px-2.5 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
              >
                {data.icon ? data.icon : null}
                <p className="">{data.label}</p>
              </Link>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
