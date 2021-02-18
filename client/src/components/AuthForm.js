import React, { useState } from "react";

import Signup from "./Signup";
import Signin from "./Signin";
import "./AuthForm.css";

const AuthForm = () => {
  const [signup, setSignup] = useState(true);
  const toggleForms = () => {
    setSignup(!signup);
  };
  return (
    <div id="page">
      <div id="auth-form-controller">
        <div id="tab-headers">
          <div
            id="signup-tab"
            className="tab"
            onClick={toggleForms}
            style={{ background: signup ? "#19b188" : "#425359" }}
          >
            Sign Up
          </div>
          <div
            id="login-tab"
            className="tab"
            onClick={toggleForms}
            style={{ background: signup ? "#425359" : "#19b188" }}
          >
            Log In
          </div>
        </div>
        {signup ? <Signup /> : <Signin />}
      </div>
    </div>
  );
};

export default AuthForm;
