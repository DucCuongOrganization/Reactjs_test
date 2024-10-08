import React, { Fragment, useState } from "react";
import AddComponent from "./AddComponent";
import UserComponent from "./UserComponent";
import { toast } from "react-toastify";

const MyComponent = () => {
  const [userList, setUserList] = useState([]);

  const handleSubmit = (userInfo) => {
    setUserList([...userList, userInfo]);
    toast.success("Successfully added user");
  };

  return (
    <Fragment>
      <AddComponent handleSubmit={handleSubmit} />
      <UserComponent userList={userList} setUserList={setUserList} />
    </Fragment>
  );
};

export default MyComponent;
