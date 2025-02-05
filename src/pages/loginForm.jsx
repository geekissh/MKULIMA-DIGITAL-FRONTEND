import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json(); 
        localStorage.setItem("access_token", data.access_token);
        window.alert("Login successful");
        history.push("/Home"); // Redirect to Home.jsx upon successful login
      } else {
        window.alert("Login failed. Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while processing your request");
    }
  };

  return (
    <div className="custom-login-setup">
      <div className="custom-login-container">
        <div className="custom-form-container">
          <p className="hello-text">
            <span role="img" aria-label="waving-hand">
              👋
            </span>{" "}
            HELLO!
          </p>
          <h1>Welcome Back!</h1>
          <h2>Please enter your details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="label">
              Username
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="input"
                style={{ width: "100%" }} // Apply width directly to input
              />
            </label>
            <label htmlFor="password" className="label">
              Password
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                style={{ width: "100%" }} // Apply width directly to input
              />
            </label>
            <button type="submit" className="button">
              Log in
            </button>
            <p>
              Don't have an account?{" "}
              <NavLink to="/register" className="custom-link">
                <strong>Sign Up here</strong>
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
