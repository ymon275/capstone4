import { useState, useContext } from "react";
import UserContext, { UserState } from "./store";

function ConsumerComponent() {
  const user = useContext(UserContext);

  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
    </div>
  );
}

function UseContextComponent() {
  const [user, setUser] = useState({
    first: "Jane",
    last: "Smith",
  });
  return (
    <UserContext.Provider value={user}>
      <ConsumerComponent />
      <button
        onClick={() =>
          setUser({
            first: "Josie",
            last: "Wales",
          })
        }
      >
        Change Context
      </button>
    </UserContext.Provider>
  );
}

export default UseContextComponent;
