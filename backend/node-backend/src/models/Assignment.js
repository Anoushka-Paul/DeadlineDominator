import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  subject: String,
  credits: Number,
  description: String,
  marks: Number,
  dueDate: Date,
  status: {
    type: String,
    enum: ["due", "completed", "overdue"],
    default: "due",
  },
  priority: Boolean,
  urgencyScore: Boolean,
  estimatedTime: Number,
});

export default mongoose.model("Assignment", AssignmentSchema);
