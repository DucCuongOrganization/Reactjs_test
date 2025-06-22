import React from "react";
import { TextArea } from "semantic-ui-react";

interface BoxRemarkProps {
  remark: string;
  listRemark: string[];
  onDataChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitData: () => void;
  maxLength: number;
}

const BoxRemark = ({
  remark,
  listRemark,
  onDataChange,
  onSubmitData,
  maxLength,
}: BoxRemarkProps) => {
  return (
    <>
      <TextArea
        value={remark}
        name="remark"
        maxLength={maxLength}
        onChange={onDataChange}
      />
      <button onClick={onSubmitData}>Submit remark</button>
      {listRemark.map((remark) => (
        <p>{remark}</p>
      ))}
    </>
  );
};

export default BoxRemark;
