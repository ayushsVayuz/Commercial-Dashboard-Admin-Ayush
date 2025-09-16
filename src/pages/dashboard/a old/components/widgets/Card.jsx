const Card = ({ title, icon, period, children, footer, className = "", childrenClassName }) => (
  <div className={`relative bg-white border border-[#EBEBEB] rounded-xl shadow-[0_0_12px_0_#EAF2FF] p-4 flex flex-col gap-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-[16px] leading-[20px] font-medium text-[#121212]">{title}</h2>
      </div>
      {period && <span className="text-xs text-[#64748B]">{period}</span>}
    </div>
    <div className={`flex-1 min-h-0 space-y-6 ${childrenClassName}`}>{children}</div>
    {footer && <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-[#64748B]">{footer}</div>}
  </div>
);

export default Card;