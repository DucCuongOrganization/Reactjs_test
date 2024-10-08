import React, { useState } from "react";
import { toast } from "react-toastify";

const AddComponent = (props) => {
  const { handleSubmit } = props;
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);

  const onSubmit = () => {
    if (!name || !salary) {
      toast.error("Please enter a name and a salary");
      return;
    }
    const userInfo = {
      id: Math.floor(Math.random() * 100000 + 1),
      name: name,
      salary: salary,
    };
    handleSubmit(userInfo);
    setName("");
    setSalary("");
  };

  return (
    <form className="form">
      <div className="input_form">
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          id="fname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input_form">
        <label htmlFor="lname">Salary:</label>
        <input
          type="text"
          id="lname"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <br />
      <input type="button" value="Submit" onClick={() => onSubmit()} />
    </form>
  );
};

export default AddComponent;
