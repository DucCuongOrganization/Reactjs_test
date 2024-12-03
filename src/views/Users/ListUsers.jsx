import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ListUsers.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const options = {
  method: 'GET',
  url: 'https://medium2.p.rapidapi.com/article/b7d838c84f72/assets',
  headers: {
    'x-rapidapi-key': '950bf24600msh7fcebaa82e9ec4bp14bd84jsn27a6d906c5bd',
    'x-rapidapi-host': 'medium2.p.rapidapi.com'
  }
};

const ListUsers = () => {
  const [listUsers, setListUsers] = useState({});
  useEffect(() => {
    FetchUser();
  }, []);

  const history = useHistory();

  const FetchUser = async () => {
    await axios.request(options).then((response) => {
      if (response.status === 200 && response.data && response.data.data) {
        setListUsers(response.data.data);
      }
    });
  };

  const handleClickUser = (id) => {
    history.push(`/users/${id}`);
  };

  return (
    <div className="list-user-container">
      <div className="title">Fetch all list users</div>
      <div className="list-user-content">
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((item, index) => {
            return (
              <div
                className="child"
                key={item.id}
                onClick={() => handleClickUser(item.id)}
              >
                {index + 1} - {item.first_name} {item.last_name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListUsers;
