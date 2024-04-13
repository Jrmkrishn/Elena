import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    generated_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    generated_date: {
      type: Date,
      default: Date.now,
    },
    date: {
        type: Date,
        default: Date.now,
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
