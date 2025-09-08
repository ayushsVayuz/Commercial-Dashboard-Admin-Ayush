import { useSelector } from "react-redux";
import { BasicInformation } from "./basicInformation";
import { Heading } from "../../../components/heading";
import { MetaTitle } from "../../../components/metaTitle";

export const PreviewCompany = () => {
  const { companyData } = useSelector((state) => state.company);

  console.log(companyData, "sfsd");

  return (
    <section>
      <MetaTitle title={"Preview Company | Anarock"} />
      <Heading
        containerClassName={"my-4"}
        sectionLink="/companies"
        parent="Company"
        mainTitle="Preview company"
      />
      <BasicInformation company={companyData} />
    </section>
  );
};
