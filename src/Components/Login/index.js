import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Config/firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      await login({ email, password });
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="container">
      <h3 className="name">Signin</h3>
      <div className="inp">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="write email here"
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="write password here"
          value={password}
        />
      </div>

      <button className="btn" onClick={signin}>
        signin
      </button>
      <p>DOn't you have an account</p>
      <span onClick={() => navigate("/register")}>Click here</span>
    </div>
  );
}

export default Login;
