import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestoContext from "../Context/RestoContaxt";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { Login } = useContext(RestoContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const result = await Login(email, password);
    if (result?.success) {
      setFormData({ email: "", password: "" });
      navigate("/");
    }
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Sign in to your account</h2>

      <form className={styles.form} onSubmit={submitHandler}>
        {/* Email */}
        <div className={styles.inputField}>
          <input
            type="email"
            name="email"
            id="admin-email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="admin-email">Email</label>
        </div>

        {/* Password */}
        <div className={styles.inputField}>
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            id="admin-password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="admin-password">Password</label>

          <span
            aria-label={showPwd ? "Hide password" : "Show password"}
            className={styles.passIcon}
            onClick={() => setShowPwd((p) => !p)}
          >
            {showPwd ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CTA */}
        <div className={styles.btnRow}>
          <button type="submit" className={styles.btn}>
            Login
          </button>

          <p className={styles.text}>
            New here?{" "}
            <span
              className={styles.link}
              onClick={() => navigate("/register")}
            >
              Create account
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
