import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TableShimmer } from "../../components/shimmers/tableShimmer";
import { MetaTitle } from "../../components/metaTitle";
import { Heading } from "../../components/heading";
import { CardWrapper } from "../../components/wrappers/card";
import { readSingleContainer } from "../../redux/actions/containers-action";

const ContainerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleContainer, loading } = useSelector((state) => state.container);

  useEffect(() => {
    dispatch(readSingleContainer({ id }));
  }, [id, dispatch]);

  return (
    <section className="flex flex-col">
      <MetaTitle title="Container Detail | Anarock" />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <Heading
          sectionLink="/container"
          parent="Container"
          mainTitle="Container Details"
        />
      </div>

      {loading ? (
        <TableShimmer />
      ) : singleContainer ? (
        <div className="w-full md:w-[100%] flex flex-col gap-4">
          <CardWrapper>
            <h5 className="font-semibold !text-3xl text-primaryText dark:text-white hover:text-primaryBg">
              {singleContainer?.description}
            </h5>
            <p className="font-medium text-base dark:text-gray-200">
              Container ID - {singleContainer?.id}
            </p>
          </CardWrapper>
        </div>
      ) : (
        <div>NO DATA FOUND</div>
      )}
    </section>
  );
};

export default ContainerDetails;
