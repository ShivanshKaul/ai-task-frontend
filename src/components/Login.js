import React, { useState } from "react";
import "./Login.css";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "signup" : "login";
    const res = await fetch(`https://ai-task-backend-69hj.onrender.com//${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left side */}
      <div className="login-left">
        <h1>Welcome</h1>
        <p>
          Manage your tasks smartly with AI.  
          Stay productive and keep track of everything in one place.  
        </p>
      </div>

      {/* Right side */}
      <div className="login-right">
        <div className="login-container">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          </form>
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
