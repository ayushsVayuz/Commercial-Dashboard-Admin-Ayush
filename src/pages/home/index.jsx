import { Link } from "react-router-dom";
import { PrimaryLayout } from "../../components/layout/primary";
import { MetaTitle } from "../../components/metaTitle";

export const HomePage = () => {
  return (
    <>
      <div class=" w-full h-screen flex items-start justify-center flex-col bg-primary-bg  bg-cover p-5" >
          <h1 className="text-white text-[30px] mb-4">Welcome to ANAROCK </h1>
          <Link className="px-8 py-4 bg-primaryBg text-white rounded-md text-xl" to="/lease/lease-active">Lease</Link>
      </div>
      
    </>
  );
};
