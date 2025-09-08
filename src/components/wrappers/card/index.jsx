import { BadgeWrapper } from "../icon-wrapper";

export const CardWrapper = ({ title, children }) => {
  return (
    <div class="card bg-white dark:bg-slate-800 p-4">
      <div className="flex items-center justify-between">
        <p class="dark:text-gray-200 font-semibold text-lg mb-4">{title}</p>
        {/* <span>
          <BadgeWrapper customColor={"text-[#DBB467]"}>
            In Progress
          </BadgeWrapper>
        </span> */}
        
      </div>
      <p class="text-[#6C6C6C]">{children}</p>
    </div>
  );
};
