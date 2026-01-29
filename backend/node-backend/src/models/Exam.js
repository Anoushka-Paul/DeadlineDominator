import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  subject: String,
  examDate: Date,
  examTime: String,
});

export default mongoose.model("Exam", ExamSchema);
