import { useState } from "react";

export default function CategoryManager({ categories, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCat, setNewCat] = useState("");

  const addCategory = () => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      alert("Тази категория вече съществува.");
      return;
    }
    onChange([...categories, trimmed]);
    setNewCat("");
  };

  const removeCategory = (cat) => {
    if (!window.confirm(`Да изтрия ли категория "${cat}"?`)) return;
    onChange(categories.filter((c) => c !== cat));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Категории</div>
      </div>

      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => setIsOpen((o) => !o)}
        >
          <span style={{ fontSize: 14 }}>
            Управление на категориите ({categories.length})
          </span>
          <span style={{ fontSize: 18 }}>{isOpen ? "▴" : "▾"}</span>
        </div>
        {isOpen && (
          <div className="accordion-body">
            <div>
              <div className="label">Добави нова категория</div>
              <div className="buttons-row" style={{ padding: 0 }}>
                <input
                  className="input"
                  style={{ flex: 1, minWidth: 0 }}
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="напр. Образование"
                />
                <button
                  type="button"
                  className="button-secondary"
                  onClick={addCategory}
                >
                  + Добави
                </button>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <div className="label">Съществуващи категории</div>
              <div className="tag-list">
                {categories.map((c) => (
                  <span key={c} className="tag">
                    {c}{" "}
                    <button
                      type="button"
                      onClick={() => removeCategory(c)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "var(--danger)",
                        marginLeft: 4,
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
