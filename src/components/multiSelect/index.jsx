// MultiSelectCheckbox.jsx
import React, { useState } from "react";

const MultiSelectCheckbox = ({ options, onChange }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (option) => {
    let updated;
    if (selectedIds.includes(option.id)) {
      updated = selectedIds.filter((id) => id !== option.id);
    } else {
      updated = [...selectedIds, option.id];
    }
    setSelectedIds(updated);

    if (onChange) {
      onChange(options.filter((opt) => updated.includes(opt.id)));
    }
  };

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  space-y-2">
      {" "}
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedIds.includes(option.id)}
            onChange={() => handleToggle(option)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">{option.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectCheckbox;
