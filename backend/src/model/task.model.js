import mongoose, { Schema } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Progress } from "./progress.model.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Todo",
      enum: ["Todo", "Compeleted", "InProgress"],
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    progress_id: {
      type: Schema.Types.ObjectId,
      ref: "Progress",
    },
  },
  { timestamps: true }
);

taskSchema.pre("deleteMany", async function (next) {
  try {
    console.log(this._conditions._id);
    await Progress.deleteOne({ _id: this._conditions.progress_id });
    next();
  } catch (error) {
    throw new ApiError("Error while delete task", error);
  }
});
export const Task = mongoose.model("Task", taskSchema);
