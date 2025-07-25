import React, { useContext, useState } from "react";
import RestoContext from "../Context/RestoContaxt";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });
    const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const { Register } = useContext(RestoContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const { username, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Register(username, email, password);
    console.log("RESULT:", result);

    if (result && result.success) {
      setFormdata({ username: "", email: "", password: "" });
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Create your account</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input_field}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Username</label>
        </div>
        <div className={styles.input_field}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>
        <div className={styles.input_field}>
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Password</label>
            <span
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      className={styles.passIcon}
                      onClick={() => setShowPwd((p) => !p)}
                    >
                      {showPwd ? "🙈" : "👁️"}
                    </span>
        </div>
        <div className={styles.btn_container}>
          <button className={styles.btn}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
