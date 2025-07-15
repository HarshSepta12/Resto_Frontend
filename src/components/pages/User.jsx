// components/pages/Users.jsx
import React, { useContext, useEffect, useState } from "react";
import RestoContext from "../Context/RestoContaxt";
import styles from "./User.module.css";

const Users = () => {
  const { user, getAllUsers, updateUser, deleteUser } = useContext(RestoContext);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditClick = (u) => {
    setEditId(u._id);
    setFormData({
      username: u.username,
      email: u.email,
      password: "",
      role: u.role,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateUser(editId, formData);
    setEditId(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await deleteUser(id);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Users</h2>
      <div className={styles.tableWrapper}>
        <table className={`table table-dark table-striped-columns ${styles.responsiveTable}`}>
          <thead>
            <tr className={`table-dark`}>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(user) &&
              user.map((u) => (
                <tr key={u._id}>
                  {editId === u._id ? (
                    <>
                      <td><input type="text" name="username" value={formData.username} onChange={handleChange} className={styles.input} /></td>
                      <td><input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} /></td>
                      <td><input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} /></td>
                      <td><input type="text" name="role" value={formData.role} onChange={handleChange} className={styles.input} /></td>
                      <td>{new Date(u.createdAt).toLocaleString()}</td>
                      <td>
                        <button className={styles.saveBtn} onClick={handleUpdate}>Save</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>•••••••</td>
                      <td>{u.role}</td>
                      <td>{new Date(u.createdAt).toLocaleString()}</td>
                      <td>
                        <button className={styles.editBtn} onClick={() => handleEditClick(u)}>Edit</button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(u._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
