import React, { Fragment, useState } from "react";

const MyComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
    </Fragment>
  );
};

export default MyComponent;
