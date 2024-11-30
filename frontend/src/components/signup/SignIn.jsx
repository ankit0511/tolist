import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import "./signup.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/auth/signin",  // Correct backend URL
        inputs
      );

      if (response.data && response.data.user) {
        sessionStorage.setItem("id", response.data.user._id);
        dispatch(authActions.login());
        navigate("/todo");
      } else {
        alert("Sign-In failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        alert(error.response.data.message || "Server error occurred");
      } else {
        console.log(error);
        alert("Network error occurred");
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={inputs.email}
                onChange={change}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={inputs.password}
                onChange={change}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
