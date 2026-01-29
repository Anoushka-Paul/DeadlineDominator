import Exam from "../models/Exam.js";

/**
 * ADD EXAM
 */
export const addExam = async (req, res) => {
  try {
    const { subject, examDate, examTime } = req.body;

    const exam = await Exam.create({
      subject,
      examDate,
      examTime,
    });

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE EXAM (3 dots)
 */
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    await Exam.findByIdAndDelete(id);
    res.json({ message: "Exam deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
