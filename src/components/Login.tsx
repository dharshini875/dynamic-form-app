// src/components/Login.js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered details match the allowed user
    if (rollNumber === "145" && name.toLowerCase() === "dharshini") {
      onLogin(rollNumber);
    } else {
      alert("Invalid Roll Number or Name!");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
