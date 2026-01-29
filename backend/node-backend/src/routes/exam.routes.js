import express from "express";
import {
  addExam,
  deleteExam,
} from "../controllers/exam.controller.js";

const router = express.Router();

// Add exam
router.post("/", addExam);

// Delete exam (3 dots)
router.delete("/:id", deleteExam);

export default router;
