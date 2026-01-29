import Assignment from "../models/Assignment.js";
import { getDaysLeft } from "../utils/dateUtils.js";
import { evaluatePriority } from "../utils/priorityEvaluator.js";
import axios from "axios";

/**
 * ADD NEW ASSIGNMENT (Add Deadline)
 */
export const addAssignment = async (req, res) => {
  try {
    const { subject, credits, description, marks, dueDate } = req.body;

    // 1. Call AI service (FastAPI)
    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/estimate-time`,
      { description, dueDate }
    );

    const { estimated_time_hours, urgency } = aiResponse.data;

    // 2. Calculate days left
    const daysLeft = getDaysLeft(dueDate);

    // 3. Evaluate priority
    const priority = evaluatePriority({
      daysLeft,
      credits,
      marks,
      urgency,
    });

    // 4. Create assignment
    const assignment = await Assignment.create({
      subject,
      credits,
      description,
      marks,
      dueDate,
      estimatedTime: estimated_time_hours,
      urgencyScore: urgency,
      priority,
      status: "due",
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * TOGGLE TICK / UNTICK
 */
export const toggleAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { ticked } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const daysLeft = getDaysLeft(assignment.dueDate);

    // Auto-overdue check
    if (daysLeft < 0 && assignment.status !== "completed") {
      assignment.status = "overdue";
    }

    // RULES YOU SPECIFIED 👇

    // Due → Completed
    if (assignment.status === "due" && ticked) {
      assignment.status = "completed";
      assignment.priority = false;
    }

    // Overdue → Completed
    else if (assignment.status === "overdue" && ticked) {
      assignment.status = "completed";
      assignment.priority = false;
    }

    // Completed → Due (and maybe priority)
    else if (assignment.status === "completed" && !ticked) {
      assignment.status = "due";

      assignment.priority = evaluatePriority({
        daysLeft,
        credits: assignment.credits,
        marks: assignment.marks,
        urgency: assignment.urgencyScore,
      });
    }

    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET ALL ASSIGNMENTS (with live overdue calculation)
 */
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    const updated = assignments.map((a) => {
      const daysLeft = getDaysLeft(a.dueDate);

      if (daysLeft < 0 && a.status === "due") {
        a.status = "overdue";
        a.save();
      }

      return a;
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
