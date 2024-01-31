import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import {
  getAllUsers,
  editUser,
  UserUnBlock,
  UserBlock,
  reset,
  adminLogout,
} from "../features/adminAuth/adminAuthSlice";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminAuth.users);
  const isLoading = useSelector((state) => state.adminAuth.isLoading);

  useEffect(() => {
    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleEdit = (userId, name, email) => {
    const newName = prompt("Enter new name:", name);
    const newEmail = prompt("Enter new Email:", email);
    if (newName === null || newEmail === null) {
      return; // Cancel operation
    }
    if (newEmail && newName) {
      dispatch(editUser({ userId, name: newName, email: newEmail }));
    }
  };

  const handleBlock = (userId) => {
    if (window.confirm("Are you sure want to block the user?")) {
      dispatch(UserBlock(userId));
    }
  };

  const handleUnBlock = (userId) => {
    if (window.confirm("Are you sure want to Unblock the user?")) {
      dispatch(UserUnBlock(userId));
    }
  };

  const logout = () => {
    dispatch(adminLogout())
    console.log("dhghsj")
    navigate('login');
  };
  return (
    <div>
      <div className="logoutadmin">
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
      <h2>Users List</h2>
      {isLoading && <p>Loading...</p>}
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
            <p>User Status:{user.isBlock ? "Blocked" : "Unblocked"}</p>
            <form
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <div className="form-group">
                <button
                  onClick={() => handleEdit(user._id, user.name, user.email)}
                  className="btn"
                >
                  Edit
                </button>
              </div>
              <div className="form-group">
                <button onClick={() => handleBlock(user._id)} className="btn">
                  Block
                </button>
              </div>
              <div className="form-group">
                <button onClick={() => handleUnBlock(user._id)} className="btn">
                  Unblock
                </button>
              </div>
            </form>
          </div>
        ))
      ) : (
        <p>No users avaliable</p>
      )}
    </div>
  );
};

export default UserList;
