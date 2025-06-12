import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestoContext from "../Context/RestoContaxt";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({ email: "", password: "" });
  const { url, Login } = useContext(RestoContext);
  // console.log(url);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
    // console.log(formData);
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await Login(email, password);
    console.log(result);
    if (result && result.success) {
      setFormdata({ email: "", password: "" });
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <form action="" className="col-md-12" onSubmit={submitHandler}>
            <div className="col-sm-12">
              <label htmlFor="email" className="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email Here.."
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="password" className="email">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password Here.."
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center col-sm-6">
              <button className="btn btn-outline-warning w-75">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
