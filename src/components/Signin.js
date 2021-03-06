import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axiosApi from "../api/axiosApi";
import "./AuthPage.css";
import { setToken } from "../utils";

const Signin = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(defaultValues);
  const history = useHistory();

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async payload => {
    const {
      data: {
        user: { username, _id, coordinates },
        token,
      },
    } = await axiosApi.post("/user/signin", payload);
    setValues(defaultValues);

    const userDetails = {
      _id,
      token,
      username,
      coordinates,
    };

    setToken(userDetails);
    history.push("/buy");
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleOnSubmit(values);
      }}
    >
      <div id="authentication-form">
        <div id="form-body">
          <h1 id="form-header">Welcome Back</h1>

          <div id="email-row">
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              name="email"
              autoComplete="email"
              onChange={event => handleChange(event)}
              required
            />
          </div>
          <div id="password-row">
            <input
              type="password"
              placeholder="Password"
              value={values.password}
              name="password"
              autoComplete="current-password"
              onChange={event => handleChange(event)}
              required
            />
          </div>
          <div id="action-button-container">
            <button type="submit" id="sign-up-button">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signin;
