import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";
function UserView() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h2>List of users:</h2>
      <div>
        {user.loading && <div>Loading...</div>}
        {!user.loading && user.error ? <div>ERROR: {user.error}</div> : null}
        {!user.loading && user.users.length ? (
          <ul>
            {user.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default UserView;
