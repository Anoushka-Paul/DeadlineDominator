import requests
import json
from datetime import datetime
from dateutil.parser import parse

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3"

SYSTEM_PROMPT = """
You are an academic workload estimator for college students.

TASK:
Estimate the total time (in hours) required to complete an assignment.

BASE ESTIMATION RULES (apply consistently):
- Reading & understanding a research paper: ~3 hours
- Writing technical content: ~1 hour per page
- Analysis / structuring / diagrams: ~2–3 hours
- Add a small buffer for revision

OUTPUT CONSTRAINTS:
- Choose ONE value from the following set only:
  8, 10, 12, 15, 18, 20
- Pick the closest reasonable value
- Output ONLY valid JSON
- Do NOT explain anything
- Do NOT add extra text

JSON FORMAT ONLY:
{
  "estimated_time_hours": number
}
"""

def estimate_time_and_urgency(description: str, due_date: str):
    # Date calculations
    due = parse(due_date)
    today = datetime.now()
    days_left = max((due - today).days, 0)

    # Final prompt sent to LLM
    prompt = f"""
{SYSTEM_PROMPT}

Assignment description:
{description}
"""

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.0,
            "top_p": 0.1
        }
    }

    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()

    raw_output = response.json()["response"].strip()

    try:
        parsed = json.loads(raw_output)
    except json.JSONDecodeError:
        # Absolute safety fallback
        parsed = {
            "estimated_time_hours": 10
        }

    estimated_hours = float(parsed["estimated_time_hours"])

    # Deterministic urgency logic (4 hours/day rule)
    if days_left == 0:
        urgency = estimated_hours > 0
    else:
        urgency = estimated_hours >= days_left * 4

    return {
        "estimated_time_hours": estimated_hours,
        "urgency": urgency,
        "days_left": days_left
    }
