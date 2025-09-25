const Card = ({
  title,
  icon,
  period,
  children,
  footer,
  className = "",
  childrenClassName,
}) => (
  <div
    className={`relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF] p-4 flex flex-col gap-6 ${className} h-full `}
    >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div
          style={{ fontWeight: 500, fontSize: "16px", lineHeight: "20px" }}
          className="!my-0 !font-medium !text-[16px] !leading-[20px] !text-[#121212]"
          >
          {title}
        </div>
      </div>

      {period && (
        <span className="!text-xs !leading-[16px] !text-[#64748B]">
          {period}
        </span>
      )}
    </div>
    <div className={`flex-1 min-h-0 space-y-6 ${childrenClassName ? childrenClassName : ""}`}>
      {children}
    </div>
    {footer && (
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-[#64748B]">
        {footer}
      </div>
    )}
    </div>
);

export default Card