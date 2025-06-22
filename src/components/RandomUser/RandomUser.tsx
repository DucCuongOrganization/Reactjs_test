import React from "react";
import axios from "axios";
import { JSX, useState } from "react";

/**
 * Fetches a random user from https://randomuser.me/api/ and displays their
 * name, email, and photo.
 */
const RandomUser = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const fetchRandomUser = async (): Promise<void> => {
    const { data } = await axios.get<UserResponse>(
      "https://randomuser.me/api/"
    );
    setCurrentUser(data.results[0]);
  };

  return (
    <>
      <h1>User</h1>
      {currentUser && (
        <>
          <h2>{`${currentUser.name.first} ${currentUser.name.last}`}</h2>
          <img
            src={currentUser.picture.large}
            alt={`${currentUser.name.first} ${currentUser.name.last}`}
          />
          <p>{currentUser.email}</p>
        </>
      )}
      <button onClick={fetchRandomUser}>Load user</button>
    </>
  );
};

type UserResponse = {
  results: User[];
};

type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
};

export default RandomUser;
