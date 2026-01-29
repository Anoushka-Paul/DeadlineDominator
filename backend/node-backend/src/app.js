import express from "express";
import cors from "cors";

import assignmentRoutes from "./routes/assignment.routes.js";
import examRoutes from "./routes/exam.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);
app.use("/api/exams", examRoutes);

export default app;