import React, { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const UserComponent = (props) => {
  const { userList, setUserList } = props;
  const [show, setShow] = useState(true);
  const [editUser, setEditUser] = useState({});

  let isEmptyObj = Object.keys(editUser).length === 0;
  const handleSave = (item) => {
    const updatedUserList = userList.map((user) => {
      if (user.id === item.id) {
        return { ...user, ...editUser };
      }
      return user;
    });
    setUserList(updatedUserList);
    setEditUser({});
    toast.success("Update user successfully!");
  };

  const handleDelete = (item) => {
    const updatedUserList = userList.filter((user) => user.id !== item.id);
    setUserList(updatedUserList);
    toast.success("Delele user successfully!");
  };

  const handleEditUser = (e, type) => {
    const editUserTemp = _.cloneDeep(editUser);
    editUserTemp[type] = e.target.value;
    setEditUser(editUserTemp);
  };

  return (
    <>
      <div className="show_content">
        <div>
          <button onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </button>
        </div>
        {show &&
          userList.map((item, index) => (
            <div key={`${item.id} - ${index}`} className="show_item">
              {!isEmptyObj && item.id === editUser.id ? (
                <>
                  <div>
                    <input
                      value={editUser.name}
                      onChange={(e) => handleEditUser(e, "name")}
                    />
                    <input
                      value={editUser.salary}
                      onChange={(e) => handleEditUser(e, "salary")}
                    />
                  </div>
                  <div>
                    <button onClick={() => handleSave(item)}>Save</button>
                    <button onClick={() => handleDelete(item)}>Delete</button>
                  </div>
                </>
              ) : (
                <>
                  <span>
                    {index + 1}. {item.name} - {item.salary}$
                  </span>
                  <div>
                    <button onClick={() => setEditUser(item)}>Edit</button>
                    <button onClick={() => handleDelete(item)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default UserComponent;
