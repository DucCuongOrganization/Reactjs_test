import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { State } from "../../store/reducers/rootReducer";

const initUser = {
  name: "",
  salary: "",
};

const AddComponent = () => {
  const [user, setUser] = useState(initUser);
  const userList = useSelector((state: State) => state.userList);
  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    const { name, salary } = user;
    console.log(name + " " + salary);
    if (!name || !salary) {
      toast.error("Please enter name and salary");
      return;
    }

    const newUser = {
      id: userList.length + 1,
      name,
      salary,
    };

    dispatch({ type: "CHANGE_USER_LIST", payload: [...userList, newUser] });
    toast.success(`Add user ${name} successfully!`);
    setUser(initUser);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="form">
      <div className="input_form">
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div className="input_form">
        <label htmlFor="lname">Salary:</label>
        <input
          type="text"
          name="salary"
          value={user.salary}
          onChange={handleChange}
        />
      </div>
      <br />
      <input type="button" value="Submit" onClick={handleFormSubmit} />
    </form>
  );
};

export default AddComponent;
