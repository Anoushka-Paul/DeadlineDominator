export function getDaysLeft(dueDate: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)

  const diff = due.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function computeStatus(
  dueDate: Date,
  isCompleted: boolean
) {
  if (isCompleted) return "COMPLETED"

  const daysLeft = getDaysLeft(dueDate)
  if (daysLeft < 0) return "OVERDUE"

  return "DUE"
}

export function computePriority(dueDate: Date) {
  const daysLeft = getDaysLeft(dueDate)
  return daysLeft >= 0 && daysLeft < 5
}
