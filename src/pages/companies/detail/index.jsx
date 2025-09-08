import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BasicInformation } from "./basicInformation";
import { propertyDetail } from "../../../database";
import { Heading } from "../../../components/heading";
import { useParams } from "react-router-dom";

export const CompanyDetail = () => {
  const [tab, setTab] = useState(0);

  const { id } = useParams();

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Heading
          containerClassName={"my-4"}
          sectionLink="/companies"
          parent={"Company Detail"}
          mainTitle={"Company"}
        />
      </div>
      <BasicInformation company={propertyDetail?.companyInformation} />
    </section>
  );
};
