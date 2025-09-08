import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../../components/buttons";
import { useSelector, useDispatch } from "react-redux";
import { setCompanyData } from "../../../redux/slices/companySlice";
import { useNavigate } from "react-router-dom";
import { CompanyDetails } from "./components/companyDetails";
import { Heading } from "../../../components/heading";
import { ReactModal } from "../../../components/modal";
import { FormWrapper } from "../../../components/wrappers/form";

const schema = yup.object().shape({
  company: yup.object().shape({
    companyName: yup.string().required("Company name is required"),
    phoneNumber: yup.number().required("Phone number is required"),
    companyAddress: yup.string().required("Company address is required"),
    companyRegistrationNumber: yup
      .string()
      .required("Registration number is required"),
    taxName: yup.string().required("Tax name is required"),
    taxNumber: yup.string().required("Tax number is required"),
  }),
});

export const AddAndEditCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companyData } = useSelector((state) => state.company);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: companyData,
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", { ...data });
    dispatch(setCompanyData(data));
    navigate("/preview-company");
  };

  return (
    <section>
      <Heading
        containerClassName={"my-4"}
        sectionLink="/property"
        parent="Property"
        mainTitle="Create Company"
      />
      <FormWrapper containerClassName={"my-10"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CompanyDetails control={control} errors={errors} />
          <div className="flex justify-end items-center gap-4">
            <ReactModal
              header={false}
              button={<Button v3={true}>Cancel</Button>}
              className={"w-72"}
              childrenClassName={"p-4 flex flex-col items-center gap-6"}
            >
              <p >
                Are you sure you want to cancel the entry?
              </p>
              <div className="flex items-center gap-2">
                <Button simpleLink={true}>Cancel</Button>
                <Button mainPrimary={true}>Confirm</Button>
              </div>
            </ReactModal>
            <Button type={"submit"} v3={true} disabled={!isValid}>
              Preview
            </Button>
          </div>
        </form>
      </FormWrapper>
    </section>
  );
};
