import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event, formData) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { name, email, password, role } = formData; // ✅ Ensure `role` is included
    console.log("Registering with:", name, email, password, role); // ✅ Debugging

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }), // ✅ Sending `role`
      });

      const data = await response.json();
      console.log("Server Response:", data); // ✅ Debugging

      if (!response.ok) throw new Error(data.error || "Registration failed");
      alert("Registration successful! Redirecting to login...");

      navigate("/login/employee");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister} errorMessage={error} loading={loading} />;
};

export default Register;
