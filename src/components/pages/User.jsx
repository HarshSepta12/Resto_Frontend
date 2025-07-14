// components/pages/Users.jsx
import React, { useContext, useEffect } from "react";
import RestoContext from "../Context/RestoContaxt";
import styles from "./User.module.css";

const Users = () => {
  const { user, getAllUsers } = useContext(RestoContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting user with ID:", id);
    // Add your delete user API call here
  };

  const handleUpdate = (id) => {
    console.log("Updating user with ID:", id);
    // Add your update user logic or navigation to edit page
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Users</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(user) &&
              user.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className={styles.actionButtons}>
                    <button className={styles.updateBtn} onClick={() => handleUpdate(user._id)}>
                      Update
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

