from fastapi import FastAPI
from pydantic import BaseModel


# FastAPI = blueprint/type of backend
# app = your actual backend
app = FastAPI()

class Transaction(BaseModel):
    name: str
    amount: float
    date: str


# Essentially a shopping history
transactions = []


# --------------------- ROUTES -----------------------

# If somebody visits:
# "GET /"   --then->  read_root()
@app.get("/")
def read_root():
    return {"message": "Expense Tracker backend is running!"}

# If someone sends a POST request to /transaction, run the function:
# Inputs are expected to match the Transaction class
@app.post("/transactions")
def add_transaction(transaction: Transaction):
    transactions.append(transaction)
    # sends the transaction back
    return transaction


# To be able to see the list
@app.get_transactions("/transactions")
def get_transaction():
    return transactions



