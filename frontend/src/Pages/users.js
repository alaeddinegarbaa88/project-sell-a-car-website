import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../Api/UserApi";
import { setUsers } from "../redux/Store/UsersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.Users);

  useEffect(() => {
    const fetch = async () => {
      const data = await getUsers();
      if (data) {
        dispatch(setUsers(data));
      } else {
        dispatch(setUsers(null));
      }
    };
    fetch();
  }, [dispatch]);

  if (!users) return null;

  return (
    <div class="" style={{ width: "80vw", margin: "auto", padding: "20px 0" }}>
      Users List: {users.length}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <th scope="row" title={user._id}>
                {user._id ? user._id.slice(0, 6) : ""}..
              </th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button
                  onClick={async () => {
                    await deleteUser(user._id);
                    dispatch(setUsers(users.filter((u) => u._id !== user._id)));
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
