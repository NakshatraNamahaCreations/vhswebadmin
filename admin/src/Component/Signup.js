import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://api.vijayhomeservice.com/api/webadmin/webadminsignup",
        {
          email: email,
          createpassword: createPassword,
          confirmpassword: confirmPassword,
        }
      );

      if (response.status === 200) {
        alert("Account Created Succesfully");
        window.location.assign("/");
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="row m-auto" style={{ height: "100vh" }}>
      <div className="col-md-3 signup-container m-auto">
        <h2>Signup</h2>
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
            <label>Create Password:</label>
            <input
              type="password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        {message && <p>{message}</p>}
      </div>{" "}
    </div>
  );
};

export default Signup;
