import { Router } from "express"
import { prisma } from "../lib/prisma"
import { computePriority, computeStatus } from "../lib/deadlineLogic"

const router = Router()

/**
 * POST /api/deadline
 * Create a new deadline
 */
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      subject,
      credits,
      description,
      marks,
      dueDate,
      estimatedDays
    } = req.body

    const status = computeStatus(new Date(dueDate), false)
    const priority = computePriority(new Date(dueDate))

    const deadline = await prisma.deadline.create({
      data: {
        userId,
        subject,
        credits,
        description,
        marks,
        dueDate: new Date(dueDate),
        estimatedDays,
        status,
        priority,
        isCompleted: false
      }
    })

    res.json(deadline)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create deadline" })
  }
})

/**
 * GET /api/deadline?userId=123
 * Fetch deadlines + auto-update status & priority
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) {
      return res.status(400).json({ error: "userId is required" })
    }

    const deadlines = await prisma.deadline.findMany({
      where: { userId: String(userId) }
    })

    // Auto-update overdue & priority
    for (const d of deadlines) {
      const newStatus = computeStatus(d.dueDate, d.isCompleted)
      const newPriority = computePriority(d.dueDate)

      if (d.status !== newStatus || d.priority !== newPriority) {
        await prisma.deadline.update({
          where: { id: d.id },
          data: {
            status: newStatus,
            priority: newPriority
          }
        })
      }
    }

    const updated = await prisma.deadline.findMany({
      where: { userId: String(userId) },
      orderBy: { dueDate: "asc" }
    })

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch deadlines" })
  }
})

/**
 * PATCH /api/deadline/:id
 * Toggle completed checkbox
 */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { isCompleted } = req.body

    const deadline = await prisma.deadline.findUnique({
      where: { id }
    })

    if (!deadline) {
      return res.status(404).json({ error: "Deadline not found" })
    }

    const status = computeStatus(deadline.dueDate, isCompleted)

    const updated = await prisma.deadline.update({
      where: { id },
      data: {
        isCompleted,
        status
      }
    })

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to update deadline" })
  }
})

export default router
