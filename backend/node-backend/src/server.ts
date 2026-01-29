import express from "express"
import cors from "cors"
import deadlineRoutes from "./routes/deadline"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/deadline", deadlineRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
