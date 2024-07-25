import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { register } from "../../Config/firebase";
import "./Register.css";
import { register } from "../../Config/firebase";

function Register() {
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await register({ fullname, age, email, password });
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };

  // const signup = () => {
  //   register({ fullname, age, email, password });
  //   navigate("/login");
  // };

  return (
    <div className="containner">
      <h3 className="Name">Signup</h3>
      <div className="inner-box">
        <input
          onChange={(e) => setFullname(e.target.value)}
          placeholder="write fullname here"
          value={fullname}
        />
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          placeholder="write age here"
          value={age}
        />
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
      <br />
      <button className="bnt" onClick={signup}>
        Sign up
      </button>
      <p>
        Already have an account?{" "}
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Click here
        </span>
      </p>
    </div>
  );
}

export default Register;
