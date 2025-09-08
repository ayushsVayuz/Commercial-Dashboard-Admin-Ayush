import { IoInformationCircleOutline } from "react-icons/io5";

export const TextArea = ({
  name,
  onChange,
  value,
  touched,
  onBlur,
  label,
  type,
  placeholder,
  className,
  infoContent,
  errorContent,
  ...props
}) => {
  return (
    <div className="w-full">
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
        <textarea
          {...props}
          className={`${className} ${
            errorContent && touched ? "border-error" : "border-[#D6D6D6]"
          } w-full min-h-32 p-2 bg-pageBodyBg dark:bg-gray-900 placeholder:text-[#999999] dark:text-white placeholder:text-xs rounded-lg focus:outline-none resize-none`}
          type={type == "password" ? passwordType : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
        />
      </div>
      <div className="h-1 mb-2">
        {errorContent && touched && (
          <p className=" text-error text-xs">{errorContent}</p>
        )}
      </div>
    </div>
  );
};
