import React, { useState } from "react";

import axiosApi from "../api/axiosApi";
import "./AuthForm.css";
import { saveToken } from "../utils";
import LocationSearch from "./LocationSearch";

const Signup = () => {
  const defaultValues = {
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    address: "",
    location: {
      type: "Point",
      coordinates: [],
    },
  };

  const [values, setValues] = useState(defaultValues);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSelectedAddress = (address, coordinates) => {
    const newCoordinates = [];

    setValues({ ...values, address });
    newCoordinates.push(coordinates.lng);
    newCoordinates.push(coordinates.lat);
    setValues({
      ...values,
      address,
      location: {
        ...values.location,
        coordinates: newCoordinates,
      },
    });
  };

  const handleOnSubmit = async payload => {
    const {
      data: {
        newUser: { username, _id },
        token,
      },
    } = await axiosApi.post("/user/signup", payload);
    setValues(defaultValues);

    const userDetails = {
      _id,
      token,
      username,
    };

    saveToken(userDetails);
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
          <h1 id="form-header">Sign Up For Free</h1>
          <div id="name-row">
            <input
              type="text"
              placeholder="Username"
              value={values.username}
              name="username"
              onChange={event => handleChange(event)}
              required
            />
          </div>
          <div id="phone-number-row">
            <input
              type="number"
              placeholder="Phone Number"
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={event => handleChange(event)}
              required
            />
          </div>
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
          {/* <div id="email-row"> */}
          <LocationSearch handleSelectedAddress={handleSelectedAddress} />
          {/* </div> */}
          <div id="action-button-container">
            <button type="submit" id="sign-up-button">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
