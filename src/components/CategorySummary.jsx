export default function CategorySummary({ expenses, onCategoryClick }) {
  const totals = expenses.reduce((acc, e) => {
    if (!acc[e.category]) {
      acc[e.category] = { sum: 0, items: [] };
    }
    acc[e.category].sum += Number(e.amount);
    acc[e.category].items.push(e);
    return acc;
  }, {});

  const entries = Object.entries(totals).sort(
    (a, b) => b[1].sum - a[1].sum
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Разходи по категории</div>
      </div>

      {entries.length === 0 ? (
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0 }}>
          Няма данни за този месец.
        </p>
      ) : (
        <div className="category-list">
          {entries.map(([cat, info]) => (
            <div
              key={cat}
              className="category-item"
              onClick={() => onCategoryClick(cat, info.items)}
            >
              <div className="category-name">{cat}</div>
              <div>
                <span className="category-amount">
                  {info.sum.toFixed(2)} лв
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginLeft: 6,
                  }}
                >
                  ({info.items.length} записа)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
