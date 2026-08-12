from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# FastAPI = blueprint/type of backend
# app = your actual backend
app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    # Allows react app at 5173 to make requests
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,

    # Allows things like GET POST PUT DELETE OPTIONS
    allow_methods=["*"], 

    allow_headers=["*"],
)

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
@app.get("/transactions")
def get_transactions():
    return transactions


# Add up total
@app.get("/total")
def get_total():
    total = 0

    for transaction in transactions:
        total += transaction.amount

    return {"total": total}


