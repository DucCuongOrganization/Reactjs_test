import React, { Fragment, useState } from "react";
import ChildComponent from "./ChildComponent";

const MyComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobList, setJobList] = useState([
    { id: "1", title: "Doctor", salary: "300" },
    { id: "2", title: "Doctor", salary: "300" },
    { id: "3", title: "Doctor", salary: "300" },
  ]);

  const handleClick = (event) => {
    event.preventDefault();
    alert(`Hello ${firstName} ${lastName}`);
  };

  return (
    <Fragment>
      <form className="form">
        <label htmlFor="fname">First name:</label>
        <input type="text" id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input type="text" id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />
        <input type="button" value="Submit" onClick={(event) => handleClick(event)} />
      </form>
      <ChildComponent firstName={firstName} lastName={lastName} jobList={jobList}/>
    </Fragment>
  );
};

export default MyComponent;
