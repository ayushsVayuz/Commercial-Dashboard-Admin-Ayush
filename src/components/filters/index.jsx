import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Selector } from "../select";
import { Button } from "../buttons";
import { ReactDatePicker } from "../datePicker";
import { LuFilter, LuX } from "react-icons/lu";
import { Input } from "../inputs/input";

export const Filter = ({ filterMenu, setFilterMenu, filters = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [values, setValues] = useState({});
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Hydrate from URL once on mount
  useEffect(() => {
    const initValues = {};
    filters.forEach((f) => {
      const paramValue = searchParams.get(f.key);
      if (paramValue) {
        if (f.type === "select") {
          const matched = f.options?.find(
            (o) => String(o.value) === String(paramValue)
          );
          initValues[f.key] = matched || { label: paramValue, value: paramValue };
        } else if (f.type === "date") {
          const [day, month, year] = paramValue.split("/");
          initValues[f.key] = new Date(year, month - 1, day);
        } else {
          initValues[f.key] = paramValue;
        }
      }
    });
    setValues(initValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  // Keep URL in sync when values change (merge instead of replace)
  useEffect(() => {
    const current = new URLSearchParams(window.location.search);

    filters.forEach((filter) => {
      const val = values[filter.key];
      if (val) {
        if (val?.value !== undefined) {
          current.set(filter.key, val.value);
        } else if (val instanceof Date && !isNaN(val)) {
          current.set(filter.key, val.toLocaleDateString("en-GB"));
        } else {
          current.set(filter.key, val);
        }
      } else {
        current.delete(filter.key);
      }
    });

    // Prevent unnecessary updates → avoids infinite loop
    const newParams = current.toString();
    if (newParams !== searchParams.toString()) {
      setSearchParams(current);
    }
  }, [values, setSearchParams]); // 🚨 no "filters" here

  // Clear only filter keys (leave unrelated params intact)
  const clearFilters = () => {
    setValues({});
    const current = new URLSearchParams(window.location.search);
    filters.forEach((f) => current.delete(f.key));
    setSearchParams(current);
  };

  // Close panel on outside click
  useEffect(() => {
    if (!filterMenu) return;
    const handleOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [filterMenu, setFilterMenu]);

  return (
    <>
      <button
        ref={toggleRef}
        className="absolute top-1/2 -translate-y-1/2 right-2"
        onClick={() => setFilterMenu((v) => !v)}
      >
        <LuFilter size={18} className="dark:text-white text-gray-400" />
      </button>

      {filterMenu && (
        <motion.div
          ref={panelRef}
          className="w-[60%] lg:w-[20rem] h-dvh fixed top-0 right-0 flex flex-col justify-between overflow-y-auto bg-white dark:bg-darkPrimary divide-gray-100 dark:divide-gray-700 border shadow z-[1005] dark:border-gray-700"
        >
          <div>
            <div>
              <p className="p-2 dark:text-gray-300 text-sm font-semibold whitespace-nowrap">
                Select Filters
              </p>
              <button
                className="absolute right-2 top-2"
                onClick={() => setFilterMenu(false)}
              >
                <LuX size={18} className="dark:text-white text-gray-400" />
              </button>
            </div>

            <div className="p-2 grid grid-cols-1 gap-4">
              {filters.map((filter) => {
                if (filter.type === "select") {
                  return (
                    <Selector
                      key={filter.key}
                      name={filter.key}
                      placeholder={filter.placeholder}
                      options={filter.options}
                      value={values[filter.key] || ""}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [filter.key]: e }))
                      }
                    />
                  );
                }
                if (filter.type === "input") {
                  return (
                    <Input
                      key={filter.key}
                      className="border p-2 rounded"
                      placeholder={filter.placeholder}
                      value={values[filter.key] || ""}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [filter.key]: e.target.value,
                        }))
                      }
                    />
                  );
                }
                if (filter.type === "date") {
                  return (
                    <ReactDatePicker
                      key={filter.key}
                      placeholder={filter.placeholder}
                      value={values[filter.key] || null}
                      onChange={(date) =>
                        setValues((prev) => ({ ...prev, [filter.key]: date }))
                      }
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="px-2 my-2 flex justify-end gap-2">
            <Button onClick={clearFilters} outLine={true}>
              Clear
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};
