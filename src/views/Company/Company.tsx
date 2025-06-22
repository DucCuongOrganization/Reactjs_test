import React from "react";
import { useState } from "react";
import BoxRemark from "../../components/BoxRemark/BoxRemark";

const Company = () => {
  const [value, setValue] = useState("");
  const [listRemark, setListRemark] = useState<string[]>([]);
  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const onSubmitData = () => {
    setListRemark([...listRemark, value]);
    setValue("");
  };
  return (
    <BoxRemark
      onDataChange={handleDataChange}
      onSubmitData={onSubmitData}
      remark={value}
      listRemark={listRemark}
      maxLength={10}
    />
  );
};

export default Company;
