from fastapi import FastAPI
from pydantic import BaseModel
from services.ollama_estimator import estimate_time_and_urgency

app = FastAPI(title="Internal Marks Bachao AI (Local LLM)")

class AssignmentRequest(BaseModel):
    description: str
    dueDate: str

@app.post("/estimate-time")
def estimate_time(data: AssignmentRequest):
    return estimate_time_and_urgency(
        description=data.description,
        due_date=data.dueDate
    )
