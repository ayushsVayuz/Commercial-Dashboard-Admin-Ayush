import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { TagsInput } from "../../../../../components/inputs/tags";

export const BasicDetails = ({ control, errors }) => {
  const propertyOption = [
    { value: "willow_creek_estates", label: "Willow Creek Estates" },
    { value: "evergreen_meadows", label: "Evergreen Meadows" },
    { value: "riverstone_heights", label: "Riverstone Heights" },
    { value: "maple_grove_residences", label: "Maple Grove Residences" },
    { value: "summit_view_villas", label: "Summit View Villas" },
    { value: "oakwood_terrace", label: "Oakwood Terrace" },
    { value: "horizon_pines", label: "Horizon Pines" },
    { value: "cedar_ridge_apartments", label: "Cedar Ridge Apartments" },
    { value: "silverlake_gardens", label: "Silverlake Gardens" },
    { value: "brookside_manor", label: "Brookside Manor" },
  ];

 
  return (
    <>
      {/* <Controller
        name="property"
        control={control}
        render={({ field }) => (
          <Selector
            {...field}
            label={"Property"}
            placeholder={"Select Property"}
            errorContent={errors.property?.message}
            options={statusOption}
          />
        )}
      /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <Controller
          name="propertyLayout"
          control={control}
          render={({ field }) => (
            <Selector
              {...field}
              label={"Property"}
              placeholder={"Select Property Layout"}
              errorContent={errors.propertyLayout?.message}
              options={propertyOption}
            />
          )}
        />
        <Controller
          name="totalBlock"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={"text"}
              label={"Total Block"}
              placeholder={"Enter Total Block"}
              errorContent={errors.totalTower?.message}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
        <TagsInput placeholder={"Add Block"} label={"Add Block"} />
      </div>
    </>
  );
};
