import mongoose from "mongoose";

export const locationSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
});

export default locationSchema;
