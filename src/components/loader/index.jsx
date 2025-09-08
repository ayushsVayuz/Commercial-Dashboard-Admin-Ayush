import { ImSpinner2 } from "react-icons/im";

export function Loader({className}) {
  return (
    <div className={`${className} flex justify-center items-center`}>
      <ImSpinner2 className="animate-spin text-primary text-2xl"/>
    </div>
  );
}