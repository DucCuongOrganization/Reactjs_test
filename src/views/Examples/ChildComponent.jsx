import React, { useState } from "react";

const ChildComponent = (props) => {
  const { firstName, lastName, jobList } = props;
  const [show, setShow] = useState(false);
  return (
    <>
      {firstName && (
        <div>
          This is {firstName} {lastName}
        </div>
      )}
      <div>
        <div>
          <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
        </div>
        {show &&
          jobList.map((item, index) => (
            <div key={item.id}>
              {item.title} - {item.salary}
            </div>
          ))}
      </div>
    </>
  );
};

export default ChildComponent;
