import { useEffect, useState } from "react";
import "./App.css";


// Open page
//    ↓
// React asks Python: GET /total
//    ↓
// Python calculates total
//    ↓
// React displays it

// Click +
//    ↓
// Fill out modal
//    ↓
// React sends: POST /transactions
//    ↓
// Python saves transaction
//    ↓
// React asks Python: GET /total
//    ↓
// Updated total appears


function App() {
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // 1st python connection
  // Gets the total with python backend endpoint
  async function getTotal() {

    // React sends GET /total
    const response = await fetch("http://127.0.0.1:8000/total");

    // turns the JSON into a JS object
    const data = await response.json();

    setTotal(data.total);
  }

  // So that when the React page first lods, it runs the getTotal function
  useEffect(() => {
    getTotal();
  }, []);


  async function handleAddPurchase() {
    if (!name || !amount || !date) {
      return;
    }

    const transaction = {
      name: name,
      amount: Number(amount),
      date: date,
    };

    // 2nd python connection
    await fetch("http://127.0.0.1:8000/transactions", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      // turns the JS object into JSON
      body: JSON.stringify(transaction),
    });


    // "await" means wait until this finishes before continuing
    await getTotal();


    setName("");
    setAmount("");
    setDate("");

    setIsModalOpen(false);
  }


  return (
    <main className="app">

      <section className="total-card">
        <p>Total Spent</p>

        <h1>${total.toFixed(2)}</h1>
      </section>


      <button
        className="add-button"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>


      {isModalOpen && (
        <div className="modal-backdrop">

          <div className="modal">

            <h2>Add Purchase</h2>


            <label>
              Product

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Chipotle"
              />
            </label>


            <label>
              Amount

              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="14.50"
              />
            </label>


            <label>
              Date

              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>


            <div className="modal-actions">

              <button onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>

              <button onClick={handleAddPurchase}>
                Add
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}


export default App;