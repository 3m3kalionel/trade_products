import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

import locationSchema from "./locationSchema";
import { commentSchema } from "./commentSchema";
import { isEmpty } from "../utils.js";

const productSchema = new mongoose.Schema(
  {
    productOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the id of the owner"],
    },
    name: {
      type: String,
      required: [true, "status: failed - Please enter the name of the product"],
      validate: {
        validator: function (field) {
          return isEmpty(field);
        },
        message: () => {
          return "status: failed - Please enter a name for the product";
        },
      },
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: [true, "status: failed - Please enter the product's image url"],
      validate: {
        validator: function (field) {
          return isEmpty(field);
        },
        message: () => {
          return "status: failed - Please enter the product's image url";
        },
      },
    },
    address: {
      type: String,
      required: [true, "status: failed - Please enter your address"],
      validate: {
        validator: function (field) {
          return isEmpty(field);
        },
        message: () => {
          return `status: failed - address input can't be empty`;
        },
      },
    },
    price: {
      type: Number,
      required: [
        true,
        "status: failed - Please enter the price of the product",
      ],
    },
    location: locationSchema,
    comments: [commentSchema],
  },
  { timestamps: true }
);

productSchema.plugin(beautifyUnique);

export default mongoose.model("Product", productSchema);
