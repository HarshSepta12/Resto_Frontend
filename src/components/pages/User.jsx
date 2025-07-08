// components/pages/Users.jsx
import React from "react";

const Users = () => {
  const dummyUsers = [
    { id: 1, name: "Amit Sharma", email: "amit@example.com", totalOrders: 5 },
    { id: 2, name: "Neha Verma", email: "neha@example.com", totalOrders: 3 },
    { id: 3, name: "Rahul Mehra", email: "rahul@example.com", totalOrders: 7 },
  ];

  return (
    <div>
      <h2>Users</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
