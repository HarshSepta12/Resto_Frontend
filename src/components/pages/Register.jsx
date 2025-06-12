import React, { useContext, useState } from "react";
import RestoContext from "../Context/RestoContaxt";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });
const navigate = useNavigate();
  const {Register } = useContext(RestoContext)

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
    // console.log(formData);
  };

    const { username, email, password } = formData;
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await Register(username, email, password);
  console.log("RESULT:", result); 

  if (result && result.success) {
    setFormdata({ username: "", email: "", password: "" });
    navigate("/adminLogin");
  }
};
  return (
    <>
      <div className="container">
        <div className="row">
          <form className="col-md-12" onSubmit={handleSubmit}>
            <div className="col-sm-12">
              <label htmlFor="user" className="username">
                User Name
              </label>
              <input
                id="user"
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Name Here.."
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="email" className="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email Here.."
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="password" className="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password Here.."
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="text-center col-sm-6">
              <button className="btn btn-outline-warning w-75">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
