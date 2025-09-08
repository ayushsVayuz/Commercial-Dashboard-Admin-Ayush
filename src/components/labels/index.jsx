export const RenderLableValue = (label, value) => (
  <p className="flex flex-col font-medium">
    <span className="text-[#6C6C6C] dark:text-gray-400 text-sm">{label}:</span>{" "}
    <span className="font-medium text-black dark:text-white text-base">
      {value}
    </span>
  </p>
);

export const RenderValue = (value) => (
  <p className="font-medium text-black dark:text-white text-base">{value}</p>
);
