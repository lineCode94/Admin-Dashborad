import React from "react";
import CardWrapper from "../shared/CardWrapper";
import InputField from "../shared/InputField";
const ManageDineInTables = ({ error, register }) => {
  return (
    <>
      <CardWrapper>
        <InputField
          label={"Dine in tables"}
          placeholder="Number of dine tables"
          registerName={"number_of_tables"}
          register={register}
          error={error}
        />
      </CardWrapper>
    </>
  );
};

export default ManageDineInTables;
