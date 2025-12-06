import { useState } from "react";

export default function ExpenseForm({ categories, onAdd, total }) {
  const [date, setDate] = useState(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [note, setNote] = useState("");

  const isValid = date && amount && category;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onAdd({
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      date,
      amount: parseFloat(amount),
      category,
      note,
    });

    setAmount("");
    setNote("");
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Нов разход</div>
          <div className="card-subtitle">
        
          </div>
        </div>
        <div
            style={{
            padding: "4px 12px",
            fontSize: 16,
            fontWeight: 600,
            color: "#b44c4cff",
            background: "#fbeaea",
            borderRadius: "999px",
            border: "1px solid #be5f5fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
         >
           {total.toFixed(2)} лв
         </div>

      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label className="label">Дата</label>
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Сума (лв)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Категория</label>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <label className="label">Бележка</label>
          <textarea
            className="textarea"
            placeholder="Кафе, супермаркет, транспорт..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="buttons-row">
          <button
            type="submit"
            className="button-primary"
            disabled={!isValid}
          >
            + Добави разход
          </button>
        </div>
      </form>
    </div>
  );
}
