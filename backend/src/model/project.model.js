import mongoose, { Schema } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "./task.model.js";
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
projectSchema.pre("deleteOne", async function (next) {
  try {
    console.log(this._conditions._id);
    await Task.deleteMany({ project_id: this._conditions._id });
    next();
  } catch (error) {
    throw new ApiError("Error while delete project", error);
  }
});

export const Project = mongoose.model("Project", projectSchema);
