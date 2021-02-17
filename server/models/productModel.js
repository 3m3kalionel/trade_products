import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

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
    geoDetails: {
      long: String,
      lat: String,
      availabilityRadius: Number,
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
  },
  { timestamps: true }
);

productSchema.plugin(beautifyUnique);

export default mongoose.model("Product", productSchema);
