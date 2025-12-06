import { formatDisplayDate } from "../utils/dateUtils";

export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Записи за месеца</div>
        <div className="chip">
          Брой: <strong>{expenses.length}</strong>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0 }}>
          Няма записани разходи за този месец.
        </p>
      ) : (
        <div className="expense-list">
          <div className="expense-header">
            <span>Дата</span>
            <span>Сума</span>
            <span>Категория / Бележка</span>
            <span />
          </div>
          {expenses.map((e) => (
            <div key={e.id} className="expense-row">
              <span>{formatDisplayDate(e.date)}</span>
              <span className="expense-amount">
                {Number(e.amount).toFixed(2)} лв
              </span>
              <span>
                <span className="badge">{e.category}</span>{" "}
                {e.note && (
                  <span style={{ color: "var(--text-muted)" }}>{e.note}</span>
                )}
              </span>
              <span>
                <button
                  type="button"
                  onClick={() => onDelete(e.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--danger)",
                    fontSize: 18,
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  aria-label="Изтрий"
                >
                  ×
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
