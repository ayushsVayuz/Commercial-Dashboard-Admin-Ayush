import { Link } from "react-router-dom";
import { Search } from "../../../components/search";
import { Table } from "../../../components/table";
import { companiesData } from "../../../database";
import { TbEdit, TbEye } from "react-icons/tb";
import { Heading } from "../../../components/heading";

export const CompaniesListing = () => {
  const headers = [
    "#",
    "Company",
    "Address",
    "Associated properties",
    "Status",
    "Action",
  ];

  const actionMenu = [
    {
      label: "Edit",
      url: "/add-company",
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: "/company-detail",
      icon: <TbEye className="text-xl" />,
    },
    // {
    //   label: "Add Unit",
    //   url: "/add-unit",
    //   icon: <IoAdd className="text-xl" />,
    // },
  ];

  const tabs = [
    { label: "Tab One", link: "/properties" },
    { label: "Tab Two", link: "/ana" },
    { label: "Tab Three", link: "/mad" },
  ];

  return (
    <>
      <section>
        <Heading
          containerClassName={"my-4"}
          sectionLink="/companies"
          parent="Company"
          mainTitle="Company Listing"
        />
        <div className="flex justify-between items-center">
          <Search placeholder={"Search by company name"} />
          <Link
            className="bg-buttonBg text-white p-3 rounded"
            to={"/add-company"}
          >
            Add Company
          </Link>
        </div>
        <Table
          module={"Company"}
          headers={headers}
          initialData={companiesData}
          isAction={true}
          actionMenu={actionMenu}
        />
      </section>
    </>
  );
};
