import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/reducers/rootReducer";
import AddComponent from "./AddComponent";
import UserComponent from "./UserComponent";

const JobComponent: React.FC = () => {
  const userList = useSelector((state: State) => state.userList);

  return (
    <div style={{ paddingTop: "20px" }}>
      <AddComponent />
      <UserComponent userList={userList} />
    </div>
  );
};

export default JobComponent;
