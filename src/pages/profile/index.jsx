import { TbEdit, TbEye } from "react-icons/tb";
import { Button } from "../../components/buttons";
import { Heading, PageHeading } from "../../components/heading";
import { Table } from "../../components/table";
import { propertyData } from "../../database";
import { IoAdd } from "react-icons/io5";

export const UserProfile = () => {
  const headers = [
    "#",
    "Property",
    "City",
    "Total Unit",
    "Total Vacant Unit",
    "Under Notice",
    "Lease Status",
    "Action",
  ];

  const actionMenu = [
    {
      label: "Edit",
      url: "/add-property",
      icon: <TbEdit className="text-xl" />,
    },
    {
      label: "View",
      url: "/add-property",
      icon: <TbEye className="text-xl" />,
    },
    {
      label: "Add Unit",
      url: "/add-property",
      icon: <IoAdd className="text-xl" />,
    },
  ];

  return (
    <section>
      <Heading
        parent={"Profile"}
        sectionLink={"/user-profile"}
        mainTitle={"My Profile"}
        containerClassName={"mb-4"}
      >
        Your Profile
      </Heading>
      <div className="flex justify-end items-center">
        <Button mainPrimary={1}>Edit</Button>
      </div>
      <div className="flex items-end gap-2">
        <img className="bg-[#D9D9D9] w-32 h-32 rounded" src="" alt="" />
        <div>
          <h1 className="font-bold text-2xl">Mehul Nag</h1>
          <p>mehul.anarock@gmail.com</p>
          <p className="text-[#037847]">Role</p>
        </div>
      </div>
     
      <Table
        headers={headers}
        initialData={propertyData}
        isAction={true}
        actionMenu={actionMenu}
      />
    </section>
  );
};
