import mongoose, { Schema } from "mongoose";

const progressSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    percentage_completed: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export const Progress = mongoose.model("Progress", progressSchema);
