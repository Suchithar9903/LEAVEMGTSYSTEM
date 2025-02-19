import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event, formData) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: formData.email, password: formData.password}),
      });
      
      const data = await response.json();
      if (!response.ok) { throw new Error(data.message || "Login failed. Please try again."); }
      localStorage.setItem("token", data.token);

      navigate("/employeedashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} errorMessage={error} loading={loading} />;
};

export default Login;
