import React, { Fragment, JSX, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { State, User } from "../../store/reducers/rootReducer";

const initUser = {
  id: 0,
  name: "",
  salary: "",
};

interface UserComponentProps {
  userList: User[];
}

const UserComponent = (props: UserComponentProps): JSX.Element => {
  const { userList } = props;
  const isShowing = useSelector((state: State) => state.isShowing);
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState<User>(initUser);
  let isEmptyObj = Object.keys(editUser).length === 0;

  const handleSave = (updatedUser: User) => {
    const newUserList = userList.map((user) =>
      user.id === updatedUser.id ? { ...user, ...editUser } : user
    );
    dispatch({ type: "CHANGE_USER_LIST", payload: newUserList });
    setEditUser(initUser);
    toast.success(`Update user ${updatedUser.name} successfully!`);
  };

  const handleDelete = (currentUser: User) => {
    const updatedUserList = userList.filter(
      (user) => user.id !== currentUser.id
    );
    dispatch({ type: "CHANGE_USER_LIST", payload: updatedUserList });
    toast.success(`Deleted user ${currentUser.name} successfully!`);
  };

  const handleEditUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUser = { ...editUser, [e.target.name]: e.target.value };
    setEditUser(updatedUser);
  };

  const handleChangeShow = () => {
    dispatch({ type: "UPDATE_SHOWING_LIST", payload: !isShowing });
  };

  return (
    <Fragment>
      <div className="show_content">
        <div>
          <button onClick={handleChangeShow}>
            {isShowing ? "Hide" : "Show"}
          </button>
        </div>
        {isShowing &&
          userList?.map((item) => {
            const isEditUser = !isEmptyObj && item.id === editUser.id;
            return (
              <div key={item.id} className="show_item">
                <span>
                  {item.id}.{" "}
                  {isEditUser ? (
                    <>
                      <input
                        value={editUser.name}
                        name="name"
                        onChange={handleEditUser}
                      />
                      <input
                        value={editUser.salary}
                        name="salary"
                        onChange={handleEditUser}
                      />
                    </>
                  ) : (
                    <>
                      {item.name} - {item.salary}$
                    </>
                  )}
                </span>
                <div>
                  <button
                    onClick={() =>
                      isEditUser ? handleSave(item) : setEditUser(item)
                    }
                  >
                    {isEditUser ? "Save" : "Edit"}
                  </button>
                  <button onClick={() => handleDelete(item)}>Delete</button>
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default UserComponent;
