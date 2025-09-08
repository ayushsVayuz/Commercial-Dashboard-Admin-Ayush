import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../../components/buttons";
import { useSelector, useDispatch } from "react-redux";
import { BasicDetails } from "./components/basicDetail";
import { Heading } from "../../../components/heading";
import { setTenantsData } from "../../../redux/slices/tenantsSlice";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../../components/wrappers/form";

const blockSchema = yup.object().shape({
  tenantsType: yup.string().required(),
});

export const AddBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { blockData } = useSelector((state) => state.blocks);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    // resolver: yupResolver(tenantsDataSchema),
    mode: "onChange",
    // defaultValues: blockData,
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", { ...data });
    dispatch(setTenantsData(data));
    navigate("/properties");
  };

  return (
    <section>
      <Heading
        containerClassName={"my-4"}
        sectionLink="/block"
        parent="Block"
        mainTitle="Add Block"
      />
      <FormWrapper containerClassName={""}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <BasicDetails control={control} errors={errors} />
          <div className="flex justify-end items-center gap-4">
            <Button simpleLink={true}>Cancel</Button>
            <Button type={"submit"} mainPrimary={true} disabled={!isValid}>
              Add
            </Button>
          </div>
        </form>
      </FormWrapper>
    </section>
  );
};
