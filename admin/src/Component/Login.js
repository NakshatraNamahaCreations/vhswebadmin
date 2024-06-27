import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api.vijayhomeservice.com/api/webadmin/webadminsignin",
        { email, password }
      );

      if (response.status === 200) {
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
        setMessage(response.data.success);
        alert("Logged in Successfully");
        window.location.assign("/user");
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="row m-auto" style={{ height: "100vh" }}>
      <div className="col-md-3 m-auto login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
