import React, { useState } from "react";

const LoginForm = ({ onSuccess }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://dynamic-form-generator-9rl7.onrender.com/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber, name }),
      });
      if (!res.ok) throw new Error("Registration failed");

      const formRes = await fetch(
        \`https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=\${rollNumber}\`
      );
      const formJson = await formRes.json();
      onSuccess(formJson.form);
    } catch (e) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <input placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
