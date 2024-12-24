import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    dueDate: { type: Date },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
