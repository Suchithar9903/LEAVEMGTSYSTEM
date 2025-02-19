import React, { useState } from "react";
import "../styles/auth.css";

const AuthForm = ({ isLogin, onSubmit, errorMessage, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // Default role
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={(e) => onSubmit(e, formData)}>  {/* ✅ onSubmit used properly */}
      {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={formData.role === "employee"}
                  onChange={handleChange}
                />
                Employee
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="management"
                  checked={formData.role === "management"}
                  onChange={handleChange}
                />
                Management
              </label>
            </div>
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
