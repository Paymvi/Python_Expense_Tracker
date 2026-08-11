from fastapi import FastAPI
from pydantic import BaseModel


# FastAPI = blueprint/type of backend
# app = your actual backend
app = FastAPI()

class Transaction(BaseModel):
    name: str
    amount: float
    date: str

# If somebody visits:
# GET /
# ↓
# run:
# read_root()
@app.get("/")
def read_root():
    return {"message": "Expense Tracker backend is running!"}

# If someone sends a POST request to /transaction, run the function:
# Inputs are expected to match the Transaction class
@app.post("/transactions")
def add_transaction(transaction: Transaction):
    # sends the transaction right back (for now)
    return transaction
