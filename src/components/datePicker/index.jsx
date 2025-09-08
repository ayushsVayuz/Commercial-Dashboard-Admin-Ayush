import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { IoInformationCircleOutline } from "react-icons/io5";

export const ReactDatePicker = ({
  label,
  touched,
  className,
  infoContent,
  errorContent,
  isDisabled,
  ...field // Spread field props here
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <label className="text-black text-sm dark:text-white">{label}</label>
        {infoContent && (
          <IoInformationCircleOutline
            className="text-primary text-sm focus:outline-none"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={infoContent}
          />
        )}
      </div>
      <DatePicker
        {...field} // Spread field props here
        selected={field.value} // Set selected date
        dateFormat="MM/dd/yyyy" // Optional: Set date format
        showYearDropdown // Optional: Show year dropdown
        scrollableYearDropdown // Optional: Make year dropdown scrollable
        autoComplete="off"
        disabled={isDisabled}
        onChange={(date) => field.onChange(date)} // Update form state
        className={`${className} ${errorContent && touched ? "border-error" : "border-[#D6D6D6]"
          } w-full rounded-md shadow-sm text-black placeholder:text-[#C4C4C4] placeholder:text-xs text-sm p-3 bg-pageBodyBg focus:border-focusInputBorderColor h-49 dark:bg-gray-900 dark:text-white`}
        placeholderText="Select A Date"
      />
      {errorContent && touched && (
        <span className="text-error text-xs">{errorContent}</span>
      )}
    </div>
  );
};
