import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

import { isEmpty, isValidEmail } from "../utils.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [
      true,
      "status: failed - Please enter a username for your profile",
    ],
    unique: "status: failed - {PATH} {VALUE} is already taken",
    validate: {
      validator: function (field) {
        return isEmpty(field);
      },
      message: () => {
        return `status: failed - username input can't be empty`;
      },
    },
  },
  password: {
    type: String,
    required: [true, "status: failed - Please enter your password"],
  },
  email: {
    type: String,
    required: [true, "status: failed - Please enter your email"],
    unique: "status: failed - {PATH} {VALUE} is already taken",
    validate: {
      validator: function (fieldValue) {
        return isValidEmail(fieldValue);
      },
      message: props => {
        return `status: failed - input is not a valid ${props.path}`;
      },
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "status: failed - Please enter your phone number"],
    unique: "status: failed - {PATH} {VALUE} is already in use",
    validate: {
      validator: function (fieldValue) {
        return isEmpty(fieldValue);
      },
      message: props => {
        return `status: failed - input is not a valid ${props.path}`;
      },
    },
  },
});

userSchema.plugin(beautifyUnique);

export default mongoose.model("User", userSchema);
