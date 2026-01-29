import express from "express";
import {
  addAssignment,
  toggleAssignmentStatus,
  getAllAssignments,
} from "../controllers/assignment.controller.js";

const router = express.Router();

// Add deadline
router.post("/", addAssignment);

// Get all assignments (due / completed / overdue)
router.get("/", getAllAssignments);

// Tick / untick assignment
router.patch("/:id/toggle", toggleAssignmentStatus);

export default router;
